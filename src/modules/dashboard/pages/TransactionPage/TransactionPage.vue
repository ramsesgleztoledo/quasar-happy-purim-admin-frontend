<template>
  <div v-if="!!dashboardState.membersLogged">
    <div class="row q-mb-md">
      <div class="col-12 top-title-col">
        <p class="page-main-title">Processed Transactions ({{ transactions.count }})</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-12 d-flex justify-content-end">
        <q-input disable outlined v-model="searchText" label="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>

    <div class="q-pa-md">
      <div class="row table-white-container" :class="{ fullscreen: isFullScreen }">
        <div class="col-12">
          <div class="row">
            <div class="col-12 justify-content-end">
              <q-btn
                flat
                round
                color="primary"
                :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="isFullScreen = !isFullScreen"
              />
            </div>
          </div>
          <q-table
            title="Transactions"
            :style="{ height: isFullScreen ? '800px' : '600px' }"
            class="table-sticky-header-column-table"
            flat
            bordered
            ref="tableRef"
            :rows="transactions.transactions"
            :columns="columns"
            row-key="id"
            styles="height: 360px"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  <q-btn
                    v-if="col.name === 'invoiceNum'"
                    flat
                    color="primary"
                    :label="col.value"
                    :to="{
                      name: 'dashboard-transactionDetailsPage',
                      params: { transactionID: props.row.invoiceNum },
                    }"
                  />

                  <q-btn
                    v-else-if="col.name === 'memberName'"
                    flat
                    color="primary"
                    :label="col.value"
                    :to="{
                      name: 'MemberLayout',
                      params: { memberId: props.row.memberID },
                    }"
                  />

                  <p v-else>
                    {{ col.value }}
                  </p>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { useDashboard } from '../../composables/useDashboard'
import { onMounted, ref } from 'vue'
import { useTransaction } from '../../composables/useTransaction'
import type {
  TransactionInterface,
  TransactionsInterface,
} from '../../interfaces/transaction-interfaces'
import { convertToUSDate, convertWithCommas } from 'src/helpers'

const { dashboardState } = useDashboard()

const columns: QTableColumn<TransactionInterface>[] = [
  {
    name: 'invoiceNum',
    required: true,
    label: 'Invoice #',
    align: 'left',
    field: 'invoiceNum',
    // format: (val: any) => `${val}`,
    sortable: true,
  },
  {
    name: 'cardType',
    required: true,
    label: 'Card Type',
    align: 'left',
    field: 'cardType',
    sortable: true,
  },
  {
    name: 'postedOn',
    required: true,
    label: 'Posted On',
    align: 'left',
    field: 'postedOn',
    sortable: true,
    format: (processed: string) => convertToUSDate(processed),
  },
  {
    name: 'charge',
    required: true,
    label: 'Charge Amount',
    align: 'left',
    field: 'charge',
    format: (amount: number) => `$${convertWithCommas(amount)}`,
    sortable: true,
  },
  {
    name: 'nameOnCard',
    required: true,
    label: 'Name On Card',
    align: 'left',
    field: 'nameOnCard',
    sortable: true,
  },
  {
    name: 'memberName',
    required: true,
    label: 'Member Name',
    align: 'left',
    field: 'memberName',
    sortable: true,
  },
]

const { getTransactions } = useTransaction()

const transactions = ref<TransactionsInterface>({
  count: 0,
  transactions: [],
})

const searchText = ref<string>('')
const isFullScreen = ref<boolean>(false)

onMounted(() => {
  getTransactions().then((resp) => {
    transactions.value = resp
  })
})
</script>

<style scoped lang="scss">
@import './TransactionPage.scss';
</style>
