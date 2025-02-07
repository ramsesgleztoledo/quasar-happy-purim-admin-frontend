<template>
  <div>
    <div class="row">
      <div class="col-12 top-title-col">
        <p class="user-client-title">Demo Synagogue</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
      </div>
    </div>
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
const { isMobile } = useUI()
</script>

<style scoped lang="scss">
@import './DashboardPage.scss';
</style>
