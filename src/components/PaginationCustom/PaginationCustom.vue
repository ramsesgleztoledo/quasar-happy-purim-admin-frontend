<template>
  <div
    class="col-12 PaginationCustom-paginator"
    :style="{
      flexDirection: isMobile ? 'column' : 'row',
    }"
  >
    <div class="PaginationCustom-paginator-align q-mt-md">
      <p class="q-mr-sm PaginationCustom-total-pages">{{ totalPages }} results</p>
      <q-pagination
        class="q-mr-sm"
        :max-pages="totalPages"
        v-model="currentPage"
        :min="min"
        :max="max"
        direction-links
        outline
        active-design="unelevated"
        @update:model-value="onPageChange"
      />
    </div>
    <div class="PaginationCustom-paginator-align q-mt-md">
      <p>Jump to page:</p>
      <q-input class="q-mr-sm" style="width: 100px" outlined type="number" v-model="pageGo" />
      <q-btn
        @click="goToPage"
        class="q-mr-sm"
        style="background: var(--happypurim); color: white"
        label="GO"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUI } from 'src/modules/UI/composables'
import { onMounted, ref } from 'vue'

const { isMobile } = useUI()

// const beforePage = ref<number>(1)
const currentPage = ref<number>(1)
const pageGo = ref<string>('')
const totalPages = ref<number>(100)
const min = ref<number>(1)
const max = ref<number>(3)

onMounted(() => {
  if (totalPages.value < 5) {
    max.value = totalPages.value
  }
})

const $emit = defineEmits<{
  (event: 'page-change', pageNumber: number): void
}>()

const onPageChange = () => {
  console.log('page changed', { currentPage: currentPage.value })

  if (totalPages.value > 3) fixPaginator()
  $emit('page-change', currentPage.value)
}

const fixPaginator = () => {
  // const jumped: number = currentPage.value - beforePage.value
  if (currentPage.value - 1 < 1) {
    min.value = 1
    max.value = 3
    return
  }
  if (currentPage.value + 1 > totalPages.value) {
    min.value = totalPages.value - 2
    max.value = totalPages.value
    return
  }
  max.value = currentPage.value + 1
  min.value = currentPage.value - 1
}

const goToPage = () => {
  if (!pageGo.value) return
  const pageGoAux = Number(pageGo.value)

  if (pageGoAux < 1) currentPage.value = 1
  if (pageGoAux > totalPages.value) currentPage.value = totalPages.value
  if (pageGoAux >= 1 && pageGoAux <= totalPages.value) currentPage.value = pageGoAux
  pageGo.value = ''

  onPageChange()
}
</script>

<style scoped lang="scss">
@import './PaginationCustom';
</style>
