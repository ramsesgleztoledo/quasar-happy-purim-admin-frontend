<template>
  <div class="row">
    <div
      class="top-title-col"
      :class="{
        'col-4': !isMobile,
        'col-12': isMobile,
      }"
    >
      <p class="page-main-title">Upload Member List</p>
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
        class="MemberListLayout-stepper"
        v-model="step"
        ref="stepper"
        color="primary"
        animated
      >
        <q-step :name="1" title="Upload list" icon="upload" :done="step > 1"> </q-step>

        <q-step :name="2" title="Preview List" icon="visibility" :done="step > 2"> </q-step>

        <q-step :name="3" title="Upload" icon="check" disable> </q-step>
      </q-stepper>
    </div>
  </div>
  <div class="row q-mb-md">
    <div class="col-12 top-title-col">
      <p class="page-main-title">Reports</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
      <p>
        In this section, you can view reports and start the
        <b> Mail Merge </b>
        process by selecting a report and choosing either
        <b> Email </b>
        or
        <b> Print </b>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUI } from 'src/modules/UI/composables'
import { ref } from 'vue'

const { isMobile } = useUI()

const step = ref(1)
</script>

<style scoped lang="scss"></style>
