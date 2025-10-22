<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from './modules/auth/composables/useAuth'
// import { useQuasar } from 'quasar'

const { checkLocalStoreAuth } = useAuth()

onMounted(() => {
  checkLocalStoreAuth()
})
</script>
