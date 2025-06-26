<template>
  <div v-if="isReady">
    <div class="row q-mb-md">
      <div class="col-12 top-title-col">
        <p class="page-main-title">Advanced Settings</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col-12">
        <q-btn-toggle v-model="pageView" spread no-caps :options="pageOption" />
      </div>
    </div>
    <div v-show="pageView === '1'">
      <ProfileOptions />
    </div>
    <div v-show="pageView === '2'">
      <AdditionalOrderingOptions />
    </div>
    <div v-show="pageView === '3'">
      <BasketSizes />
    </div>
    <template v-if="pageView === '4'">
      <AdditionalReceiptText />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProfileOptions from './components/ProfileOptions/ProfileOptions.vue'
import AdditionalOrderingOptions from './components/AdditionalOrderingOptions/AdditionalOrderingOptions.vue'
import BasketSizes from './components/BasketSizes/BasketSizes.vue'
import AdditionalReceiptText from './components/AdditionalReceiptText/AdditionalReceiptText.vue'
import { useAdvancedSettings } from 'src/modules/dashboard/composables/useAdvancedSettings'

const $route = useRoute()
const $router = useRouter()
const { getAdvancedSettings } = useAdvancedSettings()

const isReady = ref(false)

const pageView = ref('1')
const pageOption = ref([
  { label: 'Profile Options/Questions', value: '1' },
  { label: 'Additional Ordering Options', value: '2' },
  { label: 'Basket Sizes', value: '3' },
  { label: 'Additional Receipt Text', value: '4' },
])

onMounted(() => {
  loadPage()
  getAdvancedSettings()
    .catch(console.error)
    .finally(() => (isReady.value = true))
})

const goToPage = (page: string) => {
  $router.push({
    name: 'dashboard-SiteManagerPage-AdvanceSettingsPage',
    query: {
      page: page,
    },
  })
}

const loadPage = () => {
  const { page } = $route.query
  if (page) {
    const exist = pageOption.value.find((p) => p.value === page)
    if (exist) pageView.value = page as string
    else goToPage('1')
  } else goToPage('1')
}

watch(pageView, (value) => {
  goToPage(value)
})
</script>

<style scoped lang="scss"></style>
