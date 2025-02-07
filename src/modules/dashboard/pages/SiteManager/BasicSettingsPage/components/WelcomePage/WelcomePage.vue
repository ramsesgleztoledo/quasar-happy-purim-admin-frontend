<template>
  <div class="row">
    <div class="col-12">
      <b>Welcome page</b>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <p style="color: #595959">
        We highly recommend using the editor below to create your Welcome Page. If you choose to
        paste from Microsoft Word or any other word processing software, please be sure to click the
        Clean Word Format button on the toolbar below.
      </p>
    </div>
  </div>

  <div class="row WelcomePage-editor-container" :class="{ fullscreen: isFullScreen }">
    <div
      class="col-12 q-mb-md"
      :style="{
        height: isFullScreen ? '100%' : '',
      }"
    >
      <div class="row q-mb-sm q-mt-sm">
        <div class="col-4">
          <q-btn-toggle v-model="listView" spread no-caps :options="listViewOptions" />
        </div>
        <div class="col-8 justify-content-end">
          <q-btn
            flat
            round
            color="primary"
            :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="isFullScreen = !isFullScreen"
          />
        </div>
      </div>

      <EditorCustom
        v-if="listView === 1"
        :style="{
          height: isFullScreen ? '100%' : '',
        }"
        :height="isFullScreen ? '90%' : '190px'"
        v-model="editor"
        :tokens="tokensForEdit"
      />
      <CodeEditor
        v-else
        v-model="editor"
        :lang="html"
        :style="{
          height: isFullScreen ? '90%' : '255px',
          width: '100%',
        }"
      />
    </div>
  </div>

  <div class="row">
    <div class="col-12 justify-content-end">
      <q-btn
        style="background: white; color: var(--happypurim)"
        icon="save"
        label="save"
        @click="
          () => {
            console.log('editor value', { editor })
          }
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeEditor from 'src/components/CodeEditor/CodeEditor.vue'
import EditorCustom from 'src/components/EditorCustom/EditorCustom.vue'
import { ref } from 'vue'
import { html } from '@codemirror/lang-html'

const isFullScreen = ref(false)
const editor = ref('')

const tokensForEdit = ref([
  { name: 'email', label: 'email', icon: 'email' },
  { name: 'code', label: 'code', icon: 'code' },
  { name: 'token-link', label: 'token-link', icon: 'link' },
])

const listView = ref(1)
const listViewOptions = ref([
  { label: 'Editor', value: 1 },
  { label: 'HTML', value: 2 },
])
</script>

<style scoped lang="scss">
@import './WelcomePage';
</style>
