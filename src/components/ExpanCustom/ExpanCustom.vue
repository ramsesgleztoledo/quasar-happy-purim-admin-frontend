<template>
  <div class="row">
    <div class="col-12 ExpanCustom">
      <q-checkbox class="ExpanCustom-check-box-activation" v-model="active" />
      <q-expansion-item v-model="active" :label="title" class="ExpanCustom-exp-container">
        <q-card>
          <q-card-section>
            <slot name="body"></slot>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface SpanCustomPropsInterface {
  modelValue: boolean
  title: string
}

const $props = defineProps<SpanCustomPropsInterface>()
const $emit = defineEmits(['update:modelValue'])

const active = computed({
  get: () => $props.modelValue,
  set: (val) => $emit('update:modelValue', val),
})
</script>

<style scoped lang="scss">
@import './ExpanCustom';
</style>
