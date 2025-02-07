<template>
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
      <div class="row q-mb-sm" v-for="(item, index) in reports" :key="index">
        <div class="col-12">
          <q-item class="MailMergeReportsPage-item">
            <q-item-section avatar>
              <b> {{ index + 1 }} </b>
            </q-item-section>
            <q-item-section
              ><q-item-label>
                <div class="row">
                  {{ item.description }}
                  <p v-if="item.preliminary" style="color: #e43434; margin: 0px; margin-left: 5px">
                    Preliminary
                  </p>
                </div>
              </q-item-label>
              <q-item-label caption> {{ item.caption }} </q-item-label></q-item-section
            >
            <q-item-section side>
              <div class="row">
                <q-btn
                  v-if="item.view"
                  color="primary"
                  flat
                  icon="visibility"
                  label="view report"
                  :to="{
                    name: 'MailMergeReportsPage-MailMergePage',
                    params: {
                      reportId: item.id,
                    },
                  }"
                />
                <q-btn v-if="item.download" color="primary" flat icon="download" label="download" />
              </div>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { ReportInterface } from './data/data'
import { basic, advance, custom } from './data/data'

const $route = useRoute()
const $router = useRouter()

const reports = ref<ReportInterface[]>([...basic])

const pageView = ref('1')
const pageOption = ref([
  { label: 'Basic Reports', value: '1' },
  { label: 'Custom Reports', value: '2' },
  { label: 'Advanced Reports', value: '3' },
])

onMounted(() => {
  loadPage()
})

const goToPage = (page: string) => {
  $router.push({
    name: 'MailMergeReportsPage-MailMergeReportsPage',
    query: {
      page: page,
    },
  })
  switch (pageView.value) {
    case '1':
      reports.value = [...basic]
      break
    case '2':
      reports.value = [...custom]
      break

    default:
      reports.value = [...advance]
      break
  }
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
