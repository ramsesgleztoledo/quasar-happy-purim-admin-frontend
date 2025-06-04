<template>
  <div></div>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar'
import { onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'

import { useRoute } from 'vue-router'

const $q = useQuasar()
const { login, logOut } = useAuth()
const $route = useRoute()

onMounted(() => {
  const token = $route.query.token
  if (!token) return logOut()

  $q.loading.show({ message: 'authenticating ...' })
  login(token as string)
  $q.loading.hide()
})
</script>
