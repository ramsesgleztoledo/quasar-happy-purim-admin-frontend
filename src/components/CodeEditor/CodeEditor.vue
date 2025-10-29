<template>
  <codemirror
    v-model="codeText"
    placeholder="Code goes here"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"
    @change="($event: any) => {}"
    @focus="($event: any) => {}"
    @blur="($event: any) => {}"
  />
</template>

<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
// import { html } from '@codemirror/lang-html'
// import { javascript } from '@codemirror/lang-javascript'
// import { json } from '@codemirror/lang-json'
// import { oneDark } from '@codemirror/theme-one-dark'

interface CodemirrorPropsInterface {
  modelValue: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lang: any
}

const $props = defineProps<CodemirrorPropsInterface>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extensions = ref<any[]>([
  $props.lang(),
  // html(),
  // javascript(),
  // json(),
  // oneDark
])

const codeText = computed({
  get: () => $props.modelValue,
  set: (val) => $emit('update:modelValue', val),
})

const view = shallowRef()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleReady = (payload: any) => {
  view.value = payload.view
}

// Emit the updated value when the internal state changes
const $emit = defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
@import './CodeEditor.scss';
</style>
