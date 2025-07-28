<template>
  <div>
    <div class="row">
      <div class="col-12 top-title-col">
        <p class="user-client-title">{{ $aStore.$state.shul?.shulName }}</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
      </div>
    </div>

    <InfoAlert
      v-if="fundraiserStatus.fundraiserClosed"
      class="q-mb-md q-mt-md"
      type="error"
      :inner-h-t-m-l="fundraiserClosedHTML"
    />
    <InfoAlert
      v-if="fundraiserStatus.hasReciprocityTrans"
      class="q-mb-md q-mt-md"
      type="warning"
      :inner-h-t-m-l="fundraiserReciprocityHTML"
    />
    <div class="row q-mt-sm">
      <div class="col-12">
        <div class="row q-mb-md">
          <DashboardPageChartsComponent />
        </div>
      </div>
      <div
        class="DashboardPage-left-container"
        :class="{
          'col-8': !isMobile,
          'col-12': isMobile,
        }"
      >
        <div class="row">
          <WidGetsComponent />
        </div>
        <div class="row">
          <div
            class="q-mb-sm align-content-center"
            :class="{
              'col-6': !isMobile,
              'col-12': isMobile,
            }"
          >
            <div class="DashboardPage-members-stats-container">
              <DashboardPageStatsComponent />
            </div>
          </div>
          <div
            class="q-mb-sm align-content-center"
            :class="{
              'col-6': !isMobile,
              'col-12': isMobile,
            }"
          >
            <div
              class="DashboardPage-members-stats-container DashboardPage-members-stats-container-2"
            >
              <DashboardPageInfoComponent />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 q-mb-sm align-content-center">
            <div class="DashboardPage-recent-orders-table" style="">
              <RecentOrdersComponents />
            </div>
          </div>
        </div>
      </div>
      <div
        class="DashboardPage-right-container"
        :class="{
          'col-4': !isMobile,
          'col-12': isMobile,
        }"
      >
        <div class="row q-mb-sm">
          <div class="col-12">
            <div class="DashboardPage-basket-statistics-container">
              <BasketStatisticsComponent />
            </div>
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-12">
            <div class="DashboardPage-basket-statistics-container">
              <MembersSummaryComponent />
            </div>
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-12">
            <div class="DashboardPage-basket-statistics-container">
              <OtherOrderItemsComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardPageStatsComponent from './components/DashboardPageStatsComponent/DashboardPageStatsComponent.vue'
import DashboardPageChartsComponent from './components/DashboardPageChartsComponent/DashboardPageChartsComponent.vue'
import WidGetsComponent from './components/WidGetsComponent/WidGetsComponent.vue'
import DashboardPageInfoComponent from './components/DashboardPageInfoComponent/DashboardPageInfoComponent.vue'
import RecentOrdersComponents from './components/RecentOrdersComponents/RecentOrdersComponents.vue'
import BasketStatisticsComponent from './components/BasketStatisticsComponent/BasketStatisticsComponent.vue'
import OtherOrderItemsComponent from './components/OtherOrderItemsComponent/OtherOrderItemsComponent.vue'
import { useUI } from 'src/modules/UI/composables'
import InfoAlert from 'src/components/InfoAlert/InfoAlert.vue'
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore/dashboardStore'
import { computed, onMounted, ref } from 'vue'
import { _fundraiserClosedHTML, _fundraiserReciprocityHTML } from 'src/static-data/data'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/modules/auth/store/auth.store'
import MembersSummaryComponent from './components/MembersSumaryComponent/MembersSummaryComponent.vue'

const { isMobile } = useUI()
const $router = useRouter()

const $dStore = useDashboardStore()
const $aStore = useAuthStore()

const fundraiserStatus = computed(() => ({
  fundraiserClosed: $dStore.fundraiserStatus?.fundraiserClosed || false,
  hasReciprocityTrans: $dStore.fundraiserStatus?.hasReciprocityTrans || false,
}))

const fundraiserClosedHTML = ref(_fundraiserClosedHTML)
const fundraiserReciprocityHTML = ref(_fundraiserReciprocityHTML)
const prepareClickEvents = () => {
  //! redirect to dashboard-SiteManagerPage when click in click here
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement

    if (!target) return

    if (target.id === 'fundraiserClosedHTML') $router.push({ name: 'dashboard-SiteManagerPage' })
    if (target.id === 'fundraiserReciprocityHTML')
      $router.push({ name: 'dashboard-reciprocityChargePage' })
  })
}

onMounted(() => {
  prepareClickEvents()
})
</script>

<style scoped lang="scss">
@import './DashboardPage.scss';
</style>
