<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from './modules/auth/composables/useAuth'
import { useUI } from './modules/UI/composables'

const { checkLocalStoreAuth } = useAuth()
const { setInitialColors } = useUI()

onMounted(() => {
  setInitialColors()
  checkLocalStoreAuth()
})
</script>
