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
  <div class="row MemberListLayout-container q-mb-lg">
    <div class="col-12 q-pa-md">
      <template v-if="step === 1">
        <UploaderComponent
          description="By following these instructions, you should be able to upload a new member list to [System Name] efficiently and accurately. If you have any questions or need further assistance, please contact us"
          v-model:file-model="fileModel"
        />
      </template>
      <template v-if="step === 2">
        <PreviewList />
      </template>
      <template v-if="step === 3">
        <div class="row" style="height: 100%">
          <div class="col-12 MemberListLayout-last-info-container">
            <div class="MemberListLayout-last-info">
              <div class="row">
                <p><b>Upload Completed !</b></p>
              </div>
              <div class="row">
                <p><b>16 </b> Members updated</p>
              </div>
              <div class="row">
                <p><b>16 </b> Members updated</p>
              </div>
              <div class="row">
                <p><b>16 </b> Members updated</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>

  <div class="row q-mt-lg cancel-save-btn-container">
    <div class="col-12">
      <template v-if="step !== 3">
        <q-btn
          outline
          label="CANCEL"
          class="q-mr-sm"
          style="color: #990000; border-color: #990000"
        />
        <q-btn v-if="step !== 1" class="q-mr-sm" label="Back" @click="step--" />
        <q-btn
          class="q-mr-sm"
          style="background: var(--happypurim); color: white"
          :label="`${step === 2 ? 'Finish' : 'continue'}`"
          @click="handleNextStep"
        />
      </template>

      <template v-else>
        <q-btn class="q-mr-sm" style="background: var(--happypurim); color: white" label="Close" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UploaderComponent from 'src/components/UploaderComponent/UploaderComponent.vue'
import PreviewList from '../components/PreviewList/PreviewList.vue'
import { useUI } from 'src/modules/UI/composables'
const { isMobile } = useUI()

const step = ref(1)
const fileModel = ref<File[]>([])

const handleNextStep = () => {
  if (step.value !== 3) {
    step.value++
  }
}
</script>

<style scoped lang="scss">
@import './MemberListLayout';
</style>
