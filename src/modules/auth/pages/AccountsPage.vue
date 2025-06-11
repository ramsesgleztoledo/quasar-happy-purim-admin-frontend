<template>
  <div class="row">
    <div
      class="q-pa-sm"
      v-for="account in loginAccounts"
      :key="account.id"
      :class="{
        'col-3': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-card class="my-card">
        <q-card-section
          class="text-white"
          :class="{
            'bg-primary': account.id.toString() !== $aStore.$state.shul?.shulId,
          }"
          style="background-color: black"
        >
          <div class="text-h6">
            <b style="color: #f8c25d">
              {{ account.name }}
            </b>
          </div>
          <div class="text-subtitle2">
            {{ account.guid }} - (<b style="color: #18ff62"> {{ account.id }}) </b>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat @click="() => onLogin(account)">{{
            account.id.toString() === $aStore.$state.shul?.shulId ? 'go to Dashboard' : 'Login'
          }}</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { loginAccounts } from 'src/mocks/data/data-mocks'
import type { LoginAccountInterface } from 'src/mocks/interfaces/mocks-interfaces'
import { useUI } from 'src/modules/UI/composables'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth.store'

const { isMobile } = useUI()
const $router = useRouter()
const $aStore = useAuthStore()

const onLogin = (account: LoginAccountInterface) => {
  if (account.id.toString() === $aStore.$state.shul?.shulId)
    return $router.push({ name: 'dashboard-DashboardPage' })

  return $router.push({
    name: 'authPage',
    query: {
      token: account.token,
    },
  })
}
</script>
