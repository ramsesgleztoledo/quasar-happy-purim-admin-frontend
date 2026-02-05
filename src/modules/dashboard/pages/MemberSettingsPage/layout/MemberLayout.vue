<template>
  <template v-if="isReady">
    <router-view />
  </template>
</template>

<script setup lang="ts">
import { useMember } from 'src/modules/dashboard/composables/useMember'
import {
  // onMounted,
  ref,
  watch,
} from 'vue'
// import type { LocationQuery } from 'vue-router'
import { useRoute } from 'vue-router'

const { getMembers_Co } = useMember()
const $route = useRoute()

const isReady = ref(false)
const isFirsTime = ref(true)

const filters = ref({
  categories: '',
  search: '',
})

const loadData = () => {
  if (isFirsTime.value) isReady.value = false
  getMembers_Co({
    ...filters.value,
  })
    .catch(console.error)
    .finally(() => {
      if (isFirsTime.value) isReady.value = true
      isFirsTime.value = false
    })
}

watch(
  () => [$route.name, $route.query],
  (value) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newFilters: any = value[1] as unknown as any
    if (
      newFilters.categoryId != filters.value.categories ||
      newFilters.search != filters.value.search
    )
      filters.value = {
        categories: (newFilters.categoryId || '').split(',').join(', '),
        search: newFilters.search || '',
      }
    if (isFirsTime.value || value[0] === 'MembersSettingsPage-home') return loadData()
  },
  {
    immediate: true,
  },
)
</script>

<style scoped lang="scss"></style>
