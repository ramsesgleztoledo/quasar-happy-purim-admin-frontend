<template>
  <q-dialog v-model="modelVisible">
    <q-card :style="styleCard">
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>{{ title }}</p>
        </div>
      </div>

      <q-card-section class="q-pt-none" style="padding: 12px">
        <div
          class="row custom-dialog-body-container"
          :style="{
            maxHeight: !height ? '400px' : 'auto',
          }"
        >
          <div class="col-12">
            <p v-if="!innerHTML">
              {{ msg }}
            </p>
            <div v-else v-html="innerHTML" :class="htmlContainerClasses"></div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn :label="btnLabel ? btnLabel : 'Close'" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface DialogAlertPropsInterface {
  msg?: string
  innerHTML?: string
  modelValue: boolean
  title?: string
  height?: string
  htmlContainerClasses?: string
  btnLabel?: string
  styleCard?: string
}

const $props = withDefaults(defineProps<DialogAlertPropsInterface>(), {
  title: () => '',
})

const modelVisible = computed({
  get: () => $props.modelValue,
  set: (val) => $emit('update:modelValue', val),
})

const $emit = defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss"></style>
