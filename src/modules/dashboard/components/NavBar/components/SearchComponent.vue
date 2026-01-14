<template>
  <div style="position: relative; width: fit-content">
    <div class="row">
      <div class="row">
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
          @keydown.enter="
            () => {
              if (!isSearchedMembersLoading) doSearch()
            }
          "
        >
          <template v-slot:input="scope">
            <q-input v-bind="scope" disable dense label="hello" />
          </template>
          <template v-slot:option="scope">
            <div v-bind="scope.itemProps">
              <div
                class="q-pa-md"
                :style="{ display: inputValue ? '' : 'none' }"
                v-if="scope.opt.routeName === 'none' && searched.length === 1"
              >
                No Results Found...
              </div>
              <q-item v-if="scope.opt.routeName !== 'none'" @click="goTo(scope.opt)" clickable>
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
          v-show="!isMobile"
          name="search"
          style="
            position: absolute;
            z-index: 999;
            right: 78px;
            size: 40px;
            display: flex;
            color: #c9c9c9;
            top: 9px;
          "
        />
      </div>
      <q-btn
        v-if="!isMobile"
        class="white-spinner q-ml-sm"
        :loading="isSearchedMembersLoading"
        style="background-color: var(--happypurim); color: white; height: 38px"
        dense
        label="Search"
        @click="doSearch"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { QSelect, useQuasar } from 'quasar'
import { ref, watch } from 'vue'
import Fuse from 'fuse.js'
import type { PagesForSearchInterface } from '../data/search-data'
import { pagesForSearch } from '../data/search-data'
import { useRouter } from 'vue-router'
import { useMember } from 'src/modules/dashboard/composables/useMember'
import type { SearchedMemberInterface } from 'src/modules/dashboard/interfaces/member-interfaces'
import { useUI } from 'src/modules/UI/composables'

const emptyData = {
  icon: '',
  phrases: [],
  routeName: 'none',
  title: 'Nothing found',
}

const { isMobile } = useUI()
const $q = useQuasar()

const inputValue = ref('')
const isSearchedMembersLoading = ref(false)
const searchedMembers = ref<SearchedMemberInterface[]>([])

const selected = ref<PagesForSearchInterface | undefined>(undefined)
const searched = ref<PagesForSearchInterface[]>([emptyData])
const $router = useRouter()
const { searchMembers_co } = useMember()

const fuse = new Fuse(pagesForSearch, {
  keys: ['phrases'],
  threshold: 0.1,
})

const doFilterOptions = (val: string) => {
  if (val) inputValue.value = val
  filterOptions(val)
  searchMembers(val)
}

const searchMembers = async (val: string) => {
  // searchedMembers.value = []

  if (val) {
    isSearchedMembersLoading.value = true
    searchedMembers.value = await searchMembers_co(val)
    isSearchedMembersLoading.value = false
  }

  searched.value = [
    ...searchedMembers.value.map((item) => ({
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
    searched.value = [emptyData]
    return [emptyData]
  } else {
    let result = fuse.search(val.toLowerCase()).map((result) => result.item)
    if (!result.length) result = [emptyData]

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

const doSearch = () => {
  if (searchedMembers.value.length)
    $router.push({
      name: 'MembersSettingsPage',
      query: {
        search: inputValue.value,
      },
    })
  else
    $q.notify({
      color: 'blue',
      textColor: 'black',
      icon: 'error',
      message: 'Nothing Found',
    })
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

:deep(.white-spinner) {
  .q-spinner-mat {
    color: white !important;
  }
}
</style>
