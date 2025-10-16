<template>
  <div style="position: relative; width: fit-content">
    <q-select
      popup-content-class="q-menu-300"
      class="search-select-container"
      v-model="selected"
      :options="searched"
      label="Search"
      outlined
      dense
      clearable
      use-input
      input-debounce="300"
      :filter="false"
      @input-value="doFilterOptions"
    >
      <template v-slot:option="scope">
        <div v-bind="scope.itemProps">
          <div class="q-pa-md" style="display: none" v-if="scope.opt.routeName === 'none'">
            nothing found...
          </div>
          <q-item v-else @click="goTo(scope.opt)" clickable>
            <q-item-section avatar>
              <q-icon :name="scope.opt.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ scope.opt.title }}</q-item-label>
              <q-item-label caption>go to {{ scope.opt.title }} </q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </template>
    </q-select>
    <q-icon
      name="search"
      style="
        position: absolute;
        z-index: 999;
        right: 2px;
        size: 40px;
        display: flex;
        color: #c9c9c9;
        top: 9px;
      "
    />
  </div>
</template>

<script setup lang="ts">
import { QSelect } from 'quasar'
import { ref, watch } from 'vue'
import Fuse from 'fuse.js'
import type { PagesForSearchInterface } from '../data/search-data'
import { pagesForSearch } from '../data/search-data'
import { useRouter } from 'vue-router'
import { useMember } from 'src/modules/dashboard/composables/useMember'

const selected = ref<PagesForSearchInterface | undefined>(undefined)
const searched = ref<PagesForSearchInterface[]>([
  {
    icon: '',
    phrases: [],
    routeName: 'none',
    title: 'Nothing found ...',
  },
])
const $router = useRouter()
const { searchMembers_co } = useMember()

const fuse = new Fuse(pagesForSearch, {
  keys: ['phrases'],
  threshold: 0.3,
})

const doFilterOptions = (val: string) => {
  filterOptions(val)
  searchMembers(val)
}

const searchMembers = async (val: string) => {
  const resp = await searchMembers_co(val)
  searched.value = [
    ...resp.map((item) => ({
      icon: 'person',
      routeName: 'MemberLayout-MemberPage',
      title: `${item.LastName}, ${item.FirstName}`,
      phrases: [],
      params: {
        memberId: item.MemberId,
      },
    })),
    ...searched.value,
  ]
}

const filterOptions = (val: string) => {
  selected.value = undefined
  if (!val) {
    searched.value = [
      {
        icon: '',
        phrases: [],
        routeName: 'none',
        title: 'Nothing found ...',
      },
    ]
    return [
      {
        icon: '',
        phrases: [],
        routeName: 'none',
        title: 'Nothing found ...',
      },
    ]
  } else {
    let result = fuse.search(val.toLowerCase()).map((result) => result.item)
    if (!result.length)
      result = [
        {
          icon: '',
          phrases: [],
          routeName: 'none',
          title: 'Nothing found ...',
        },
      ]

    searched.value = result

    return result
  }
}

watch(selected, (value: PagesForSearchInterface | undefined) => {
  if (!value) return
  // $router.push({ name: value.routeName })
  selected.value = undefined
})

const goTo = (value: PagesForSearchInterface) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = { name: value.routeName }
  if (value.params) {
    data.params = value.params
  }

  $router.push({ ...data })
}
</script>

<style scoped lang="scss">
.main-search-container {
  position: relative;
}
.menu-container {
  position: absolute;
  bottom: 0px;
}

.search-select-container {
  width: 300px;
}
</style>
