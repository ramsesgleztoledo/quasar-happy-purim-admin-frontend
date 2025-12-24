<template>
  <template v-if="isReady">
    <router-view />
  </template>
</template>

<script setup lang="ts">
import { useMember } from 'src/modules/dashboard/composables/useMember'
import { onMounted, ref } from 'vue'

const { getMembers_Co } = useMember()

const isReady = ref(false)

onMounted(() => {
  isReady.value = false
  getMembers_Co({
    categories: '',
    search: '',
  })
    .catch(console.error)
    .finally(() => {
      isReady.value = true
    })
})
</script>

<style scoped lang="scss"></style>
