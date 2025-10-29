<template>
  <div></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const { logOut } = useAuth()

onMounted(() => {
  $q.loading.show({ message: 'Login you out ...' })
  logOut()
  $q.loading.hide()
})
</script>
