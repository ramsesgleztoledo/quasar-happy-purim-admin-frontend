<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 50vw">
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Select Image</p>
        </div>
      </div>

      <div v-if="$rStore.$state.images.length" class="custom-dialog-body-container q-pa-lg">
        <div class="row">
          <div
            :class="{
              'col-4': !isMobile,
              'col-12': isMobile,
            }"
            class="col-4 q-pa-md img-col-container"
            v-for="img in $rStore.$state.images"
            :key="img"
          >
            <img
              :src="img"
              alt="no img..."
              style="width: 100%; height: 200px"
              v-close-popup
              @click="() => $emit('onSelectImg', img)"
            />
          </div>
        </div>
      </div>
      <div v-else class="q-pa-lg q-ma-lg">No images to show...</div>
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
import { computed } from 'vue'

const $rStore = useReportStore()
const { isMobile } = useUI()

interface ScheduleSendPropsInterface {
  modelValue: boolean
}

const $emit = defineEmits(['update:modelValue', 'onSelectImg'])

const $props = defineProps<ScheduleSendPropsInterface>()

const show = computed({
  get: () => $props.modelValue,
  set: (val) => $emit('update:modelValue', val),
})
</script>

<style scoped lang="scss">
@import './SelectImages.scss';
</style>
