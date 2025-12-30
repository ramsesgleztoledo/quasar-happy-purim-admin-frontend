<template>
  <q-dialog v-model="show" persistent>
    <q-card :style="{ width: isMobile ? '100vw' : '500px' }">
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Select Image</p>
        </div>
      </div>

      <div
        v-if="$rStore.$state.images.length"
        class="custom-dialog-body-container q-pa-lg"
        style="min-height: 400px"
      >
        <div class="row">
          <div
            v-show="isReady"
            class="col-6 col-sm-4 col-md-3 col-lg-3 q-pa-md img-col-container"
            v-for="img in $rStore.$state.images"
            :key="img"
          >
            <img
              @load="countImgLoads++"
              :src="img"
              alt="no img..."
              style="width: 100%; height: 100px"
              v-close-popup
              @click="() => $emit('onSelectImg', img)"
            />
          </div>
          <q-inner-loading :showing="!isReady" label="Loading..." />
        </div>
      </div>
      <div v-else class="q-pa-lg q-ma-lg">No images to show</div>
      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn
          outline
          label="Close"
          class="q-mr-sm q-mt-sm"
          style="color: #990000; border-color: #990000"
          v-close-popup
        />
      </q-card-actions> </q-card
  ></q-dialog>
</template>

<script setup lang="ts">
import { useReportStore } from 'src/modules/dashboard/store/ReportStore/reportStore'
import { useUI } from 'src/modules/UI/composables'
import { computed, ref, watch } from 'vue'

const $rStore = useReportStore()
const {
  isMobile,
  // showLoading, stopLoading
} = useUI()
const countImgLoads = ref(0)

interface ScheduleSendPropsInterface {
  modelValue: boolean
}

const isReady = ref(false)

const $emit = defineEmits(['update:modelValue', 'onSelectImg'])

const $props = defineProps<ScheduleSendPropsInterface>()

const show = computed({
  get: () => $props.modelValue,
  set: (val) => $emit('update:modelValue', val),
})

watch(countImgLoads, (val) => {
  if (val >= $rStore.$state.images.length) {
    isReady.value = true
    // stopLoading()
  }
})
watch(
  () => $props.modelValue,
  () => {
    countImgLoads.value = 0
    // if ($props.modelValue) showLoading()
  },
)
</script>

<style scoped lang="scss" src="./SelectImages.scss" />
