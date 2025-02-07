<template>
  <div class="row q-mb-sm">
    <div class="col-12 top-title-col">
      <p class="page-main-title">Basic Settings</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
  </div>
  <InfoAlert
    class="q-mb-md"
    type="warning"
    text="This account is configured with customized pricing which can not be changed from the Site Settings Page."
  />
  <div class="row">
    <div
      class="d-flex"
      :class="{
        'col-8': !isMobile,
        'col-12': isMobile,
      }"
    >
      <div class="w-full q-pa-md">
        <WelcomePage />
      </div>
      <div v-if="!isMobile" class="separator-right"></div>
    </div>
    <div v-if="isMobile" class="col-12">
      <div class="separator-bottom"></div>
    </div>
    <div
      class="q-pa-md"
      :class="{
        'col-4': !isMobile,
        'col-12': isMobile,
      }"
    >
      <GBProgram />
    </div>
    <div v-if="isMobile" class="col-12">
      <div class="separator-bottom"></div>
    </div>
  </div>
  <div v-if="!isMobile" class="separator-bottom q-mt-sm q-mb-sm"></div>
  <div class="row">
    <div
      class="d-flex"
      :class="{
        'col-4': !isMobile,
        'col-12': isMobile,
      }"
    >
      <div class="w-full q-pa-md">
        <OrganizationInfo />
      </div>
      <div v-if="!isMobile" class="separator-right"></div>
    </div>
    <div v-if="isMobile" class="col-12">
      <div class="separator-bottom"></div>
    </div>
    <div
      class="d-flex"
      :class="{
        'col-4': !isMobile,
        'col-12': isMobile,
      }"
    >
      <div class="w-full q-pa-md">
        <FundraiserCoordinator />
      </div>
      <div v-if="!isMobile" class="separator-right"></div>
    </div>
    <div v-if="isMobile" class="col-12">
      <div class="separator-bottom"></div>
    </div>
    <div
      class="d-flex"
      :class="{
        'col-4': !isMobile,
        'col-12': isMobile,
      }"
    >
      <div class="w-full q-pa-md">
        <PaymentProcessing />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InfoAlert from 'src/components/InfoAlert/InfoAlert.vue'
import WelcomePage from './components/WelcomePage/WelcomePage.vue'
import { useUI } from 'src/modules/UI/composables'
import GBProgram from './components/GBProgram/GBProgram.vue'
import OrganizationInfo from './components/OrganizationInfo/OrganizationInfo.vue'
import FundraiserCoordinator from './components/FundraiserCoordinator/FundraiserCoordinator.vue'
import PaymentProcessing from './components/PaymentProcessing/PaymentProcessing.vue'

const { isMobile } = useUI()
</script>

<style scoped lang="scss"></style>
