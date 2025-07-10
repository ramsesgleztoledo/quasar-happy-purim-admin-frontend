<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Save Draft</p>
        </div>
      </div>

      <div class="custom-dialog-body-container q-pa-lg" style="min-width: 80vw">
        <div class="row q-mb-sm">
          <div class="col-12">
            <q-input
              v-model="form.name"
              outlined
              label="Name *"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input
              type="textarea"
              v-model="form.description"
              outlined
              label="Description *"
              lazy-rules
              :rules="[lazyRules.required()]"
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
          style="background: var(--happypurim); color: white"
          :disable="!form.name || !form.description"
          label="Save"
          class="q-mr-sm q-mt-sm"
          v-close-popup
          @click="
            () => {
              $emit('onSaveDraft', form)
              form.name = ''
              form.description = ''
            }
          "
        />
      </q-card-actions> </q-card
  ></q-dialog>
</template>

<script setup lang="ts">
import { lazyRules } from 'src/composables'
import { computed, ref } from 'vue'

interface ScheduleSendPropsInterface {
  modelValue: boolean
}

const $emit = defineEmits(['update:modelValue', 'onSaveDraft'])

const $props = defineProps<ScheduleSendPropsInterface>()

const show = computed({
  get: () => $props.modelValue,
  set: (val) => $emit('update:modelValue', val),
})

const form = ref({
  name: '',
  description: '',
})
</script>

<style scoped lang="scss"></style>
