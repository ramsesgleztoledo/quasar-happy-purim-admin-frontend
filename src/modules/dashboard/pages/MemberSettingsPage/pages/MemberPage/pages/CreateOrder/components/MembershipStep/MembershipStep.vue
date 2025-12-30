<template>
  <div style="min-height: 68vh">
    <div class="row">
      <p>
        Our records indicate that you have not paid your membership to
        <b>
          {{ $aStore.$state.shul?.shulName }}
        </b>
        for this year. Please Select a Membership option below and this will be added to your order
        at checkout
      </p>
    </div>
    <div class="row">
      <q-radio
        v-if="!$moStore.$state.membership?.membershipRequired"
        v-model="$moStore.$state.membershipType"
        val="none"
        label="No Membership"
      />
      <q-radio v-model="$moStore.$state.membershipType" val="annual" :label="annualLabel" />
      <q-radio v-model="$moStore.$state.membershipType" val="life" :label="lifeLabel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/modules/auth/store/auth.store'
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'
import { computed } from 'vue'
const $moStore = useMemberOrderStore()
const $aStore = useAuthStore()

const annualLabel = computed(() => $moStore.membership?.annualText || '')
const lifeLabel = computed(() => $moStore.membership?.lifeText || '')
</script>

<style scoped lang="scss"></style>
