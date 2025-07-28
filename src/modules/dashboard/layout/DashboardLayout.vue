<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<template>
  <!-- Navbar -->
  <q-layout v-if="!isLoading" view="lHh Lpr lFf" class="dashboard-layout-container">
    <q-header elevated class="dashboard-layout-header">
      <NavBar />
    </q-header>
    <!-- Side menu -->
    <q-drawer v-model="$uiStore.sideMenuValue" show-if-above bordered>
      <div v-if="isMobile" class="row justify-content-end q-pa-sm">
        <q-btn flat round color="primary" icon="logout" @click="logOut(true)" />
      </div>
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
    <q-footer reveal elevated>
      <q-toolbar style="min-height: 5px !important">
        <p class="d-flex justify-content-end w-full q-pa-sm" style="margin: 0px">
          2025 Happy Rosh Hashanah LLC, ALl Rights Reserved. | HappyRoshHashanah Admin Panel (v{{
            version
          }})
        </p>
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
import { useAuth } from 'src/modules/auth/composables/useAuth'
import type { LinksDataInterface } from '../data/links-old'
import { useBreadcrumb } from '../components/BreadCrumbs/composables/useBreadcrumb'

const { linksData } = useBreadcrumb()
const { logOut } = useAuth()
const $uiStore = useUIStore()
const $router = useRouter()
const { isMobile, version } = useUI()
const { loadStartedData, getMemberSummary } = useDashboard()

const isLoading = ref(true)

let getMembersSummaryInterval: NodeJS.Timeout | null = null
const linksList: LinksDataInterface[] = linksData

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
    }, 8000)
  } catch {
    isLoading.value = false
    $router.push({ name: '500' })
  }
}
</script>

<style lang="scss" scoped src="./DashboardLayout.scss" />
