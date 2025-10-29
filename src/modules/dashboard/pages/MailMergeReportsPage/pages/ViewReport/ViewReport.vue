<template>
  <div v-if="report">
    <div class="row">
      <div class="col-12 top-title-col justify-content-space-between">
        <div style="height: 100%; display: flex">
          <p class="page-main-title">{{ $rStore.getReportSelectedReportData?.name }}</p>
          <div class="separator-right q-mr-sm q-ml-sm"></div>
        </div>
        <q-btn
          v-if="!$rStore.getReportSelectedReportData?.viewOnly"
          color="primary"
          icon="draw"
          label="Create Mail Merge"
          :to="{
            name: 'MailMergeReportsPage-MailMergePage',
            params: { reportId },
          }"
        />
      </div>
    </div>

    <div
      v-if="$rStore.$state.isCustom && $rStore.getReportSelectedReportData?.reportID != '12'"
      class="row"
    >
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
    </div>

    <div class="ViewReport-filters-container">
      <div class="row q-mt-sm">
        <q-input
          class="q-mr-sm q-mb-sm"
          :style="{ width: isMobile ? '100%' : '250px' }"
          v-model="filter.searchTerm"
          outlined
          label="Search"
          clearable
        />

        <q-select
          v-if="
            $dStore.categories.length &&
            (!$rStore.$state.isCustom || $rStore.getReportSelectedReportData?.reportID == '12')
          "
          popup-content-class="q-menu-300"
          class="q-mr-sm q-mb-sm"
          :style="{ width: isMobile ? '100%' : '250px' }"
          outlined
          v-model="filter.categories"
          multiple
          option-label="categoryName"
          option-value="categoryName"
          :options="$dStore.$state.categories"
          clearable
          label="Filter By Categories"
        />
        <div
          v-if="$rStore.$state.isCustom && $rStore.getReportSelectedReportData?.reportID != '12'"
        >
          <q-checkbox class="q-mr-sm" v-model="filter.yesOnly" label="Show Yes Only" />
          <q-checkbox class="q-mr-sm" v-model="filter.hideNL" label="Hide (N/L) = Not Logged In" />
        </div>
        <template v-if="showMoreFilters">
          <template v-if="!$rStore.$state.isCustom">
            <template v-if="$rStore.showExtraFilters">
              <q-select
                popup-content-class="q-menu-300"
                clearable
                multiple
                class="q-mr-sm q-mb-sm"
                :style="{ width: isMobile ? '100%' : '150px' }"
                v-model="filter.basketSize"
                outlined
                label="Basket Size"
                :options="filterOptions.basketSize"
              />

              <q-select
                popup-content-class="q-menu-300"
                clearable
                class="q-mr-sm q-mb-sm"
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
                class="q-mr-sm q-mb-sm"
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
                class="q-mr-sm q-mb-sm"
                :style="{ width: isMobile ? '100%' : '150px' }"
                v-model="filter.zipCode"
                outlined
                label="Zip Code"
                :options="filterOptions.zipCode"
              />
            </template>
          </template>
        </template>
        <q-btn
          class="q-mr-sm q-mb-sm"
          style="max-height: 42px"
          :style="{ width: isMobile ? '100%' : '' }"
          outline
          icon="close"
          @click="clearFilters"
        />
        <!-- label="Clear Filters" -->
        <q-btn
          v-if="
            !showMoreFilters && $rStore.showExtraFilters && !$rStore.$state.isCustom
            // ($rStore.showExtraFilters ||
            //   ($rStore.$state.isCustom && $rStore.getReportSelectedReportData?.reportID != '12'))
          "
          style="max-height: 42px"
          color="primary"
          icon="filter_alt"
          label="Show More Filters"
          @click="showMoreFilters = true"
        />
      </div>
    </div>

    <div>
      <div class="row white-container" :class="{ fullscreen: isFullScreen }">
        <div class="col-12">
          <div class="row">
            <div class="col-12 justify-content-space-between">
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

          <div class="row" v-if="$rStore.report?.members?.length">
            <div class="col-12">
              <q-table
                :style="{ height: isFullScreen ? '800px' : '628px' }"
                class="table-sticky-header-column-table sticky-2-column-table-copy"
                flat
                bordered
                :rows="rows"
                :columns="columns"
                row-key="ID"
                selection="multiple"
                v-model:selected="$rStore.$state.selectedRecipients"
                :pagination="{
                  rowsPerPage: 100,
                }"
                :loading="isTableLoading"
              >
                <template v-slot:header="props">
                  <q-tr :props="props">
                    <!-- <q-th auto-width /> -->
                    <q-th auto-width v-if="!$rStore.getReportSelectedReportData?.viewOnly">
                      <!-- <q-checkbox v-model="props.selected" /> -->
                      <q-checkbox
                        v-model="allRowSelected"
                        @click="selectUnselectAllRows"
                        style="width: 56px"
                      />
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
                    <q-td
                      style="width: 56px"
                      auto-width
                      v-if="!$rStore.getReportSelectedReportData?.viewOnly"
                    >
                      <div></div>
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
                      style="cursor: pointer; width: 100px !important"
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
                <!-- <template v-slot:bottom>
              <div class="row justify-content-end w-full">
                Showing 1 to {{ report.filteredCount }} of {{ report.filteredCount }} entries
                {{
                  areFilterInApplied()
                    ? `(
                filtered from ${report.totalCount} total entries )`
                    : ''
                }}
              </div>
            </template> -->
              </q-table>
              <div class="row">
                <div class="row justify-content-end w-full">
                  Showing {{ report.filteredCount }} of {{ report.filteredCount }} entries
                  {{
                    areFilterInApplied()
                      ? `(
                filtered from ${report.totalCount} total entries )`
                      : ''
                  }}
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="row">
              <h6>No members found</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <q-inner-loading :showing="true" label="Loading ..."> </q-inner-loading>
  </div>
