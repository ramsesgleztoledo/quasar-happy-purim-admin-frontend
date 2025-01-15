<template>
  <!-- Navbar -->
  <q-layout view="lHh Lpr lFf" class="dashboard-layout-container">
    <q-header elevated class="dashboard-layout-header">
      <NavBar @onToggle="leftDrawerOpen = !leftDrawerOpen"></NavBar>
    </q-header>
    <!-- Side menu -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header style="margin-bottom: 60px"> </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <!-- pages content -->
    <q-page-container style="margin-top: 90px" :class="{ 'dashboard-page-container': !isMobile }">
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
import { onMounted, ref } from 'vue'
import EssentialLink from '../components/EssentialLink/EssentialLink.vue'
import NavBar from '../components/NavBar/NavBar.vue'
import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs.vue'

import type { LinksDataInterface } from '../data/links'
import { linksData } from '../data/links'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'

const $q = useQuasar()
const $route = useRoute()
const isMobile = $q.platform.is.mobile

const linksList: LinksDataInterface[] = linksData

const leftDrawerOpen = ref<boolean>(false)

onMounted(() => {
  console.log('check the route',{route_info: $route});

})
</script>

<style lang="scss" scoped>
@import './DashboardLayout.scss';
</style>
