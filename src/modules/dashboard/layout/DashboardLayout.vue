<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<template>
  <!-- Navbar -->
  <q-layout v-if="!isLoading" view="lHh Lpr lFf" class="dashboard-layout-container">
    <q-header elevated class="dashboard-layout-header">
      <NavBar />
    </q-header>
    <!-- Side menu -->
    <q-drawer
      :width="234"
      :behavior="isMobile ? 'mobile' : 'desktop'"
      v-model="$uiStore.sideMenuValue"
      show-if-above
      bordered
    >
      <div v-if="isMobile">
        <div class="row q-mt-sm q-mb-sm justify-content-end" style="height: 100%">
          <!-- <div class="q-mr-sm q-pa-sm">
            <div class="row">
              <div class="col-12">{{ $aStore.$state.shul?.shulName }}</div>
            </div>
            <div class="row">
              <div class="col-12 dashboard-user-info">
                {{ $aStore.$state.user?.firstName }} {{ $aStore.$state.user?.lastName }}
              </div>
            </div>
          </div> -->
          <ColorSettings />
          <!-- <q-btn flat round color="primary" icon="logout" @click="logOut(true)">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left">
              Log Out
            </q-tooltip>
          </q-btn> -->
        </div>
      </div>
      <q-list>
        <!-- style="margin-bottom: 60px" -->
        <q-item-label v-if="!isMobile" header style="margin-bottom: 20px"> </q-item-label>

        <EssentialLink v-for="link in linksData" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>
    <div
      class="row dashboard-breadcrumbs-container"
      :style="{
        width: isMobile ? '100%' : 'calc(100% - 234px)',
      }"
    >
      <div class="col-12">
        <BreadCrumbs />
      </div>
    </div>
    <!-- pages content -->
    <q-page-container
      style="padding-top: 46px; padding-bottom: 0px"
      :class="{ 'dashboard-page-container': !isMobile }"
    >
      <!-- breadcrumbs -->

      <div class="row">
        <div class="col-12 dashboard-router-view">
          <router-view />
        </div>
      </div>
    </q-page-container>
    <q-footer reveal elevated style="left: 0px">
      <q-toolbar style="min-height: 5px !important">
        <p class="d-flex justify-content-end w-full" style="margin: 0px">
          2025 Happy Purim LLC, All Rights Reserved. | HappyPurim Admin Panel (v{{ version }})
        </p>
        <!-- <p class="d-flex justify-content-end w-full " style="margin: 0px">
          2025 Happy Rosh Hashanah LLC, All Rights Reserved. | HappyRoshHashanah Admin Panel (v{{
            version
          }})
        </p> -->
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import EssentialLink from '../components/EssentialLink/EssentialLink.vue'
import NavBar from '../components/NavBar/NavBar.vue'
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs.vue'
import { useUI } from 'src/modules/UI/composables'
import { useUIStore } from 'src/modules/UI/store/ui-store'
import { useRouter } from 'vue-router'
import { useDashboard } from '../composables/useDashboard'
// import { useAuth } from 'src/modules/auth/composables/useAuth'
import { useBreadcrumb } from '../components/BreadCrumbs/composables/useBreadcrumb'
// import { useAuthStore } from 'src/modules/auth/store/auth.store'
import ColorSettings from '../components/ColorSettings/ColorSettings.vue'

const { linksData } = useBreadcrumb()
// const { logOut } = useAuth()
const $uiStore = useUIStore()
// const $aStore = useAuthStore()
const $router = useRouter()
const { isMobile, version } = useUI()
const { loadStartedData, getMemberSummary } = useDashboard()

const isLoading = ref(true)

let getMembersSummaryInterval: NodeJS.Timeout | null = null

onMounted(() => {
  loadData().catch(console.error)
})

onUnmounted(() => {
  if (getMembersSummaryInterval) clearInterval(getMembersSummaryInterval)
})

const loadData = async () => {
  try {
    await loadStartedData()
    isLoading.value = false
    if (getMembersSummaryInterval) clearInterval(getMembersSummaryInterval)
    getMembersSummaryInterval = setInterval(() => {
      getMemberSummary().catch(console.error)
    }, 30000)
  } catch {
    isLoading.value = false
    $router.push({ name: '500' })
  }
}
</script>

<style lang="scss" scoped src="./DashboardLayout.scss" />
