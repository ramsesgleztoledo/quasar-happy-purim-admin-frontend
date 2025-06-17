<template>
  <div class="row">
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
        <q-item-section>
          <q-item-label>
            <b> {{ info.text }} </b>
          </q-item-label>
          <q-item-label caption>{{ info.caption }}</q-item-label>
        </q-item-section>
        <q-item-section class="DashboardPageInfoComponent-number">
          <q-item-label>
            <p
              :style="{
                color: info.color,
                'text-decoration': !!info.redirect ? 'underline' : 'none',
              }"
            >
              {{ info.number }}
            </p>
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
    caption: `from reciprocity - ($${convertWithCommas(dStore.totalsRaised?.totalFundsFromReciprocity || 0)})`,
    number: `$${convertWithCommas(dStore.totalsRaised?.totalFunds || 0)}`,
    color: 'var(--c-color1)',
    redirect: {
      name: 'dashboard-transactionPage',
    },
  },
  {
    text: 'Charitable Contributions',
    caption: 'Global',
    number: `$${convertWithCommas(dStore.totalsRaised?.totalCharity || 0)}`,
    color: 'var(--c-color2)',
    redirect: {
      name: 'dashboard-donationPage',
    },
  },
  {
    text: 'Total Reciprocity',
    caption: 'Global',
    number: `$${convertWithCommas(dStore.totalsRaised?.totalReciprocity || 0)}`,
    color: 'var(--c-color3)',
  },
])

const onItemClicked = (info: TotalsRaisedInterface) => {
  if (info.redirect) return $router.push(info.redirect)
}
</script>

<style scoped lang="scss">
@import './DashboardPageInfoComponent.scss';
</style>
