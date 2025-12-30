<template>
  <q-card class="q-pa-md uploader-card">
    <div class="row q-mb-lg UploaderComponent-title">
      {{ title ? title : 'Upload New Document' }}
    </div>
    <div v-if="description" class="row">
      <p class="UploaderComponent-description">{{ description }}</p>
    </div>
    <q-card-section class="uploader-container" @click="onFileClick">
      <div
        class="drop-area"
        @dragover.prevent="isDragging = true"
        @dragleave="isDragging = false"
        @drop.prevent="handleDrop"
        :class="{ 'drop-active': isDragging }"
      >
        <q-icon name="cloud_upload" size="48px" class="q-mb-md" style="color: var(--happypurim)" />
        <p v-if="files.length === 0">Drag and drop files here or Browse files</p>

        <q-file
          @rejected="rejected"
          :accept="accept"
          v-model="files"
          label="Select file(s)"
          filled
          :multiple="multiple"
          style="display: none"
          ref="fileInput"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>
    </q-card-section>
    <div class="UploaderComponent-files-section">
      <q-card-section v-if="files.length">
        <q-list>
          <q-item
            class="UploaderComponent-file-container"
            v-for="(file, index) in files"
            :key="index"
          >
            <q-item-section avatar>
              <q-icon name="check" color="green" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ cutName(file.name, 28) }}</q-item-label>
              <q-item-label caption>{{ formatSize(file.size) }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn icon="delete" color="red" flat @click="removeFile(index)" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import type { QRejectedEntry } from 'quasar'
import { QFile, useQuasar } from 'quasar'
import { cutName } from 'src/helpers/cutName'
import { ref, watch } from 'vue'

const fileInput = ref<QFile | undefined>(undefined)

const $q = useQuasar()

interface UploaderPropsInterface {
  fileModel: File[]
  icon?: string
  description?: string
  title?: string
  accept?: string
  multiple?: boolean
}

const $props = withDefaults(defineProps<UploaderPropsInterface>(), {
  fileModel: () => [],
  icon: () => 'cloud_upload',
})

// Define types
type FileItem = File

// Reactive references
const files = ref<FileItem[]>($props.fileModel)
const isDragging = ref<boolean>(false)
const $emit = defineEmits(['update:fileModel'])

// Handle file drop
const handleDrop = (event: DragEvent): void => {
  isDragging.value = false
  const droppedFiles: File[] = Array.from(event.dataTransfer?.files || [])
  files.value.push(...droppedFiles)
}

// Remove file from the list
const removeFile = (index: number): void => {
  files.value.splice(index, 1)
}

// Format file size to KB
const formatSize = (size: number): string => {
  return (size / 1024).toFixed(2) + ' KB'
}

const onFileClick = () => {
  if (fileInput.value) {
    fileInput.value.$el.click()
  }
}
watch(files, (value) => {
  if (Array.isArray(value)) $emit('update:fileModel', value)
  else files.value = [value]
})

const rejected = (rejectedEntries: QRejectedEntry[]) => {
  {
    $q.notify({
      type: 'negative',
      message: `${rejectedEntries.length} file(s) did not pass validation constraints ${$props.accept ? `, only these extensions are allowed ( ${$props.accept} )` : ''}`,
    })
  }
}
</script>

<style scoped lang="scss">
@import './UploaderComponent.scss';
</style>
