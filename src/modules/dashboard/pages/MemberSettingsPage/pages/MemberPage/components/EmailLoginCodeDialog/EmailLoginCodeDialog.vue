<template>
  <q-card>
    <div class="row dialog-header">
      <div class="col-12">
        <p>Email Member Login Code</p>
      </div>
    </div>
    <q-card-section class="row items-center">
      <div class="row">
        <div class="col-12"><b> Email </b></div>
        <div class="col-12 q-mt-sm">Send an Email to this member with their login code.</div>
      </div>
      <div class="EmailLoginCodeDialog-container">
        <div class="row">
          <div class="col-12">
            <div class="row q-mt-lg q-mb-sm">
              <div class="col-6 q-pr-sm q-pl-sm">
                <q-input
                  v-model="(realForm.fromName as FormField).value as string"
                  outlined
                  label="From Name"
                  lazy-rules
                  :rules="[lazyRules.required()]"
                />
              </div>
              <div class="col-6 q-pr-sm q-pl-sm">
                <q-input
                  v-model="(realForm.fromEmail as FormField).value as string"
                  outlined
                  label="From Email"
                  lazy-rules
                  :rules="[lazyRules.required(), lazyRules.isEmail()]"
                />
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-4 q-pr-sm q-pl-sm">
                <q-input
                  v-model="(realForm.subject as FormField).value as string"
                  outlined
                  label="Subject"
                  lazy-rules
                  :rules="[lazyRules.required()]"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <EditorCustom :tokens="tokensForEdit" v-model="emailContent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn
        outline
        label="Cancel"
        class="q-mr-sm q-mt-sm"
        style="color: #990000; border-color: #990000"
        v-close-popup
      />
      <q-btn
        class="q-mr-sm q-mt-sm"
        style="background: var(--happypurim); color: white"
        label="send email"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import type { FormField } from 'src/composables'
import { lazyRules, useForm, validations } from 'src/composables'
import EditorCustom from 'src/components/EditorCustom/EditorCustom.vue'
import { ref } from 'vue'

const tokensForEdit = ref([
  { name: 'email', label: 'email', icon: 'email' },
  { name: 'code', label: 'code', icon: 'code' },
  { name: 'token-link', label: 'token-link', icon: 'link' },
])

const { realForm } = useForm({
  fromName: { value: '', validations: [validations.required] },
  fromEmail: { value: '', validations: [validations.required, validations.isEmail] },
  subject: { value: '', validations: [validations.required] },
})

const emailContent = ref<string>('')
</script>

<style scoped lang="scss">
@import './EmailLoginCodeDialog';
</style>
