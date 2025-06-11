<template>
  <router-view />
</template>

<script setup lang="ts">
import { useMember } from 'src/modules/dashboard/composables/useMember'
import { onMounted } from 'vue'

const { getMembers } = useMember()

onMounted(() => {
  getMembers().catch(console.error)
})
</script>

<style scoped lang="scss"></style>
