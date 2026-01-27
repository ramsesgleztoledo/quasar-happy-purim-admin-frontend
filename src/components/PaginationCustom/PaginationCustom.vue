<template>
  <div
    class="col-12 PaginationCustom-paginator"
    :style="{
      flexDirection: isMobile ? 'column' : 'row',
    }"
  >
    <div class="PaginationCustom-paginator-align">
      <p class="q-mr-sm PaginationCustom-total-pages">{{ total }} results</p>
      <q-pagination
        class="q-mr-sm"
        :max-pages="total"
        v-model="mValue"
        :min="min"
        :max="max"
        direction-links
        outline
        active-design="unelevated"
        @update:model-value="onPageChange(true)"
      />
    </div>
    <div v-if="showJumpBtn" class="PaginationCustom-paginator-align q-mt-md">
      <p>Jump to page:</p>
      <q-input class="q-mr-sm" style="width: 100px" outlined type="number" v-model="pageGo" />
      <q-btn
        @click="() => goToPage(true)"
        class="q-mr-sm"
        style="background: var(--happypurim); color: white"
        label="GO"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUI } from 'src/modules/UI/composables'
import { computed, onMounted, ref } from 'vue'

const { isMobile } = useUI()

interface PaginatorPropsInterface {
  total: number
  modelValue: number
  showJumpBtn?: boolean
  confirmUpdate?: () => Promise<boolean>
}

const $props = defineProps<PaginatorPropsInterface>()

const $emit = defineEmits<{
  (event: 'page-change', pageNumber: number): void
  (event: 'update:modelValue', pageNumber: number): void
}>()

const mValue = computed({
  get: () => $props.modelValue,
  set: (val: number) => $emit('update:modelValue', val),
})

// const beforePage = ref<number>(1)
// const totalPages = ref<number>(100)

// const currentPage = ref<number>($props.current)
const pageGo = ref<string>('')
const min = ref<number>(1)
const max = ref<number>(3)

onMounted(() => {
  if ($props.total < 5) {
    max.value = $props.total
  }
  pageGo.value = `${$props.modelValue}`
  goToPage()
})

const onPageChange = (emit?: boolean) => {
  if ($props.total > 3) fixPaginator()
  if (emit) $emit('page-change', $props.modelValue)
}

const fixPaginator = () => {
  // const jumped: number = currentPage.value - beforePage.value
  if ($props.modelValue - 1 < 1) {
    min.value = 1
    max.value = 3
    return
  }
  if ($props.modelValue + 1 > $props.total) {
    min.value = $props.total - 2
    max.value = $props.total
    return
  }
  max.value = $props.modelValue + 1
  min.value = $props.modelValue - 1
}

const goToPage = async (emit?: boolean) => {
  if (!pageGo.value) return
  let canGo = true
  if ($props.confirmUpdate) canGo = await $props.confirmUpdate()
  if (!canGo) return

  const pageGoAux = Number(pageGo.value)

  // if (pageGoAux < 1) $props.modelValue = 1
  // if (pageGoAux > $props.total) currentPage.value = $props.total
  // if (pageGoAux >= 1 && pageGoAux <= $props.total) currentPage.value = pageGoAux
  if (pageGoAux < 1) $emit('update:modelValue', 1)
  if (pageGoAux > $props.total) $emit('update:modelValue', $props.total)
  if (pageGoAux >= 1 && pageGoAux <= $props.total) $emit('update:modelValue', pageGoAux)
  pageGo.value = ''

  onPageChange(emit)
}

defineExpose({
  goToPage,
  pageGo,
})
</script>

<style scoped lang="scss">
@import './PaginationCustom';
</style>
