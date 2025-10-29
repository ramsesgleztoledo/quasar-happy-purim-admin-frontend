<template>
  <div v-if="isReady" class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div
      class="row q-pa-md login-container"
      :style="{
        'min-width': isMobile ? '90vw' : '700px',
      }"
    >
      <div class="col-12 q-pa-sm">
        <div class="row q-mb-lg happypurim-logo user-select-none justify-content-end">
          <p class="hp-logo" style="font-size: 26px">
            HappyPurim.com
            <!-- HappyRoshHashanah.com -->
          </p>
        </div>
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.login.value"
              outlined
              label="Login *"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.password.value"
              outlined
              :type="showPassword ? 'text' : 'password'"
              lazy-rules
              :rules="[lazyRules.required()]"
              label="Password *"
            >
              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>
          </div>
        </div>
        <div class="row justify-content-end q-mt-lg">
          <q-btn
            color="primary"
            label="login"
            icon="login"
            :disable="!isValidForm()"
            @click="onLogin"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar'
import { onMounted, ref } from 'vue'
import { useAuth } from '../composables/useAuth'

import { useRoute } from 'vue-router'
import { lazyRules, useForm, validations } from 'src/composables'
import { useUI } from 'src/modules/UI/composables'

const isReady = ref(false)
const $q = useQuasar()
const {
  login,
  //  logOut
  loginWithUserAndPass,
} = useAuth()
const $route = useRoute()

onMounted(() => {
  const token = $route.query.token
  // if (!token) return logOut()

  if (token) {
    $q.loading.show({ message: 'Authenticating ...' })
    login(token as string)
    $q.loading.hide()
  } else isReady.value = true
})

const showPassword = ref(false)

const { isMobile } = useUI()

const { realForm, isValidForm } = useForm({
  login: { value: '', validations: [validations.required] },
  password: { value: '', validations: [validations.required] },
})

const onLogin = async () => {
  const data = {
    username: realForm.value.login.value,
    password: realForm.value.password.value,
  }

  await loginWithUserAndPass(data)
}
</script>

<style lang="css" scoped>
.login-container {
  background-color: white;
  box-shadow: 5px 8px 16px -1px var(--happypurim);
  border: solid 1px black;
  border-radius: 8px;
}
</style>
