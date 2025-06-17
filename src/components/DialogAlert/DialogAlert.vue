<template>
  <q-dialog v-model="modelVisible" persistent>
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>{{ title }}</p>
        </div>
      </div>
      <q-card-section class="row items-center">
        <div class="row custom-dialog-body-container">
          <div class="col-12">
            <q-avatar v-if="!dontShowIcon" icon="warning" color="primary" text-color="white" />
            <span class="q-ml-sm">{{ msg }}</span>
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn
          @click="() => $emit('onFinish', false)"
          outline
          :label="cancelBtnText || 'Cancel'"
          class="q-mr-sm q-mt-sm"
          style="color: #990000; border-color: #990000"
          v-close-popup
        />
        <q-btn
          @click="() => $emit('onFinish', true)"
          class="q-mr-sm q-mt-sm"
          style="background: var(--happypurim); color: white"
          :label="okBtnText || 'ok'"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface DialogAlertPropsInterface {
  title?: string
  msg: string
  modelValue: boolean
  dontShowIcon?: boolean
  cancelBtnText?: string
  okBtnText?: string
}

// Define props
const $props = withDefaults(defineProps<DialogAlertPropsInterface>(), {
  title: () => 'Confirm !',
})

const modelVisible = computed({
  get: () => $props.modelValue,
  set: (val) => $emit('update:modelValue', val),
})

// Emit the updated value when the internal state changes
const $emit = defineEmits(['update:modelValue', 'onFinish'])
</script>

<style scoped lang="scss">
@import './DialogAlert';
</style>
