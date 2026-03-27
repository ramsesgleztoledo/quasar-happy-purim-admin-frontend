<template>
  <template v-if="$rStore.$state.htcBasketReport">
    <div class="col-12 top-title-col justify-content-space-between">
      <div style="height: 100%; display: flex">
        <div class="page-main-title">HTC Basket Report</div>
        <div class="separator-right q-mr-sm q-ml-sm" style="height: 36px"></div>
      </div>
    </div>

    <div class="row q-mt-sm">
      <div class="col-12">
        <div class="row q-mb-sm">
          <div class="page-main-title">Baskets by Size Summary:</div>
        </div>
        <div class="row">
          <q-table
            class="table-sticky-header-column-table sticky-2-column-table-copy"
            flat
            bordered
            :rows="$rStore.$state.htcBasketReport.totalInfo"
            :columns="columnsSummary"
            row-key="basketSize"
            :pagination="{
              rowsPerPage: 100,
            }"
          />
        </div>
      </div>
    </div>
    <div class="row q-mb-sm">
      <div class="col-12">
        <q-separator />
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="row q-mb-sm">
          <div class="page-main-title">Baskets by Route Summary:</div>
        </div>
        <div class="row q-mb-sm">
          <q-input outlined v-model="searchText" label="Search" clearable :debounce="300">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div class="row q-gutter-sm justify-content-center">
          <!-- <div class="col-12"> -->
          <div v-for="item in routesTables" :key="item.routeCode">
            <q-table
              :title="`Route Code: ${item.routeCode}`"
              class="table-sticky-header-column-table sticky-2-column-table-copy"
              flat
              bordered
              :rows="item.data"
              :columns="columnsSummary"
              row-key="basketSize"
              :pagination="{
                rowsPerPage: 100,
              }"
            />
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { QTableColumn } from 'quasar'
import { useReportStore } from 'src/modules/dashboard/store/ReportStore/reportStore'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const $rStore = useReportStore()
const $router = useRouter()

onMounted(async () => {
  if (!$rStore.$state.htcBasketReport)
    return await $router.push({
      name: 'dashboard-MailMergeReportsPage',
    })
})

const searchText = ref('')

const routesTables = computed(() =>
  $rStore.$state.htcBasketReport?.routesTables.filter((rt) =>
    rt.routeCode?.toLowerCase().includes(searchText.value?.toLowerCase()),
  ),
)

const columnsSummary = ref<QTableColumn[]>([
  // total
  // basketSize
  {
    name: 'total',
    required: true,
    label: 'Total',
    align: 'left',
    field: 'total',
    sortable: true,
  },
  {
    name: 'basketSize',
    required: true,
    label: 'BasketSize',
    align: 'left',
    field: 'basketSize',
    sortable: true,
  },
])
</script>

<style scoped lang="scss" src="./HTCBasketReport.scss" />