</template>

<script setup lang="ts">
import { useReport } from 'src/modules/dashboard/composables/useReport'
import type {
  RecipientDataInterface,
  RecipientMemberInterface,
} from 'src/modules/dashboard/interfaces/report.interface'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
const $router = useRouter()
const notFirstTime = ref(false)

const allRowSelected = computed(() => {
  if ($rStore.$state.selectedRecipients.length === rows.value.length && rows.value.length > 0)
    return true
  else if ($rStore.$state.selectedRecipients.length === 0) return false
  else return null
})

const selectUnselectAllRows = () => {
  if ($rStore.$state.selectedRecipients.length) $rStore.$state.selectedRecipients = []
  else $rStore.$state.selectedRecipients = rows.value.map((row) => ({ ...row }))
}

const isFullScreen = ref(false)
const showMoreFilters = ref(false)

const isTableLoading = ref(false)
const report = ref<RecipientDataInterface | NoneType>($rStore.$state.report)

const rows = computed<RecipientMemberInterface[]>(() => {
  const rec: RecipientMemberInterface[] = $rStore.$state.recipientsFiltered || []

  if (!$rStore.$state.isCustom) return rec

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return rec.filter((row: any) => {
    const customOptionField = `${row['Custom Option']}`

    if (filter.value.yesOnly && customOptionField.toLowerCase() != 'yes') return false

    if (filter.value.hideNL && customOptionField.toLowerCase() === 'n/l') return false

    return true
  })
})

