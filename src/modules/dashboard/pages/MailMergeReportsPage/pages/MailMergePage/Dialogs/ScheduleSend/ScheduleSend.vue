<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Schedule Send</p>
        </div>
      </div>

      <div class="custom-dialog-body-container q-pa-lg">
        <div class="row q-mb-sm">
          <div class="col-12 q-pa-sm">
            <q-input
              v-model="(realForm.title as FormField).value as string"
              outlined
              label="Event Title"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>

        <div class="row q-mb-sm">
          <div class="col-12 q-pa-sm">
            <q-item class="ScheduleSend-q-item">
              <q-item-section avatar>
                <q-avatar color="primary" text-color="white" icon="access_time" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="q-pa-lg">Monday, February 14 10:00am</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-12 q-pa-sm">
            <q-select
              popup-content-class="q-menu-300"
              outlined
              v-model="(realForm.repeat as FormField).value as string"
              :options="repeatOptions"
              label="Repeat"
            />
          </div>
        </div>
      </div>
      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn
          outline
          label="Close"
          class="q-mr-sm q-mt-sm"
          style="color: #990000; border-color: #990000"
          v-close-popup
        />
        <q-btn
          class="q-mr-sm q-mt-sm"
          style="background: var(--happypurim); color: white"
          label="Save"
          v-close-popup
        />
      </q-card-actions> </q-card
  ></q-dialog>
</template>

<script setup lang="ts">
import type { FormField } from 'src/composables'
import { lazyRules, useForm, validations } from 'src/composables'
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

const { realForm } = useForm({
  title: { value: '', validations: [validations.required] },
  repeat: { value: '', validations: [] },
})

const repeatOptions = ref([])
</script>

<style scoped lang="scss">
@import './ScheduleSend';
</style>
