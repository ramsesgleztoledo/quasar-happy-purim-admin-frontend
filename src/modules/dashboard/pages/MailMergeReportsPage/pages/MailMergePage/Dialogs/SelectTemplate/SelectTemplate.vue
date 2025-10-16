<template>
  <q-dialog v-model="show" persistent>
    <q-card :style="{ width: isMobile ? '100vw' : '500px' }">
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Select a Template</p>
        </div>
      </div>

      <div v-if="templates.length" class="custom-dialog-body-container q-pa-lg">
        <q-item v-for="(template, i) in templates" :key="i" class="q-item-bordered q-mb-sm">
          <q-item-section>
            <q-item-label>{{ template.name }}</q-item-label>
            <!-- <q-item-label caption lines="2">{{ template }}</q-item-label> -->
          </q-item-section>
          <q-item-section side>
            <div class="row">
              <!-- <q-btn class="q-mr-sm" padding="3px" color="primary" icon="delete" /> -->
              <q-btn
                padding="3px"
                color="primary"
                label="Select"
                @click="() => $emit('onSelectTemplate', template.content)"
                v-close-popup
              />
            </div>
          </q-item-section>
        </q-item>
      </div>
      <div v-else class="q-ma-md q-pa-md">No templates to show...</div>
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
import type { MailMergeTemplateInterface } from 'src/modules/dashboard/interfaces/mail-merge.interface'
import { useUI } from 'src/modules/UI/composables'
import { computed } from 'vue'

interface ScheduleSendPropsInterface {
  modelValue: boolean
  templates: MailMergeTemplateInterface[]
}

const { isMobile } = useUI()

const $emit = defineEmits(['update:modelValue', 'onSelectTemplate'])

const $props = defineProps<ScheduleSendPropsInterface>()

const show = computed({
  get: () => $props.modelValue,
  set: (val) => $emit('update:modelValue', val),
})
</script>

<style scoped lang="scss">
@import './SelectTemplate';
</style>
