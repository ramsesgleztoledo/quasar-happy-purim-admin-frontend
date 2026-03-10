<template>
  <q-dialog v-model="modelVisible">
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Spam Analyzer</p>
        </div>
      </div>

      <q-card-section class="q-pt-none" style="padding: 12px; max-height: 500px; overflow: auto;">
        <textarea
          v-model="subjectModel"
          id="txtSubject"
          placeholder="Subject"
          style="display: none"
        />
        <textarea
          v-model="bodyModel"
          id="spam-analyzer-body"
          placeholder="Body"
          style="display: none"
        />
        <div id="spam-analyzer-container"></div>
      </q-card-section>

      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn label="Close" color="negative" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

interface SpamAnalyzerPropsInterface {
  tokens: string[]
  subject: string
  body: string
  modelValue: boolean
}

const $props = defineProps<SpamAnalyzerPropsInterface>()

const $emit = defineEmits(['update:modelValue', 'update:subject', 'update:body'])

const modelVisible = computed({
  get: () => $props.modelValue,
  set: (val) => $emit('update:modelValue', val),
})
const subjectModel = computed({
  get: () => $props.subject,
  set: (val) => $emit('update:subject', val),
})
const bodyModel = computed({
  get: () => $props.body,
  set: (val) => $emit('update:body', val),
})

const mountAnalyzer = () => {
  const script = document.createElement('script')
  script.src = 'https://spamanalyzer.hpsend.com/widget/spam-analyzer.js'
  script.onload = () => {
    if (window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).SpamAnalyzer.init({
        apiUrl: 'https://spamanalyzer.hpsend.com/api/analyze',
        apiKey: '6b76f93f-bf47-491e-8343-b29efd4ebef1',
        userId: 'ramses',
        subjectSelector: '#txtSubject',
        bodyEditorId: 'bodyEditorId',
        containerId: 'spam-analyzer-container',
        mergeFields: $props.tokens || [],
      })
    }
  }
  document.body.appendChild(script)
}

const addClickEvent = () => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (target.classList.contains('sa-accept-btn')) {
      modelVisible.value = false
    }
  })
}

const doAutoAnalyzerClick = () => {
  const analyzeBtn = document.getElementsByClassName('sa-analyze-btn')
  if (!analyzeBtn) return
  const btn = analyzeBtn[0] as HTMLButtonElement
  btn.click()
}

onMounted(() => {
  addClickEvent()
  mountAnalyzer()
  setTimeout(() => doAutoAnalyzerClick(), 500)
})
</script>

<style scoped lang="scss" />
