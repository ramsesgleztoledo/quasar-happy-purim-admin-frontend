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
//       'srk_z-QoUkggtEGwMqYq7JrfEA',
//       // session info
//       {
//         // firstName non-require (string)
//         firstName: 'Ramses',
//         // lastName non-require (string)
//         lastName: 'Gonzalez',
//         // email non-require (string)
//         email: 'ramses@gmail.com',
//         // userId non-require (string)
//         userId: '88',
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
//       // recordClientInfo non-required, DEFAULT: false (boolean)
//       recordClientInfo: true,
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
  // starRecordly()
  // });
})
</script>
