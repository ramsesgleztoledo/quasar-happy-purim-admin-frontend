<template>
  <div v-if="isReady">
    <router-view />
  </div>
  <q-inner-loading v-else :showing="true" label="Loading..." />
</template>

<script setup lang="ts">
import { useReport } from 'src/modules/dashboard/composables/useReport'
import { useReportStore } from 'src/modules/dashboard/store/ReportStore/reportStore'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const { getViewReport, setIsCustom } = useReport()
const { reportId } = useRoute().params
const $rStore = useReportStore()
const $route = useRoute()

const isReady = ref(false)


const filter = {
  basketSize: [],
  categories: [],
  donateBasket: '',
  routeCode: [],
  searchTerm: '',
  zipCode: [],
}

watch(
  () => reportId,

  () => {
    if ($route.name == 'MailMergeReportsPage-MailMergePage') isReady.value = true

    const isCustom = `${$route.query.isCustom}` == 'true'
    setIsCustom(isCustom)

    getViewReport(
      {
        ...filter,
        id: reportId as string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        categories: filter.categories.map((ca) => (ca as any).categoryID),
      },
      isCustom,
    ).then((res) => {
      $rStore.setReport(res)
      $rStore.setSelectedRecipients([...(res?.members || [])])
      $rStore.setRecipientsFiltered([...(res?.members || [])])
      $rStore.setReportId(reportId as string)

      isReady.value = true
    })
  },
  {
    immediate: true,
  },
)

// onMounted(() => {
//   if ($route.name == 'MailMergeReportsPage-MailMergePage') isReady.value = true

//   const isCustom = `${$route.query.isCustom}` == 'true'
//   setIsCustom(isCustom)

//   getViewReport(
//     {
//       ...filter,
//       id: reportId as string,
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       categories: filter.categories.map((ca) => (ca as any).categoryID),
//     },
//     isCustom,
//   ).then((res) => {
//     $rStore.setReport(res)
//     $rStore.setSelectedRecipients([...(res?.members || [])])
//     $rStore.setRecipientsFiltered([...(res?.members || [])])
//     $rStore.setReportId(reportId as string)

//     isReady.value = true
//   })
// })
</script>

<style scoped lang="scss"></style>
