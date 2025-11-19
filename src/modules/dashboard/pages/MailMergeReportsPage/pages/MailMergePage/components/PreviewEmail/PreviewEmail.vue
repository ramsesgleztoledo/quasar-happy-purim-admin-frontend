<template>
  <div v-if="!isLoading">
    <div class="row">
      <div class="col-12 justify-content-end">
        <q-btn
          class="q-mr-sm"
          color="primary"
          label="Back"
          @click="handlePos(-1)"
          icon="arrow_back"
          :disable="Number(pos) === 1"
        />
        <q-input
          v-model="pos"
          type="text"
          class="pos-input"
          style="width: 38px"
          :debounce="500"
          @keypress="numbersOnly"
        />
        <p class="PreviewEmail-counter">
          <b> {{ `/ ${members.length}` }} </b>
        </p>
        <q-btn
          class="q-ml-sm"
          color="primary"
          label="Next"
          @click="handlePos(1)"
          icon-right="arrow_forward"
          :disable="Number(pos) >= members.length"
        />
      </div>
    </div>
    <div class="row">
      <p>
        <b> Preview Composed Merge </b>
      </p>
    </div>
    <div class="row">
      <div v-if="!respError" class="col-12 q-pa-lg PreviewEmail-preview-container">
        <div v-html="preview"></div>
      </div>
      <div v-else class="col-12 q-pa-lg">
        We could not get data for this member ( he/she is missing some information)
      </div>
    </div>
  </div>
  <!-- <q-inner-loading :showing="isLoading" label="Loading..." /> -->
</template>

<script setup lang="ts">
import { numbersOnly } from 'src/helpers/numbersOnly'
import { useMailMerge } from 'src/modules/dashboard/composables/useMailMerge'
import { useReportStore } from 'src/modules/dashboard/store/ReportStore/reportStore'
import { computed, ref, watch } from 'vue'

interface PreviewPropsInterface {
  content: string
}
const $props = defineProps<PreviewPropsInterface>()

const $rStore = useReportStore()
const { getMergedContentPrintByReportAndMember } = useMailMerge()

const pos = ref('1')
const respError = ref(false)
const isLoading = ref(false)

const members = computed(() => $rStore.$state.selectedRecipients.map((re) => re.ID))

const preview = ref('')

const onPosChange = (value: string) => {
  if (!members.value.length) return

  const position = Number(value)
  if (isNaN(position)) return

  if (position > members.value.length) {
    pos.value = `${members.value.length}`
    return
  }
  if (position < 1) {
    return (pos.value = `1`)
  }

  return handlePage(position)
}

const $emit = defineEmits(['', 'onContinue'])

const handlePos = (value: number) => {
  const position = Number(pos.value)
  if (isNaN(position)) return
  pos.value = `${value + position}`
}

const handlePage = async (position: number) => {
  respError.value = false

  const res = await getMergedContentPrintByReportAndMember(
    members.value[position - 1]!,
    $props.content,
  )
  if (!res) {
    // respError.value = true
    $emit('onContinue', true)
  } else preview.value = res?.body || ''
  isLoading.value = false
}

watch(
  pos,
  (value: string) => {
    isLoading.value = true

    onPosChange(value)
  },
  {
    immediate: true,
  },
)
</script>

<style scoped lang="scss">
@import './PreviewEmail';
</style>
