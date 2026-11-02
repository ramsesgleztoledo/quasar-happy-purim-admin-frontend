<template>
  <div>
    <router-view />
  </div>
</template>
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from './modules/auth/composables/useAuth'
import { useUI } from './modules/UI/composables'

const { checkLocalStoreAuth } = useAuth()
const { setInitialColors } = useUI()

const starRecordly = () => {
  /**============================================
   *        Session Recordly Tracking Usage
   *=============================================**/

  const recordly: any = (window as any).Recordly
  // for ts use this
  // const recordly: any = (window as any).Recordly

  if (recordly) {
    // set your initial configuration
    recordly.init(
      'srk_r4CVvxTcUjqVKnlDXqoHFQ',
      // session info
      {
        // firstName non-required (string)
        firstName: 'Ramses',
        // lastName non-required (string)
        lastName: 'Gonzalez',
        // email non-required (string)
        email: 'ramses.gonzalez@example.com',
        // userId non-required (string)
        userId: 'user_12345',
      },
      // extra data non-required (JSON)
      {
        data: {
          // any extra data you want to send to your session recording
          // for example, you can send the current page URL
          currentPage: window.location.href,
          extra: 'this is an extra message',
        },
      },
    )

    // setup how you want to record your data here
    recordly.setup({
      // recordClientInfo non-required, DEFAULT: false (boolean)
      recordClientInfo: true,
      // recordLocation non-required, DEFAULT: false (boolean)
      recordLocation: true,
      // inlineStylesheet non-required, DEFAULT: false (boolean)
      inlineStylesheet: false,
      // recordConsole non-required, DEFAULT: false (boolean)
      recordConsole: true,
      // recordNetwork non-required, DEFAULT: false (boolean)
      recordNetwork: true,
      // encryptForms non-required, DEFAULT: true (boolean)
      encryptForms: true,
      // encryptFormsOptions non-required
      encryptFormsOptions: {
        // email non-required, DEFAULT: true (boolean)
        email: true,
        // number non-required, DEFAULT: true (boolean)
        number: true,
        // tel non-required, DEFAULT: true (boolean)
        tel: true,
        // text non-required, DEFAULT: true (boolean)
        text: true,
        // textarea non-required, DEFAULT: true (boolean)
        textarea: true,
        // select non-required, DEFAULT: true (boolean)
        select: true,
        // password non-required, DEFAULT: true (boolean)
        password: true,
      },
    })

    // start the recording process
    // recordly.start()
  }

  /**============================================
   *        Session Recordly Tracking Usage
   *=============================================**/
}

onMounted(() => {
  setInitialColors()
  checkLocalStoreAuth()

  starRecordly()
})
</script>
