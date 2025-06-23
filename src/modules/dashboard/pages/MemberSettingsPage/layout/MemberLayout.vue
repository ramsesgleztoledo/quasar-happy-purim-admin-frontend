<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMember } from 'src/modules/dashboard/composables/useMember'
import { onMounted } from 'vue'

const { getMembers_Co } = useMember()

onMounted(() => {
  getMembers_Co().catch(console.error)
})
</script>

<style scoped lang="scss"></style>
