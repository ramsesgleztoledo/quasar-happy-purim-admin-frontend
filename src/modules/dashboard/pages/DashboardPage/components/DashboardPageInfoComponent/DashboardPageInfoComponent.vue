<template>
  <div class="row full-width">
    <div
      class="col-12"
      v-for="(info, index) in totalsRaised"
      :key="index"
      :style="{
        cursor: !!info.redirect ? 'pointer' : '',
      }"
      @click="() => onItemClicked(info)"
    >
      <q-item>
        <div class="col-8">
          <q-item-label style="font-weight: 800; font-size: 16px">
            {{ info.text }}
          </q-item-label>
          <q-item-label caption>{{ info.caption }}</q-item-label>
        </div>
        <q-item-section class="DashboardPageInfoComponent-number">
          <div class="col-4">
            <p
              :style="{
                color: info.color,
                'text-decoration': !!info.redirect ? 'underline' : 'none',
                fontSize: '16px',
              }"
            >
              {{ info.number }}
            </p>
          </div>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { convertWithCommas } from 'src/helpers'
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore/dashboardStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const dStore = useDashboardStore()

const $router = useRouter()

interface TotalsRaisedInterface {
  text: string
  caption: string
  number: string
  color: string
  redirect?: {
    name: string
  }
}

const totalsRaised = computed<TotalsRaisedInterface[]>(() => [
  {
    text: 'Total Funds Raised',
    caption: `(Without Reciprocity) - ($${convertWithCommas(dStore.totalsRaised?.totalFundsFromReciprocity || 0)})`,
    number: `$${convertWithCommas(dStore.totalsRaised?.totalFunds || 0)}`,
    color: 'var(--c-color1)',
    redirect: {
      name: 'dashboard-transactionPage',
    },
  },
  {
    text: 'Charitable Contributions',
    caption: '(Included in Total Funds Raised)',
    number: `$${convertWithCommas(dStore.totalsRaised?.totalCharity || 0)}`,
    color: 'var(--c-color2)',
    redirect: {
      name: 'dashboard-donationPage',
    },
  },
  {
    text: 'Total Reciprocity',
    caption: '*Estimated to Date',
    number: `$${convertWithCommas(dStore.totalsRaised?.totalReciprocity || 0)}`,
    color: 'var(--c-color3)',
    // redirect: {
    //   name: 'dashboard-reciprocityChargePage',
    // },
  },
])

const onItemClicked = (info: TotalsRaisedInterface) => {
  if (info.redirect) return $router.push(info.redirect)
}
</script>

<style scoped lang="scss">
@import './DashboardPageInfoComponent.scss';
</style>
