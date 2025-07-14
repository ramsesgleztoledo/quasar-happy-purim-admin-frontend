<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">401</div>

      <div class="text-h2" style="opacity: 0.4">Unauthorized</div>

      <q-btn
        v-if="isDev"
        class="q-mt-xl q-ma-sm"
        color="white"
        text-color="black"
        unelevated
        to="/authenticate"
        label="Login"
        no-caps
      />
      <q-btn
        v-if="isDev"
        class="q-mt-xl q-ma-sm"
        color="black"
        text-color="white"
        unelevated
        to="/accounts"
        label="Go to accounts (dev)"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUI } from 'src/modules/UI/composables'
const { isDev } = useUI()
</script>
