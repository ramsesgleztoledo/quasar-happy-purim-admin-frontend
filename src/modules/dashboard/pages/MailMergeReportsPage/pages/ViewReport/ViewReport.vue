<template>
  <div v-if="report">
    <div class="row q-mb-sm">
      <div
        class="top-title-col"
        :class="{
          'col-4': !isMobile,
          'col-12': isMobile,
        }"
      >
        <p class="page-main-title">{{ $rStore.getReportSelectedName }}</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
      </div>
      <div
        class="top-title-col"
        :class="{
          'col-8': !isMobile,
          'col-12': isMobile,
        }"
      ></div>
    </div>
    <div></div>
    <div class="row q-mb-sm">
      <div class="col-12 justify-content-end">
        <q-btn
          class="q-mr-sm"
          color="primary"
          icon="check"
          label="Email or Print"
          :to="{
            name: 'MailMergeReportsPage-MailMergePage',
            params: { reportId },
          }"
        />
      </div>
    </div>

    <div v-if="$rStore.$state.isCustom" class="row q-pl-md">
      <div class="col-12">
        <div class="row q-mb-sm">
          <p style="margin: 0px">
            <b>Total Yes: </b>
            {{ $rStore.$state.report?.yesCount || 0 }}
          </p>
        </div>
        <div class="row q-mb-sm">
          <p style="margin: 0px">
            <b>Total No: </b>
            {{ $rStore.$state.report?.noCount || 0 }}
          </p>
        </div>
      </div>
      <div class="row">
        <q-checkbox class="q-mr-sm" v-model="yesOnly" label="Show Yes Only" />
        <q-checkbox class="q-mr-sm" v-model="hideNL" label="Hide (N/L) = Not Logged In" />
      </div>
    </div>

    <div v-else class="ViewReport-filters-container q-pa-sm">
      <div class="row q-mb-sm q-mt-sm justify-content-space-between">
        <h6>Filters:</h6>
        <q-btn outline icon="close" label="Clear Filters" @click="clearFilters" />
      </div>

      <div class="row">
        <q-select
          v-if="$dStore.categories.length"
          popup-content-class="q-menu-300"
          class="q-ma-sm"
          :style="{ width: isMobile ? '100%' : '250px' }"
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

        <q-input
          class="q-ma-sm"
          :style="{ width: isMobile ? '100%' : '150px' }"
          v-model="filter.searchTerm"
          outlined
          label="Search"
          clearable
        />

        <template v-if="$rStore.showExtraFilters">
          <q-select
            popup-content-class="q-menu-300"
            clearable
            multiple
            class="q-ma-sm"
            :style="{ width: isMobile ? '100%' : '150px' }"
            v-model="filter.basketSize"
            outlined
            label="Basket Size"
            :options="filterOptions.basketSize"
          />

          <q-select
            popup-content-class="q-menu-300"
            clearable
            class="q-ma-sm"
            :style="{ width: isMobile ? '100%' : '150px' }"
            v-model="filter.donateBasket"
            outlined
            label="Donate Basket"
            :options="filterOptions.donate"
          />

          <q-select
            popup-content-class="q-menu-300"
            clearable
            multiple
            class="q-ma-sm"
            :style="{ width: isMobile ? '100%' : '150px' }"
            v-model="filter.routeCode"
            outlined
            label="Route Code"
            :options="filterOptions.routeCode"
          />

          <q-select
            popup-content-class="q-menu-300"
            clearable
            multiple
            class="q-ma-sm"
            :style="{ width: isMobile ? '100%' : '150px' }"
            v-model="filter.zipCode"
            outlined
            label="Zip Code"
            :options="filterOptions.zipCode"
          />
        </template>
      </div>
    </div>

    <div class="q-pa-md">
      <div class="row white-container" :class="{ fullscreen: isFullScreen }">
        <div class="col-12">
          <div class="row">
            <div class="col-12 justify-content-space-between q-pa-sm">
              <h6>
                {{
                  `Recipients: (${$rStore.$state.selectedRecipients.length}/
              ${$rStore.$state.report?.members.length || 0})`
                }}
              </h6>
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
            v-if="report.members.length"
            :style="{ height: isFullScreen ? '800px' : '628px' }"
            class="table-sticky-header-column-table sticky-2-1-column-table"
            flat
            bordered
            :rows="rows"
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
                <!-- <q-th auto-width /> -->
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
                <!-- <q-td auto-width>
                  <q-btn
                    size="sm"
                    round
                    dense
                    @click="props.expand = !props.expand"
                    :icon="props.expand ? 'remove' : 'add'"
                  />
                </q-td> -->
                <q-td auto-width>
                  <q-checkbox
                    :model-value="props.selected"
                    @update:model-value="(val) => (props.selected = val)"
                    @click.stop
                  />
                </q-td>

                <q-td
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                  style="cursor: pointer"
                >
                  {{ col.value }}
                  <q-tooltip> {{ col.value }}</q-tooltip>
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
            <template v-slot:bottom>
              <div class="row justify-content-end w-full">
                Showing 1 to {{ report.filteredCount }} of {{ report.filteredCount }} entries
                {{
                  areFilterInApplied()
                    ? `(
                filtered from ${report.totalCount} total entries )`
                    : ''
                }}
              </div>
            </template>
          </q-table>
          <div v-else>
            <div class="row">
              <h6>No members found...</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReport } from 'src/modules/dashboard/composables/useReport'
