<template>
  <div v-if="show" class="row">
    <div class="col-12 InfoAlert-container-row" :style="{ backgroundColor: background }">
      <div class="InfoAlert-container-left">
        <q-icon class="q-mr-sm" name="info" :style="{ color: iconInternal }" />
        <p v-if="!innerHTML">
          {{ text }}
          <q-icon v-if="icon" :name="icon" :style="{ color: iconColor }" />
        </p>

        <div v-else v-html="innerHTML"></div>
      </div>
      <q-icon @click="show = false" name="close" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface InfoAlertPropsInterface {
  type: 'info' | 'error' | 'success' | 'warning'
  text?: string
  innerHTML?: string
  icon?: string
  iconColor?: string
}

const $props = defineProps<InfoAlertPropsInterface>()

const background = computed<string>(() => {
  switch ($props.type) {
    case 'info':
      return '#E6EFFF'
    case 'error':
      return '#ffaca1'
    case 'warning':
      return '#FFF9E5'
    default:
      return '#d8f5d380'
  }
})
const iconInternal = computed<string>(() => {
  switch ($props.type) {
    case 'info':
      return '#00a3ff'

    case 'error':
      return '#fb4141'

    case 'warning':
      return '#FFAA06'

    default:
      return '#3be23b'
  }
})

const show = ref<boolean>(true)
</script>

<style scoped lang="scss">
@import './InfoAlert.scss';
</style>
