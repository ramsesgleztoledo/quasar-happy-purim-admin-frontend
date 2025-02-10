<template>
  <div class="row">
    <div
      class="top-title-col"
      :class="{
        'col-4': !isMobile,
        'col-12': isMobile,
      }"
    >
      <p class="page-main-title">Mail Merge & Reports</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
    <div
      class="top-title-col"
      :class="{
        'col-8': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-stepper
        class="MailMergePage-stepper"
        v-model="step"
        ref="stepper"
        color="primary"
        animated
      >
        <q-step :name="1" title="Review Report" icon="visibility" :done="step > 1"> </q-step>

        <q-step :name="2" title="Compose" icon="rate_review" :done="step > 2"> </q-step>

        <q-step :name="3" title="Preview & Send " icon="send" disable> </q-step>
      </q-stepper>
    </div>
  </div>
  <div class="row q-mb-md">
    <div class="col-12 top-title-col">
      <p class="page-main-title">Recipients</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
      <p>Receiving From Report</p>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <template v-if="step === 1">
        <ReviewReport />
      </template>
      <template v-if="step === 2">
        <ComposeEmail />
      </template>
      <template v-if="step === 3">
        <PreviewEmail />
      </template>
    </div>
  </div>
  <div class="row q-mt-lg cancel-save-btn-container ">
    <div class="col-12 q-pa-sm">
      <q-btn outline label="CANCEL" class="q-mr-sm" style="color: #990000; border-color: #990000" />
      <q-btn v-if="step !== 1" class="q-mr-sm" label="Back" @click="step--" />
      <q-btn
        v-if="step !== 3"
        class="q-mr-sm"
        style="background: var(--happypurim); color: white"
        label="continue"
        @click="handleNextStep"
      />
      <template v-if="step === 3">
        <q-btn class="q-mr-sm" label="Schedule Send" />
        <q-btn
          class="q-mr-sm"
          style="background: var(--happypurim); color: white"
          label="Send Email"
          @click="handleNextStep"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUI } from 'src/modules/UI/composables'
import { ref } from 'vue'
import ReviewReport from './components/ReviewReport/ReviewReport.vue'
import ComposeEmail from './components/ComposeEmail/ComposeEmail.vue'
import PreviewEmail from './components/PreviewEmail/PreviewEmail.vue'

const { isMobile } = useUI()

const step = ref(1)
const handleNextStep = () => {
  if (step.value !== 3) {
    step.value++
  }
}
</script>

<style scoped lang="scss">
@import './MailMergePage';
</style>
