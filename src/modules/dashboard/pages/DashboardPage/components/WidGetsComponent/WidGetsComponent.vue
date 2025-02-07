<template>
  <div
    class="q-mb-sm"
    :class="{
      'col-4': !isMobile,
      'col-12': isMobile,
    }"
  >
    <WidGet
      icon="discount"
      first-p="$24.82"
      second-p="Daily Total:"
      third-p="Wednesday July 17, 2024"
      icon-color="#3cd856"
      background-color="#dcfce7"
    />
  </div>
  <div
    class="q-mb-sm"
    :class="{
      'col-4': !isMobile,
      'col-12': isMobile,
    }"
  >
    <WidGet
      icon="signal_cellular_alt"
      first-p="$84,138.33"
      second-p="Running Total:"
      third-p="Wednesday July 17, 2024"
      icon-color="#5A65FA"
      background-color="#E2EAFF"
    />
  </div>
  <div
    class="q-mb-sm"
    :class="{
      'col-4': !isMobile,
      'col-12': isMobile,
    }"
  >
    <WidGet
      icon="group_add"
      first-p="21%"
      second-p="Participation Rate"
      third-p="0,5% from yesterday"
      icon-color="#BF83FF"
      background-color="#F3E8FF"
    />
  </div>
</template>

<script setup lang="ts">
import { useUI } from 'src/modules/UI/composables'
import WidGet from '../../../../components/widget/WidGet.vue'
const { isMobile } = useUI()
</script>

<style scoped lang="scss">
@import './WidGetsComponent.scss';
</style>
