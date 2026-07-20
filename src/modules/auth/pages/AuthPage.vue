<template>
  <div
    v-if="isReady"
    class="fullscreen text-white text-center q-pa-md flex flex-center login-page-container"
    style="flex-direction: column"
  >
    <div
      class="row q-pa-md login-container"
      :style="{
        minWidth: 'min(500px, 90vw)',
      }"
    >
      <div class="div" :style="{ flex: isMobile ? 1 : '' }">
        <div class="col-12 q-pa-sm">
          <div class="row user-select-none justify-content-end">
            <p class="hp-logo" style="font-size: 26px">Admin Console</p>
          </div>
          <div class="row q-mb-lg user-select-none justify-content-end">
            <p class="color-primary" style="font-size: 26px">Administrative Login</p>
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
      <div v-if="!isMobile" class="q-pa-md right-login-container">
        <q-carousel autoplay animated v-model="slide" arrows navigation infinite>
          <q-carousel-slide
            :name="1"
            img-src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg"
          >
            <div class="security-container">
              <div class="row info-text-container">
                <div class="col-12">
                  <h4>Administrator Access</h4>
                </div>
                <div class="col-12">
                  <p>
                    Login with your credentials to manage your fundraiser, get real-time statistics
                    and print reports. Anytime, anywhere from any device.
                  </p>
                </div>
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide
            :name="2"
            img-src="https://images.pexels.com/photos/533189/pexels-photo-533189.jpeg"
          >
            <div class="security-container">
              <div class="row info-text-container">
                <div class="col-12">
                  <h4>Questions, Comments or Suggestions?</h4>
                  <div class="col-12">
                    <p>
                      We'd love to hear from you! Email us at
                      <a href="mailto:support@happypurim.com" style="color: white"
                        >support@happypurim.com</a
                      >
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
    <div class="row w-100">
      <div style="margin-left: auto; margin-right: auto; text-align: center; color: white">
        <br />
        <a href="https://www.happypurim.com/privacy" style="color: white" target="_blank"
          >Privacy Policy</a
        >
        |
        <a href="https://www.happypurim.com/terms" style="color: white" target="_blank"
          >Terms of Use</a
        >
        |
        <a
          href="https://www.happypurim.com/admin/licenseagreement.aspx"
          target="_blank"
          style="color: white"
          >License Agreement</a
        >
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
const slide = ref(1)

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

<style lang="css" scoped src="./AuthPage.scss" />
