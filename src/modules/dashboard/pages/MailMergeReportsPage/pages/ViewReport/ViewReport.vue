<template>
  <div v-if="report">
    <div class="row q-mb-sm">
<div class="col-12 justify-content-end">
<q-btn class="q-mr-sm" color="primary"  icon="check" label="Email or Print" :to="{
 name: 'MailMergeReportsPage-MailMergePage',
 params: { reportId },
}"/>


</div>
    </div>
    <div class="ViewReport-filters-container q-pa-sm">
<div class="row q-mb-sm">
  <h6>
    Filters:
  </h6>
</div>

<div class="row">
  <q-select class="q-ma-sm"
  style="width: 350px;"
          outlined
          v-model="filter.categories"
          multiple
          option-label="categoryName"
          option-value="categoryName"
          :options="$dStore.$state.categories"
          use-chips
          stack-label
          clearable
          label="Filter By Categories"
        />
  <q-input class="q-ma-sm"  style="width: 150px;" v-model="filter.searchTerm" outlined label="Search" />
  <q-input class="q-ma-sm"  style="width: 150px;" v-model="filter.basketSize" outlined label="Basket Size" />
  <q-input class="q-ma-sm"  style="width: 150px;" v-model="filter.donateBasket" outlined label="Donate Basket" />
  <q-input  class="q-ma-sm" style="width: 150px;" v-model="filter.routeCode" outlined label="Route Code" />
  <q-input  class="q-ma-sm" style="width: 150px;" v-model="filter.zipCode" outlined label="Zip Code" />

</div>


    </div>
<div class="row">

</div>

    <div class="q-pa-md">
      <div class="row white-container" :class="{ fullscreen: isFullScreen }">
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
            :style="{ height: isFullScreen ? '800px' : '628px' }"
            class="table-sticky-header-column-table"
            flat:
            bordered
            :title="`Sending To (${$rStore.$state.selectedRecipients.length})`"
            :rows="report.members"
            :columns="columns"
            row-key="ID"
            selection="multiple"
            v-model:selected="$rStore.$state.selectedRecipients"
            :pagination="{
              rowsPerPage: 0,
            }"
            :loading="isTableLoading"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th auto-width />
                <q-th auto-width>
                  <q-checkbox v-model="props.selected" />
                </q-th>
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td auto-width>
                  <q-btn
                    size="sm"
                    round
                    dense
                    @click="props.expand = !props.expand"
                    :icon="props.expand ? 'remove' : 'add'"
                  />
                </q-td>
                <q-td auto-width>
                  <q-checkbox
                    :model-value="props.selected"
                    @update:model-value="(val) => (props.selected = val)"
                    @click.stop
                  />
                </q-td>

                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
              <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                  <div class="text-left">
                    <InnerViewRow :recipient="props.row" />
                  </div>
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
import { useReport } from 'src/modules/dashboard/composables/useReport'
import type {
  RecipientDataInterface,
} from 'src/modules/dashboard/interfaces/report.interface'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import InnerViewRow from './InnerViewRow.vue'
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore/dashboardStore'
import { useReportStore } from 'src/modules/dashboard/store/ReportStore/reportStore'
import type { NoneType } from 'src/modules/dashboard/services/service-interfaces'
import { columns } from '../MailMergePage/data/columns'


const { getViewReport } = useReport()
const { reportId } = useRoute().params
const $dStore = useDashboardStore()
const $rStore = useReportStore()

const isFullScreen = ref(false)
const isTableLoading = ref(false)
const report = ref<RecipientDataInterface | NoneType>($rStore.$state.report)

const filter = ref({
  basketSize: '',
  categories: [],
  donateBasket: '',
  routeCode: '',
  searchTerm: '',
  zipCode: '',
})

const timeOut = ref<NodeJS.Timeout | undefined>(undefined)



const getInitialData = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getViewReport({...filter.value, id: reportId as string, categories: filter.value.categories?.map(ca=> `${(ca as any).categoryID}`) || []}).then((res) => {
    report.value = res

    isTableLoading.value = false
  })
}

watch(filter, () => {
  isTableLoading.value = true
if(timeOut.value)
clearTimeout(timeOut.value)
timeOut.value = setTimeout(() => {
  getInitialData()
  }, 1000)


}, {
  deep: true
})

</script>

<style scoped lang="scss">

h6 {
  margin: 0px;
}

</style>
