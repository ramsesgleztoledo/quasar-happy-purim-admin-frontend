<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">500</div>

      <div class="text-h2" style="opacity: 0.4">
        Oops. Something went wrong, please try again later...
      </div>

      <q-btn
        class="q-mt-xl q-ma-sm"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
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
