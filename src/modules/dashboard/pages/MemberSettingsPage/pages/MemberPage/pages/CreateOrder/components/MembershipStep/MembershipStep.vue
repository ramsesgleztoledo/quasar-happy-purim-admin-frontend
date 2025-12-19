<template>
  <div style="min-height: 68vh">
    <div class="row">
      Our records indicate that you have not paid your membership to {} for this year. Please Select
      a Membership option below and this will be added to your order at checkout
    </div>
    <div class="row">
      <q-radio v-model="membershipType" val="monthly" :label="monthLabel" />
      <q-radio v-model="membershipType" val="yearly" :label="yearLabel" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMemberOrderStore } from 'src/modules/dashboard/store/memberOrderStore/memberOrderStore'
import { ref, computed } from 'vue'
const $moStore = useMemberOrderStore()

const monthLabel = computed(() => $moStore.membership?.lifeText || '')
// const monthPrince = computed(() => $moStore.membership?.lifePrice || 0)

const yearLabel = computed(() => $moStore.membership?.annualText || '')
// const yearPrince = computed(() => $moStore.membership?.annualPrice || 0)

const membershipType = ref<'monthly' | 'yearly'>('monthly')
</script>

<style scoped lang="scss"></style>
