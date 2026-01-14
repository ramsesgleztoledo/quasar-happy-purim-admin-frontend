<template>
  <q-card class="bg-color" :style="{ width: isMobile ? '100vw' : '50vw' }">
    <div class="row member-stats-dialog-header" style="background-color: unset">
      <div class="col-12">
        <p>MEMBER DASHBOARD</p>
      </div>
    </div>
    <q-separator style="background-color: var(--happypurim)" />
    <q-card-section class="row items-center">
      <div class="member-stats-container">
        <div class="row justify-content-center">
          <div
            class="col-12 col-sm-4 col-md-3 col-lg-3 q-pa-sm"
            v-for="(item, index) in data"
            :key="index"
          >
            <div class="member-stats-card">
              <div class="row member-stat-title">
                <b>
                  {{ item.msg }}
                </b>
              </div>
              <div class="row member-stat-value">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
    <q-separator style="background-color: var(--happypurim)" />
    <q-card-actions align="right">
      <q-btn
        label="Close"
        class="q-mr-sm q-mt-sm"
        style="color: #990000; border-color: #990000; background-color: white"
        v-close-popup
        outline
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { useUI } from 'src/modules/UI/composables'
import { ref } from 'vue'

const { isMobile } = useUI()

const data = ref([
  {
    msg: 'TOTAL ORDERS',
    value: `147`,
  },
  {
    msg: 'TOTAL SPENT',
    value: `$2,450`,
  },
  {
    msg: 'YEARS ACTIVE',
    value: `5`,
  },
  {
    msg: 'BASKETS SENT',
    value: `330`,
  },
  {
    msg: 'BASKETS RECEIVED',
    value: `15`,
  },
  {
    msg: 'VOLUNTEER HOURS',
    value: `45`,
  },
  {
    msg: 'TOTAL ORDERS',
    value: `147`,
  },
  {
    msg: 'TOTAL SPENT',
    value: `$2,450`,
  },
  {
    msg: 'YEARS ACTIVE',
    value: `5`,
  },
  {
    msg: 'BASKETS SENT',
    value: `330`,
  },
  {
    msg: 'BASKETS RECEIVED',
    value: `15`,
  },
  {
    msg: 'VOLUNTEER HOURS',
    value: `45`,
  },
  {
    msg: 'TOTAL SPENT',
    value: `$2,450`,
  },
  {
    msg: 'YEARS ACTIVE',
    value: `5`,
  },
  {
    msg: 'BASKETS SENT',
    value: `330`,
  },
  {
    msg: 'BASKETS RECEIVED',
    value: `15`,
  },
  {
    msg: 'VOLUNTEER HOURS',
    value: `45`,
  },
  {
    msg: 'TOTAL SPENT',
    value: `$2,450`,
  },
  {
    msg: 'YEARS ACTIVE',
    value: `5`,
  },
  {
    msg: 'BASKETS SENT',
    value: `330`,
  },
  {
    msg: 'BASKETS RECEIVED',
    value: `15`,
  },
  {
    msg: 'VOLUNTEER HOURS',
    value: `45`,
  },
  {
    msg: 'TOTAL SPENT',
    value: `$2,450`,
  },
  {
    msg: 'YEARS ACTIVE',
    value: `5`,
  },
  {
    msg: 'BASKETS SENT',
    value: `330`,
  },
  {
    msg: 'BASKETS RECEIVED',
    value: `15`,
  },
  {
    msg: 'VOLUNTEER HOURS',
    value: `45`,
  },
  {
    msg: 'TOTAL SPENT',
    value: `$2,450`,
  },
  {
    msg: 'YEARS ACTIVE',
    value: `5`,
  },
  {
    msg: 'BASKETS SENT',
    value: `330`,
  },
  {
    msg: 'BASKETS RECEIVED',
    value: `15`,
  },
  {
    msg: 'VOLUNTEER HOURS',
    value: `45`,
  },
  {
    msg: 'TOTAL SPENT',
    value: `$2,450`,
  },
  {
    msg: 'YEARS ACTIVE',
    value: `5`,
  },
  {
    msg: 'BASKETS SENT',
    value: `330`,
  },
  {
    msg: 'BASKETS RECEIVED',
    value: `15`,
  },
  {
    msg: 'VOLUNTEER HOURS',
    value: `45`,
  },
])
</script>

<style scoped lang="scss" src="./MemberStatsDialog.scss" />
