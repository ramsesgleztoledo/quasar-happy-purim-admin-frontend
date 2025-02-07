<template>
  <!-- Navbar -->
  <q-layout view="lHh Lpr lFf" class="dashboard-layout-container">
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
import { onMounted } from 'vue'
import EssentialLink from '../components/EssentialLink/EssentialLink.vue'
import NavBar from '../components/NavBar/NavBar.vue'
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs.vue'

import type { LinksDataInterface } from '../data/links'
import { linksData } from '../data/links'

import { useRoute } from 'vue-router'
import { useUI } from 'src/modules/UI/composables'
import { useUIStore } from 'src/modules/UI/store/ui-store'

const $uiStore = useUIStore()

const $route = useRoute()
const { isMobile } = useUI()

const linksList: LinksDataInterface[] = linksData

onMounted(() => {
  console.log('CHECKING THE ROUTE HERE ===>', { matches: $route.matched })
})
</script>

<style lang="scss" scoped>
@import './DashboardLayout.scss';
</style>
