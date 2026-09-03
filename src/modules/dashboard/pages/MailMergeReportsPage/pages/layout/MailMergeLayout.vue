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
const { fieldID } = useRoute().query
const $rStore = useReportStore()
const $route = useRoute()

const isReady = ref(false)

const fixFilters = async () => {
  const {
    basketSize,
    categories,
    donateBasket,
    routeCode,
    searchTerm,
    zipCode,
    yesOnly: yesOnlyValue,
    hideNL: hideNLValue,
  } = useRoute().query

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $rStore.$state.filters.basketSize = basketSize ? JSON.parse(basketSize as any) : []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $rStore.$state.filters.categories = categories ? JSON.parse(categories as any) : []
  $rStore.$state.filters.donateBasket = donateBasket ? (donateBasket as string) : ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $rStore.$state.filters.routeCode = routeCode ? JSON.parse(routeCode as any) : []
  $rStore.$state.filters.searchTerm = searchTerm ? (searchTerm as string) : ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $rStore.$state.filters.zipCode = zipCode ? JSON.parse(zipCode as any) : []

  $rStore.$state.filters.yesOnly = yesOnlyValue ? (yesOnlyValue as string) == 'true' : false
  $rStore.$state.filters.hideNL = hideNLValue ? (hideNLValue as string) == 'true' : false
}

watch(
  () => reportId,

  () => {
    fixFilters()
    if ($route.name == 'MailMergeReportsPage-MailMergePage') isReady.value = true

    const isCustom = `${$route.query.isCustom}` == 'true'
    setIsCustom(isCustom)

    getViewReport(
      {
        ...$rStore.$state.filters,
        fieldID: fieldID as string,
        id: reportId as string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        categories: $rStore.$state.filters.categories.map((ca) => (ca as any).categoryID),
        hideNL: $rStore.$state.filters.hideNL,
        yesOnly: $rStore.$state.filters.yesOnly,
      },
      isCustom,
    ).then((res) => {
      $rStore.setReport(res)
      // $rStore.setSelectedRecipients([...(res?.members || [])])
      $rStore.setRecipientsFiltered([...(res?.members || [])])
      $rStore.setReportId(reportId as string)
      $rStore.setReportReportFieldIdId(fieldID as string)

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
