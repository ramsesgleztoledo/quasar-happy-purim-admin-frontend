<template>
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
    @input-value="filterOptions"
  >
    <template v-slot:option="scope">
      <div v-bind="scope.itemProps">
        <div class="q-pa-md" v-if="scope.opt.routeName === 'none'">nothing found...</div>
        <q-item v-else @click="goTo(scope.opt.routeName)" clickable>
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
</template>

<script setup lang="ts">
import { QSelect } from 'quasar'
import { ref, watch } from 'vue'
import Fuse from 'fuse.js'
import type { PagesForSearchInterface } from '../data/search-data'
import { pagesForSearch } from '../data/search-data'
import { useRouter } from 'vue-router'

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

const fuse = new Fuse(pagesForSearch, {
  keys: ['phrases'],
  threshold: 0.3,
})

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
  $router.push({ name: value.routeName })
  selected.value = undefined
})

const goTo = (name: string) => {
  console.log('going to ', name)

  $router.push({ name: name })
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
</style>
