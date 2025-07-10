<template>
  <div v-if="isReady">
    <div class="row q-mb-md">
      <div class="col-12 top-title-col">
        <p class="page-main-title">Mail Merge & Reports</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col-12 top-title-col">
        <p class="page-main-title">Reports</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
        <p>
          In this section, you can view reports and start the
          <b> Mail Merge </b>
          process by selecting a report and choosing either
          <b> Email </b>
          or
          <b> Print </b>.
        </p>
      </div>
    </div>

    <div class="row q-mb-md">
      <q-btn-toggle v-model="pageView" spread no-caps :options="pageOption" style="width: 445px" />
    </div>

    <div class="row">
      <div class="col-12 MailMergeReportsPage-container">
        <div class="row q-mb-sm" v-for="(item, index) in reports" :key="item.reportID">
          <div class="col-12">
            <q-item class="MailMergeReportsPage-item">
              <q-item-section avatar>
                <b> {{ index + 1 }} </b>
              </q-item-section>
              <q-item-section
                ><q-item-label>
                  <div class="row">
                    {{ item.name }}
                  </div>
                </q-item-label>
                <q-item-label caption> {{ item.summary }} </q-item-label></q-item-section
              >
              <q-item-section side>
                <div class="row">
                  <q-btn
                    class="q-mr-sm"
                    padding="none"
                    color="primary"
                    flat
                    icon="visibility"
                    :to="{
                      name: 'MailMergeReportsPage-ViewReport',
                      params: {
                        reportId: item.reportID,
                      },
                    }"
                  />
                  <q-btn
                    class="q-mr-sm"
                    padding="none"
                    color="primary"
                    flat
                    icon="download"
                    @click="downloadReportExcelByReportId(item)"
                  />
                  <q-btn
                    class="q-mr-sm"
                    padding="none"
                    color="primary"
                    flat
                    icon="email"
                    :to="{
                      name: 'MailMergeReportsPage-MailMergePage',
                      params: { reportId: item.reportID },
                    }"
                  />
                  <q-btn
                    class="q-mr-sm"
                    padding="none"
                    color="primary"
                    flat
                    icon="print"
                    :to="{
                      name: 'MailMergeReportsPage-MailMergePage',
                      params: { reportId: item.reportID },
                    }"
                  />
                </div>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useReport } from 'src/modules/dashboard/composables/useReport'
import type { ReportDataInterface } from 'src/modules/dashboard/interfaces/report.interface'
import { useReportStore } from 'src/modules/dashboard/store/ReportStore/reportStore'

const $route = useRoute()
const $router = useRouter()
const { getReportList, downloadReportExcelByReportId } = useReport()
const $rStore = useReportStore()

const reports = computed<ReportDataInterface[]>(() => {
  switch (pageView.value) {
    case '1':
      return $rStore.$state.basicReports
    case '2':
      return $rStore.$state.advancedReports
    default:
      return $rStore.$state.customReports
  }
})

const isReady = ref<boolean>(false)

const pageView = ref('1')
const pageOption = ref([
  { label: 'Basic Reports', value: '1' },
  { label: 'Advanced Reports', value: '2' },
  { label: 'Custom Reports', value: '3' },
])

onMounted(() => {
  loadPage()
  getReportList().finally(() => {
    isReady.value = true
  })
})

const goToPage = (page: string) => {
  $router.push({
    name: 'MailMergeReportsPage-MailMergeReportsPage',
    query: {
      page: page,
    },
  })
}

const loadPage = () => {
  const { page } = $route.query
  if (page) {
    const exist = pageOption.value.find((p) => p.value === page)
    if (exist) {
      pageView.value = page as string
    } else goToPage('1')
  } else goToPage('1')
}

watch(pageView, (value) => {
  goToPage(value)
})
</script>

<style scoped lang="scss">
@import './MailMergeReportsPage';
</style>
