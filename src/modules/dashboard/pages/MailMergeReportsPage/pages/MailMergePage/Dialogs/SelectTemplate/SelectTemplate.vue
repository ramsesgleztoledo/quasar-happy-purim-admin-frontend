<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Select Template</p>
        </div>
      </div>

      <div class="custom-dialog-body-container q-pa-lg">
        <q-item v-for="(template, i) in templates" :key="i" class="q-item-bordered q-mb-sm">
          <q-item-section>
            <q-item-label>{{ template.title }}</q-item-label>
            <q-item-label caption lines="2">{{ template.caption }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <div class="row">
              <q-btn class="q-mr-sm" padding="3px" color="primary" icon="delete" />
              <q-btn padding="3px" color="primary" icon="check" label="Select" />
            </div>
          </q-item-section>
        </q-item>
      </div>
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
import { computed, ref } from 'vue'

interface ScheduleSendPropsInterface {
  modelValue: boolean
}

const $emit = defineEmits(['update:modelValue'])

const $props = defineProps<ScheduleSendPropsInterface>()

const show = computed({
  get: () => $props.modelValue,
  set: (val) => $emit('update:modelValue', val),
})

const templates = ref([
  { title: 'Initial Email for 2021', caption: 'Jane Cohen- 12/30/2020 12:37:12 PM' },
  { title: 'Initial Email for 2021', caption: 'Jane Cohen- 12/30/2020 12:37:12 PM' },
  { title: 'Initial Email for 2021', caption: 'Jane Cohen- 12/30/2020 12:37:12 PM' },
  { title: 'Initial Email for 2021', caption: 'Jane Cohen- 12/30/2020 12:37:12 PM' },
  { title: 'Initial Email for 2021', caption: 'Jane Cohen- 12/30/2020 12:37:12 PM' },
  { title: 'Initial Email for 2021', caption: 'Jane Cohen- 12/30/2020 12:37:12 PM' },
  { title: 'Initial Email for 2021', caption: 'Jane Cohen- 12/30/2020 12:37:12 PM' },
  { title: 'Initial Email for 2021', caption: 'Jane Cohen- 12/30/2020 12:37:12 PM' },
  { title: 'Initial Email for 2021', caption: 'Jane Cohen- 12/30/2020 12:37:12 PM' },
])
</script>

<style scoped lang="scss">
@import './SelectTemplate';
</style>
