<template>
  <div v-if="isReady">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useReport } from 'src/modules/dashboard/composables/useReport'
import { useReportStore } from 'src/modules/dashboard/store/ReportStore/reportStore'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const { getViewReport } = useReport()
const { reportId } = useRoute().params
const $rStore = useReportStore()

const isReady = ref(false)

const filter = {
  basketSize: [],
  categories: [],
  donateBasket: '',
  routeCode: [],
  searchTerm: '',
  zipCode: [],
}

onMounted(() => {
  getViewReport({
    ...filter,
    id: reportId as string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categories: filter.categories.map((ca) => (ca as any).categoryID),
  }).then((res) => {
    $rStore.setReport(res)
    $rStore.setSelectedRecipients([...(res?.members || [])])
    $rStore.setReportId(reportId as string)

    isReady.value = true
  })
})
</script>

<style scoped lang="scss"></style>