import type {
  RecipientDataInterface,
  RecipientMemberInterface,
} from 'src/modules/dashboard/interfaces/report.interface'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import InnerViewRow from './InnerViewRow.vue'
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore/dashboardStore'
import { useReportStore } from 'src/modules/dashboard/store/ReportStore/reportStore'
import type { NoneType } from 'src/modules/dashboard/services/service-interfaces'
import { useUI } from 'src/modules/UI/composables'
import type { QTableColumn } from 'quasar'

const { getFilterOptions, getReportData } = useReport()
const { reportId } = useRoute().params
const $dStore = useDashboardStore()
const $rStore = useReportStore()
const { isMobile } = useUI()

const isFullScreen = ref(false)
const isTableLoading = ref(false)
const report = ref<RecipientDataInterface | NoneType>($rStore.$state.report)

const rows = computed<RecipientMemberInterface[]>(() => {
  const rec: RecipientMemberInterface[] = $rStore.$state.recipientsFiltered || []

  if (!$rStore.$state.isCustom) return rec

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return rec.filter((row: any) => {
    const customOptionField = `${row['Custom Option']}`

    if (yesOnly.value && customOptionField.toLocaleLowerCase() != 'yes') return false
    if (hideNL.value && customOptionField.toLocaleLowerCase() != 'n/l') return false

    return true
  })
})

const yesOnly = ref(false)
const hideNL = ref(false)
const filter = ref({
  basketSize: [],
  categories: [],
  donateBasket: '',
  routeCode: [],
  searchTerm: '',
  zipCode: [],
})
const filterOptions = ref<{
  zipCode: string[]
  routeCode: string[]
  basketSize: string[]
  donate: string[]
}>({
  zipCode: [],
  routeCode: [],
  basketSize: [],
  donate: [],
})

const areFilterInApplied = () => {
  const { basketSize, categories, donateBasket, routeCode, searchTerm, zipCode } = filter.value

  return (
    (basketSize && basketSize.length) ||
    (categories && categories.length) ||
    (donateBasket && donateBasket.length) ||
    (routeCode && routeCode.length) ||
    (searchTerm && searchTerm.length) ||
    (zipCode && zipCode.length) ||
    yesOnly.value ||
    hideNL.value
  )
}

const timeOut = ref<NodeJS.Timeout | undefined>(undefined)

const columns = computed(() => {
  const columns: QTableColumn[] = $rStore.$state.tokens.map((token) => ({
    name: token,
    required: true,
    label: token,
    align: 'left',
    field: token,
    sortable: true,

    style: 'max-width: 200px; overflow: hidden; text-overflow: ellipsis',
    headerStyle: 'max-width: 200px; overflow: hidden; text-overflow: ellipsis',
  }))
  return columns
})

const getInitialData = () => {
  getReportData(
    {
      ...filter.value,
      id: reportId as string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      categories: filter.value.categories?.map((ca) => `${(ca as any).categoryID}`) || [],
    },
    $rStore.$state.isCustom,
  ).then((res) => {
    report.value = res
    isTableLoading.value = false
  })
}

const clearFilters = () => {
  filter.value = {
    basketSize: [],
    categories: [],
    donateBasket: '',
    routeCode: [],
    searchTerm: '',
    zipCode: [],
  }
  yesOnly.value = false
  hideNL.value = false
}

watch(
  filter,
  () => {
    isTableLoading.value = true
    if (timeOut.value) clearTimeout(timeOut.value)
    timeOut.value = setTimeout(() => {
      getInitialData()
    }, 1000)
  },
  {
    deep: true,
  },
)

onMounted(async () => {
  if (!$rStore.showExtraFilters) return
  filterOptions.value = await getFilterOptions()
})
</script>

<style scoped lang="scss">
h6 {
  margin: 0px;
}
</style>
