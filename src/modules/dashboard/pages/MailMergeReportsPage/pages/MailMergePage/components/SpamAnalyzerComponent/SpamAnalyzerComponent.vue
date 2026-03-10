<template>
  <q-dialog v-model="modelVisible">
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Spam Analyzer</p>
        </div>
      </div>

      <q-card-section class="q-pt-none" style="padding: 12px; max-height: 500px; overflow: auto">
        <textarea
          v-model="subjectModel"
          id="txtSubject"
          placeholder="Subject"
          style="display: none"
        />
        <div v-html="bodyModel" id="txtBody" style="display: none"></div>

        <div id="spam-analyzer-container"></div>
      </q-card-section>

      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn label="Close" color="negative" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useAuth } from 'src/modules/auth/composables/useAuth'
import { computed, onMounted } from 'vue'

const { authState } = useAuth()

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
  set: (val) =>
    $emit(
      'update:subject',
      val.replace(/(\[\*|\*\])/g, (match) => {
        if (match === '[*') return '{{'
        if (match === '*]') return '}}'
        return match
      }),
    ),
})
const bodyModel = computed({
  get: () => $props.body,
  set: (val) => $emit('update:body', val),
})

const updateIframeContent = () => {
  const iframe = document.getElementById('bodyIframe') as HTMLIFrameElement
  if (iframe && iframe.contentWindow) {
    const doc = iframe.contentWindow.document
    doc.open()
    // Inyectamos el bodyModel (HTML) dentro del iframe
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"></head>
        <body id="innerBody">${bodyModel.value}</body>
      </html>
    `)
    doc.close()
  }
}

const mountAnalyzer = () => {
  const script = document.createElement('script')
  script.src = 'https://spamanalyzer.hpsend.com/widget/spam-analyzer.js'
  script.onload = () => {
    if (window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).SpamAnalyzer.init({
        apiUrl: 'https://spamanalyzer.hpsend.com/api/analyze',
        apiKey: '6b76f93f-bf47-491e-8343-b29efd4ebef1',
        userId: authState.value.user?.email || '',
        subjectSelector: '#txtSubject',
        bodyEditorId: 'txtBody',
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

const mockAnalyzer = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any).UltimateEditors = {
    txtBody: {
      GetEditorHTML: () => {
        return $props.body || ''
      },
      SetEditorHTML: (html: string) => {
        $emit(
          'update:body',
          html.replace(/(\[\*|\*\])/g, (match) => {
            if (match === '[*') return '{{'
            if (match === '*]') return '}}'
            return match
          }),
        )
      },
    },
  }
}

onMounted(() => {
  updateIframeContent()
  addClickEvent()
  mockAnalyzer()
  mountAnalyzer()
  setTimeout(() => doAutoAnalyzerClick(), 500)
})
</script>

<style scoped lang="scss" />
