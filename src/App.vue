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

// const starRecordly = () => {
//   /**============================================
//    *        Session Recordly Tracking Usage
//    *=============================================**/

//   // const recordly = window.Recordly
//   // for ts use this
//   const recordly: any = (window as any).Recordly

//   if (recordly) {
//     // set your initial configuration
//     recordly.init(
//       'srk_WENzVnCAhEG0R8QU7vFK3Q',
//       // session info
//       {
//         // firstName non-require (string)
//         firstName: 'Link',
//         // lastName non-require (string)
//         lastName: 'nintendo',
//         // email non-require (string)
//         email: 'link@nintend.com',
//         // userId non-require (string)
//         userId: '123',
//       },
//       // extra data non-require (JSON)
//       {
//         // enter any extra info that you need here
//         test: true,
//         my_recordly: 'yes this is a msg',
//       },
//     )
//     // setup how you want to record your data here
//     recordly.setup({
//       // inlineStylesheet non-required, DEFAULT: false (boolean)
//       inlineStylesheet: false,
//       // recordLocation non-required, DEFAULT: false (boolean)
//       recordLocation: true,
//       // recordConsole non-required, DEFAULT: false (boolean)
//       recordConsole: true,
//       // recordNetwork non-required, DEFAULT: false (boolean)
//       recordNetwork: true,
//       // encryptForms non-required, DEFAULT: True (boolean)
//       encryptForms: false,
//       // encryptFormsOptions non-required
//       encryptFormsOptions: {
//         // email non-required, DEFAULT: True (boolean)
//         email: true,
//         // number non-required, DEFAULT: True (boolean)
//         number: false,
//         // tel non-required, DEFAULT: True (boolean)
//         tel: true,
//         // text non-required, DEFAULT: True (boolean)
//         text: false,
//         // textarea non-required, DEFAULT: True (boolean)
//         textarea: false,
//         // select non-required, DEFAULT: True (boolean)
//         select: false,
//         // password non-required, DEFAULT: True (boolean)
//         password: true,
//       },
//     })
//     // start the recording process
//     recordly.start()
//   }

//   /**============================================
//    *        Session Recordly Tracking Usage
//    *=============================================**/
// }

onMounted(() => {
  setInitialColors()
  checkLocalStoreAuth()
  // console.log({
  //   starRecordly
  // });
})
</script>
