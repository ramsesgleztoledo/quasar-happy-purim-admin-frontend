<template>
  <div class="q-pa-md q-gutter-sm breadcrumbs-container">
    <q-breadcrumbs>
      <q-breadcrumbs-el
        v-if="getCurrentLink()"
        :label="getCurrentLink()?.title"
        :icon="getCurrentLink()?.icon"
        :to="{
          name: getCurrentLink()?.to,
        }"
      />
      <!-- <q-breadcrumbs-el label="Cancelled" icon="navigation" to="/" />
      <q-breadcrumbs-el label="Redirected" icon="build" to="/" />
      <q-breadcrumbs-el label="Page" /> -->
    </q-breadcrumbs>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { linksData, type LinksDataInterface } from '../../data/links'

const $route = useRoute()

const getCurrentLink = (): LinksDataInterface | undefined => {
  console.log('getting current link')

  return linksData.find((li) => li.to === $route.name)
}
</script>

<style scoped lang="scss">
@import './BreadCrumbs.scss';
</style>
