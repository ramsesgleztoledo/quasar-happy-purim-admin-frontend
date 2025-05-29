<template>
  <!-- Navbar -->
  <q-layout v-if="!isLoading" view="lHh Lpr lFf" class="dashboard-layout-container">
    <q-header elevated class="dashboard-layout-header">
      <NavBar />
    </q-header>
    <!-- Side menu -->
    <q-drawer v-model="$uiStore.sideMenuValue" show-if-above bordered>
      <q-list>
        <q-item-label header style="margin-bottom: 60px"> </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <!-- pages content -->
    <q-page-container style="padding-top: 60px" :class="{ 'dashboard-page-container': !isMobile }">
      <!-- breadcrumbs -->
      <div class="row dashboard-breadcrumbs-container">
        <div class="col-12">
          <BreadCrumbs></BreadCrumbs>
        </div>
      </div>
      <div class="row dashboard-router-view">
        <div class="col-12">
          <router-view />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import EssentialLink from '../components/EssentialLink/EssentialLink.vue'
import NavBar from '../components/NavBar/NavBar.vue'
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs.vue'
import type { LinksDataInterface } from '../data/links'
import { linksData } from '../data/links'
import { useUI } from 'src/modules/UI/composables'
import { useUIStore } from 'src/modules/UI/store/ui-store'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useDashboard } from '../composables/useDashboard'

const $uiStore = useUIStore()
const $q = useQuasar()
const $router = useRouter()
const { isMobile } = useUI()
const { loadStartedData, getMemberSummary } = useDashboard()

const isLoading = ref(true)

let getMembersSummaryInterval: NodeJS.Timeout | null = null
const linksList: LinksDataInterface[] = linksData

onMounted(() => {
  $q.loading.show({
    message: 'Loading ...',
    spinnerColor: '#ef6982',
    messageColor: '#ef6982',
  })

  // console.log('==== getting initial data in dashboard layout ====')

  loadStartedData()
    .then(() => {
      $q.loading.hide()
      isLoading.value = false
      getMembersSummaryInterval = setInterval(() => {
        getMemberSummary().then()
      }, 8000)
    })
    .catch(() => {
      $q.loading.hide()
      isLoading.value = false
      $router.push({ name: '500' })
    })
})

onUnmounted(() => {
  if (getMembersSummaryInterval) clearInterval(getMembersSummaryInterval)
})
</script>

<style lang="scss" scoped>
@import './DashboardLayout.scss';
</style>
