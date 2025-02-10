<template>
  <div class="row q-gutter-sm">
    <q-select
      style="min-width: 200px"
      v-model="(realForm.sendTo as FormField).value as string"
      outlined
      :options="[]"
      label="Send To"
      lazy-rules
      :rules="[lazyRules.required()]"
    />
    <q-input
      style="min-width: 200px"
      v-model="(realForm.sendingFromName as FormField).value as string"
      outlined
      label="Sending From Name"
      lazy-rules
      :rules="[lazyRules.required()]"
    />
    <q-input
      style="min-width: 200px"
      v-model="(realForm.sendingFromEmail as FormField).value as string"
      outlined
      label="Sending From Email"
      lazy-rules
      :rules="[lazyRules.required(), lazyRules.isEmail()]"
    />
  </div>
  <div class="row">
    <div
      class="q-mb-sm"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-input
        style="min-width: 200px"
        v-model="(realForm.emailSubject as FormField).value as string"
        outlined
        label="Email Subject"
        lazy-rules
        :rules="[lazyRules.required()]"
      />
    </div>
    <div
      class="q-mb-sm"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <div class="row">
        <div class="col-12 q-gutter-sm justify-content-end">
          <q-btn icon="article" label="Select Template" />
          <q-btn icon="image" label="Insert images" />
          <div v-if="!isMobile" class="separator-right"></div>
          <q-btn color="primary" icon="save" label="save template" />
        </div>
      </div>
    </div>
  </div>

  <template v-if="!isMobile">
    <div class="row">
      <div class="col-10 q-pa-sm">
        <EditorCustom v-model="email" height="750px" ref="editorRef" />
      </div>
      <div class="col-2 q-pa-sm ComposeEmail-tokens-container">
        <div class="row q-mb-sm">
          <div class="col-12 separator-bottom">
            <p style="margin: 5px">Select Mail Merge Fields</p>
          </div>
        </div>
        <q-item
          class="ComposeEmail-token-item q-mb-sm"
          v-for="(token, i) in tokens"
          :key="i"
          clickable
          @click="insertToken(token.name)"
        >
          <q-item-section>
            <q-icon name="arrow_back_ios" />
          </q-item-section>

          <q-item-section>
            {{ token.label }}
          </q-item-section>
        </q-item>
      </div>
    </div>
  </template>
  <template v-else>
    <EditorCustom v-model="email" height="500px" :tokens="tokens" />
  </template>
</template>

<script setup lang="ts">
import EditorCustom from 'src/components/EditorCustom/EditorCustom.vue'
import type { FormField } from 'src/composables'
import { lazyRules, useForm, validations } from 'src/composables'
import { useUI } from 'src/modules/UI/composables'
import { ref } from 'vue'
const { isMobile } = useUI()

const editorRef = ref<InstanceType<typeof EditorCustom> | null>(null)

const insertToken = (tokenName: string) => {
  if (editorRef.value) {
    editorRef.value.add(tokenName)
  }
}

const email = ref('')
const tokens = ref([
  { name: 'm id', label: 'm id', icon: 'badge' },
  { name: 'Title', label: 'Title', icon: 'title' },
  { name: 'Title', label: 'Title', icon: 'title' },
  { name: 'Last Name', label: 'Last Name', icon: 'person' },
  { name: 'First Name', label: 'First Name', icon: 'person' },
  { name: 'Spouse', label: 'Spouse', icon: 'group' },
  { name: 'DisplayName', label: 'DisplayName', icon: 'person' },
  { name: 'Address 1', label: 'Address 1', icon: 'home' },
  { name: 'Address 2', label: 'Address 2', icon: 'home' },
  { name: 'City', label: 'City', icon: 'location_city' },
  { name: 'State', label: 'State', icon: 'flag' },
  { name: 'Zip', label: 'Zip', icon: 'numbers' },
  { name: 'Phone', label: 'Phone', icon: 'phone' },
  { name: 'Login Code', label: 'Login Code', icon: 'pin' },
])

const { realForm } = useForm({
  sendTo: { value: '', validations: [validations.required] },
  sendingFromName: { value: '', validations: [validations.required] },
  sendingFromEmail: { value: '', validations: [validations.required] },
  emailSubject: { value: '', validations: [validations.required] },
})
</script>

<style scoped lang="scss">
@import './ComposeEmail';
</style>
