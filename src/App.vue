<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from './modules/auth/composables/useAuth'

const { checkLocalStoreAuth } = useAuth()



onMounted(() => {
  checkLocalStoreAuth()
})
</script>
