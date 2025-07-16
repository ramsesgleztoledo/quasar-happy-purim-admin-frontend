<template>
  <div v-if="isReady">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useReport } from 'src/modules/dashboard/composables/useReport'
import { onMounted, ref } from 'vue'
const isReady = ref(false)
const { getReportList } = useReport()

onMounted(() => {
  getReportList().finally(() => {
    isReady.value = true
  })
})
</script>

<style scoped lang="scss"></style>
