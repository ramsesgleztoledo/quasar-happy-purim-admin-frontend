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

  // document.addEventListener('mousemove', (e: MouseEvent) => {
  //   const secondDiv = document.querySelector('.echarts div:nth-of-type(2)')
  //   if (secondDiv instanceof HTMLElement) {
  //     secondDiv.style.setProperty('position', 'fixed', 'important')
  //     secondDiv.style.setProperty('left', `${e.clientX + 10}px`, 'important')
  //     secondDiv.style.setProperty('top', `${e.clientY}px`, 'important')
  //   }
  // })
})
</script>
