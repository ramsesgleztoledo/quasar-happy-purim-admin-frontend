<template>
  <div class="row">
    <div class="col-12 justify-content-end">
      <q-btn
        class="q-mr-sm"
        color="primary"
        label="Back"
        @click="pos--"
        icon="arrow_back"
        :disable="pos === 0"
      />
      <p class="PreviewEmail-counter q-pa-sm">
        {{ pos + 1 }}/ <b> {{ members.length }} </b>
      </p>
      <q-btn
        class="q-ml-sm"
        color="primary"
        label="Next"
        @click="pos++"
        icon-right="arrow_forward"
        :disable="pos + 1 >= members.length"
      />
    </div>
  </div>
  <div class="row">
    <p>
      <b> Preview Compose Merge </b>
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
</template>

<script setup lang="ts">
import { useMailMerge } from 'src/modules/dashboard/composables/useMailMerge'
import { useReportStore } from 'src/modules/dashboard/store/ReportStore/reportStore'
import { computed, ref, watch } from 'vue'

interface PreviewPropsInterface {
  content: string
}
const $props = defineProps<PreviewPropsInterface>()

const $rStore = useReportStore()
const { getMergedContentByReportAndMember } = useMailMerge()

const pos = ref(0)
const respError = ref(false)

const members = computed(() => $rStore.$state.selectedRecipients.map((re) => re.ID))

const preview = ref('')

watch(
  pos,
  (value) => {
    respError.value = false
    getMergedContentByReportAndMember(members.value[value]!, $props.content).then((res) => {
      console.log({ res })
      if (!res) respError.value = true
      else preview.value = res?.body || ''
    })
  },
  {
    immediate: true,
  },
)
</script>

<style scoped lang="scss">
@import './PreviewEmail';
</style>
