<template>
  <router-view />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'

//TODO: remove loading here
const $q = useQuasar()

$q.loading.show({
  message: 'Loading ...',
  spinnerColor: '#ef6982',
  messageColor: '#ef6982',
})

setTimeout(() => {
  $q.loading.hide()
}, 1000)
</script>
