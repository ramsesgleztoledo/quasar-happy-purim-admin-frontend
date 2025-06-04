<template>
  <div class="row">
    <div class="col-12" v-for="(info, index) in totalsRaised" :key="index">
      <q-item>
        <q-item-section>
          <q-item-label>
            <b> {{ info.text }} </b>
          </q-item-label>
          <q-item-label caption>{{ info.caption }}</q-item-label>
        </q-item-section>
        <q-item-section class="DashboardPageInfoComponent-number">
          <q-item-label>
            <p :style="{ color: info.color }">{{ info.number }}</p>
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertWithCommas } from 'src/helpers'
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore/dashboardStore'
import { computed } from 'vue'

const dStore = useDashboardStore()

const totalsRaised = computed(() => [
  {
    text: 'Total Funds Raised',
    caption: `from reciprocity - ($${convertWithCommas(dStore.totalsRaised?.totalFundsFromReciprocity || 0)})`,
    number: `$${convertWithCommas(dStore.totalsRaised?.totalFunds || 0)}`,
    color: 'var(--c-color1)',
  },
  {
    text: 'Charitable Contributions',
    caption: 'Global',
    number: `$${convertWithCommas(dStore.totalsRaised?.totalCharity || 0)}`,
    color: 'var(--c-color2)',
  },
  {
    text: 'Total Reciprocity',
    caption: 'Global',
    number: `$${convertWithCommas(dStore.totalsRaised?.totalReciprocity || 0)}`,
    color: 'var(--c-color3)',
  },
])
</script>

<style scoped lang="scss">
@import './DashboardPageInfoComponent.scss';
</style>