const filter = ref({
  basketSize: [],
  categories: [],
  donateBasket: '',
  routeCode: [],
  searchTerm: '',
  zipCode: [],
  yesOnly: false,
  hideNL: false,
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
  const { basketSize, categories, donateBasket, routeCode, searchTerm, zipCode, hideNL, yesOnly } =
    filter.value

  return (
    (basketSize && basketSize.length) ||
    (categories && categories.length) ||
    (donateBasket && donateBasket.length) ||
    (routeCode && routeCode.length) ||
    (searchTerm && searchTerm.length) ||
    (zipCode && zipCode.length) ||
    yesOnly ||
    hideNL
  )
}

const timeOut = ref<NodeJS.Timeout | undefined>(undefined)

const columns = computed(() => {
  const columns: QTableColumn[] = $rStore.$state.tokens.map((token, index) => ({
    name: token,
    required: true,
    label: token,
    align: 'left',
    field: token,
    sortable: true,
    style:
      index == 0
        ? 'width: 56px; overflow: hidden; text-overflow: ellipsis'
        : 'width: 100px; overflow: hidden; text-overflow: ellipsis',
    headerStyle:
      index == 0
        ? 'width: 56px; overflow: hidden; text-overflow: ellipsis'
        : 'width: 100px; overflow: hidden; text-overflow: ellipsis',
  }))
  return columns
})

const getInitialData = async () => {
  goToPageWithFilters()
  const res = await getReportData(
    {
      ...filter.value,
      id: reportId as string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      categories: filter.value.categories?.map((ca) => `${(ca as any).categoryID}`) || [],
    },
    $rStore.$state.isCustom,
    notFirstTime.value,
  )
  notFirstTime.value = true
  report.value = res
  isTableLoading.value = false
}

const goToPageWithFilters = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = {}
  if (!$rStore.$state.isCustom)
    query = {
      basketSize: JSON.stringify(filter.value.basketSize),
      categories: JSON.stringify(filter.value.categories),
      donateBasket: filter.value.donateBasket,
      routeCode: JSON.stringify(filter.value.routeCode),
      searchTerm: filter.value.searchTerm,
      zipCode: JSON.stringify(filter.value.zipCode),
      isCustom: 'false',
    }
  else
    query = {
      yesOnly: `${filter.value.yesOnly}`,
      hideNL: `${filter.value.hideNL}`,
      isCustom: 'true',
    }

  $router.replace({
    query,
  })
  // $router.push({
  //   name: 'MailMergeReportsPage-ViewReport',
  //   params: { reportId },
  //   query,
  // })
}

const clearFilters = () => {
  filter.value = {
    basketSize: [],
    categories: [],
    donateBasket: '',
    routeCode: [],
    searchTerm: '',
    zipCode: [],
    yesOnly: false,
    hideNL: false,
  }
}

watch(
  filter,
  async () => {
    isTableLoading.value = true
    if (timeOut.value) clearTimeout(timeOut.value)
    timeOut.value = setTimeout(async () => {
      await getInitialData()
    }, 500)
  },
  {
    deep: true,
  },
)

onMounted(async () => {
  const {
    basketSize,
    categories,
    donateBasket,
    routeCode,
    searchTerm,
    zipCode,
    yesOnly: yesOnlyValue,
    hideNL: hideNLValue,
  } = useRoute().query

  const auxFilters = {
    basketSize: [],
    categories: [],
    donateBasket: '',
    routeCode: [],
    searchTerm: '',
    zipCode: [],
    yesOnly: false,
    hideNL: false,
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  auxFilters.basketSize = basketSize ? JSON.parse(basketSize as any) : []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  auxFilters.categories = categories ? JSON.parse(categories as any) : []
  auxFilters.donateBasket = donateBasket ? (donateBasket as string) : ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  auxFilters.routeCode = routeCode ? JSON.parse(routeCode as any) : []
  auxFilters.searchTerm = searchTerm ? (searchTerm as string) : ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  auxFilters.zipCode = zipCode ? JSON.parse(zipCode as any) : []

  auxFilters.yesOnly = yesOnlyValue ? (yesOnlyValue as string) == 'true' : false
  auxFilters.hideNL = hideNLValue ? (hideNLValue as string) == 'true' : false

  filter.value = { ...auxFilters }

  if (!$rStore.showExtraFilters) return
  filterOptions.value = await getFilterOptions()
})
</script>

<style scoped lang="scss">
h6 {
  margin: 0px;
}
</style>
