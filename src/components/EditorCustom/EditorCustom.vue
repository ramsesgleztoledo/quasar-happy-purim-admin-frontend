<template>
  <q-editor
    ref="editorRef"
    :content-style="{
      backgroundColor: '#f1f1f1',
      height: fullscreenClass ? '100%' : height ? height : '190px',
      
    }"
    v-model="text"
    :class="{ fullscreen: fullscreenClass }"
    :definitions="{
      upload: {
        tip: 'Attach Img',
        icon: 'attach_file',
        handler: () => (uploadInsertFileFlag = true),
      },
      fullscreenClass: {
        tip: 'Toggle Fullscreen',
        icon: 'fullscreen',
        handler: () => {
          fullscreenClass = !fullscreenClass
        },
      },
      clear_all: {
        tip: 'Clear All',
        icon: 'close',
        label: 'Clear',
        handler: () => {
          $emit('update:modelValue', '')
        },
      },
    }"
    toolbar-bg="primary"
    toolbar-text-color="white"
    toolbar-toggle-color="black"
    :toolbar="[
      ['left', 'center', 'right', 'justify'],
      [
        'bold',
        'italic',
        'underline',
        'strike',
        'colorPicker',
        'colorPickerBackground',
        'removeFormat',
      ],
      ['undo', 'redo'],
      ['quote', 'unordered', 'ordered', 'outdent', 'indent', 'line-height'],
      ['token', 'insert', 'stringTokens', 'hr', 'link', 'custom_btn', showUploader ? 'upload' : ''],
      [
        {
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['h3', 'h4', 'h5', 'h6', 'p'],
        },
        // {
        //   label: $q.lang.editor.fontSize,
        //   icon: $q.iconSet.editor.fontSize,
        //   fixedLabel: true,
        //   fixedIcon: true,
        //   list: 'no-icons',
        //   options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7'],
        // },
        'Font-Size',
        {
          label: $q.lang.editor.defaultFont,
          icon: $q.iconSet.editor.font,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'default_font',
            'arial',
            'arial_black',
            'comic_sans',
            'courier_new',
            'impact',
            'lucida_grande',
            'times_new_roman',
            'verdana',
          ],
        },
      ],
      ['clear_all'],
      ['fullscreenClass'],
    ]"
    :fonts="{
      arial: 'Arial',
      arial_black: 'Arial Black',
      comic_sans: 'Comic Sans MS',
      courier_new: 'Courier New',
      impact: 'Impact',
      lucida_grande: 'Lucida Grande',
      times_new_roman: 'Times New Roman',
      verdana: 'Verdana',
    }"
  >
    <template v-slot:Font-Size>
      <q-btn-dropdown
        ref="fontSizeRef"
        dense
        no-caps
        no-wrap
        unelevated
        text-color="white"
        label="Font-Size"
        size="sm"
        icon="format_size"
      >
        <q-list dense style="background-color: var(--happypurim); color: white">
          <q-item
            v-for="item in fontSize"
            :key="item.size"
            tag="label"
            clickable
            @click="changeFontSize(item.size)"
          >
            <q-item-section side> </q-item-section>
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </template>

    <template v-if="!!tokens" v-slot:token>
      <q-btn-dropdown
        dense
        no-caps
        ref="tokenRef"
        no-wrap
        unelevated
        color="white"
        text-color="primary"
        label="Token"
        size="sm"
      >
        <q-list dense>
          <q-item
            v-for="(token, i) in tokens"
            :key="i"
            tag="label"
            clickable
            @click="add(token.name)"
          >
            <q-item-section side>
              <q-icon v-if="token.icon" :name="token.icon" />
            </q-item-section>
            <q-item-section>{{ token.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </template>
    <template v-if="!!stringTokens" v-slot:stringTokens>
      <q-btn-dropdown
        dense
        no-caps
        ref="stringTokenRef"
        no-wrap
        unelevated
        color="white"
        text-color="primary"
        label="Insert Merge Fields"
        size="sm"
      >
        <q-list dense>
          <q-item
            v-for="(token, i) in stringTokens"
            :key="i"
            tag="label"
            clickable
            @click="addTokenText(token)"
          >
            <q-item-section>{{ token }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </template>
    <template v-if="!!attacher" v-slot:insert>
      <q-btn-dropdown
        dense
        no-caps
        ref="attacherRef"
        no-wrap
        unelevated
        color="white"
        text-color="primary"
        label="Insert"
        size="sm"
      >
        <q-list dense>
          <q-item
            v-for="(att, i) in attacher"
            :key="i"
            tag="label"
            clickable
            @click="addHTML(att.value)"
          >
            <q-item-section side>
              <q-icon v-if="att.icon" :name="att.icon" />
            </q-item-section>
            <q-item-section>{{ att.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </template>

    <template v-slot:colorPicker>
      <q-btn :class="colorBtnClasses" style="font-size: 10px"
        ><q-icon name="format_color_text" />
        <q-popup-proxy ref="popRefColorPicked" cover>
          <q-color
            v-model="colorPicked"
            @update:model-value="onColorPicked()"
            no-header
            no-footer
            default-view="palette"
          />
          <div class="row justify-content-end">
            <q-btn
              class="clear-btn"
              icon="close"
              label="Clear"
              outline
              @click="
                () => {
                  onColorPicked(true)
                }
              "
            />
          </div>
        </q-popup-proxy>
      </q-btn>
    </template>
    <template v-slot:colorPickerBackground>
      <q-btn :class="colorBtnClasses" style="font-size: 10px"
        ><q-icon name="border_color" />
        <q-popup-proxy ref="popRefColorPickerBackground" cover>
          <q-color
            v-model="colorPickerBackground"
            @update:model-value="onColorPickedBackground()"
            no-header
            no-footer
            default-view="palette"
          />
          <div class="row justify-content-end">
            <q-btn
              class="clear-btn"
              icon="close"
              label="Clear"
              outline
              @click="
                () => {
                  onColorPickedBackground(true)
                }
              "
            />
          </div>
        </q-popup-proxy>
      </q-btn>
    </template>
  </q-editor>

  <!-- Insert Img -->
  <q-dialog v-model="uploadInsertFileFlag" persistent>
    <q-card :style="{ width: isMobile ? '100vw' : '600px' }">
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Insert File</p>
        </div>
      </div>
      <q-card-section style="width: 100%">
        <div class="row q-mb-md">
          <div class="col-12 justify-content-end">
            <q-btn
              @click="uploadNewFileFlag = true"
              color="primary"
              icon="upload"
              label="Upload File"
            />
          </div>
        </div>
        <div class="row" style="max-height: 500px; overflow-y: auto">
          <div
            v-for="item in files"
            :key="item"
            class="col-4 q-pa-md"
            :class="{
              'col-4': !isMobile,
              'col-12': isMobile,
            }"
          >
            <div
              class="EditorCustom-file-container"
              :class="{
                'EditorCustom-file-selected': item === selectedFile,
              }"
            >
              <div
                class="EditorCustom-img-container"
                @click="() => onFileSelected(item)"
                :style="{ backgroundImage: ` url(${EDITOR_START_IMG_URL}${item})` }"
              >
                <!-- <img :src="`${EDITOR_START_IMG_URL}${item}`" alt="No img" /> -->
              </div>
              <div class="row">
                <div class="col-12">
                  <q-btn
                    @click="() => onDeleteFile(item)"
                    color="primary"
                    icon="delete"
                    label="delete"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn
          outline
          label="cancel"
          class="q-mr-sm q-mt-sm"
          style="color: #990000; border-color: #990000"
          v-close-popup
        />
        <q-btn
          class="q-mr-sm q-mt-sm"
          style="background: var(--happypurim); color: white"
          label="Insert"
          @click="insertInternalFile()"
          v-close-popup
          :disable="!selectedFile"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Upload Img -->
  <q-dialog v-model="uploadNewFileFlag" persistent>
    <q-card :style="{ width: isMobile ? '100vw' : '500px' }">
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Upload Files</p>
        </div>
      </div>
      <q-card-section>
        <UploaderComponent
          accept=".jpg, .png, image/*"
          title="Images only"
          multiple
          v-model:file-model="newFiles"
        />
      </q-card-section>

      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn
          outline
          label="cancel"
          class="q-mr-sm q-mt-sm"
          style="color: #990000; border-color: #990000"
          v-close-popup
          @click="newFiles = []"
        />
        <q-btn
          class="q-mr-sm q-mt-sm"
          style="background: var(--happypurim); color: white"
          label="Upload"
          @click="onUploadMoreFiles"
          :disable="!newFiles.length"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
// @ts-expect-error no for ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import VueResizable from 'vue-resizable'
import { QBtnDropdown, QEditor, QPopupProxy } from 'quasar'
import { useBasicSettings } from 'src/modules/dashboard/composables/useBasicSettings'
import { computed, onMounted, ref } from 'vue'
import UploaderComponent from '../UploaderComponent/UploaderComponent.vue'
import { useUI } from 'src/modules/UI/composables'

const { isMobile, EDITOR_START_IMG_URL } = useUI()

interface EditorCustomPropsInterface {
  modelValue: string
  height?: string
  tokens?: { name: string; label: string; icon?: string }[]
  stringTokens?: string[] | undefined
  attacher?: { name: string; label: string; icon?: string; value: string }[]
  showUploader?: boolean
  className?: string
}

const fontSize = ref([
  { label: '10px', size: 1 },
  { label: '12px', size: 2 },
  { label: '14px', size: 3 },
  { label: '18px', size: 4 },
  { label: '26px', size: 5 },
  { label: '50px', size: 6 },
  { label: '80px', size: 7 },
])

const uploadInsertFileFlag = ref<boolean>(false)
const uploadNewFileFlag = ref<boolean>(false)
const fullscreenClass = ref<boolean>(false)
const popRefColorPicked = ref<QPopupProxy | undefined>(undefined)
const popRefColorPickerBackground = ref<QPopupProxy | undefined>(undefined)
const colorPicked = ref<string>('#000000')
const colorPickerBackground = ref<string>('#000000')
const colorBtnClasses = ref<string>(
  'q-btn q-btn-item non-selectable no-outline q-btn--flat q-btn--rectangle text-white q-btn--actionable q-focusable q-hoverable q-btn--dense',
)
// Define props
const $props = defineProps<EditorCustomPropsInterface>()

const text = computed({
  get: () => $props.modelValue,
  set: (val) => $emit('update:modelValue', val),
})
const tokenRef = ref<QBtnDropdown | undefined>(undefined)
const stringTokenRef = ref<QBtnDropdown | undefined>(undefined)
const attacherRef = ref<QBtnDropdown | undefined>(undefined)
const editorRef = ref<QEditor | undefined>(undefined)
// Emit the updated value when the internal state changes
const $emit = defineEmits(['update:modelValue'])

const fontSizeRef = ref<QBtnDropdown | undefined>(undefined)

const changeFontSize = (size: number) => {
  if (!editorRef.value) return
  const edit = editorRef.value
  fontSizeRef.value?.hide()
  edit.caret.restore()
  edit.runCmd('fontSize', `${size}`)
  setTimeout(() => {
    edit.focus()
  }, 300)
}
const add = (name: string) => {
  if (!editorRef.value) return
  const edit = editorRef.value
  tokenRef.value?.hide()
  edit.caret.restore()
  edit.runCmd(
    'insertHTML',
    `&nbsp;<div class="EditorCustom-token editor_token row inline items-center" contenteditable="false">&nbsp;<span>${name}</span>&nbsp;<i class="q-icon material-icons cursor-pointer" onclick="this.parentNode.parentNode.removeChild(this.parentNode)">close</i></div>&nbsp;`,
  )
  setTimeout(() => {
    edit.focus()
  }, 300)
}
const addTokenText = (name: string) => {
  if (!editorRef.value) return
  const edit = editorRef.value
  stringTokenRef.value?.hide()
  edit.caret.restore()
  edit.runCmd('insertHTML', `{{${name}}}&nbsp;`)
  setTimeout(() => {
    edit.focus()
  }, 300)
}
const addHTML = (value: string) => {
  if (!editorRef.value) return
  const edit = editorRef.value
  attacherRef.value?.hide()
  edit.caret.restore()
  edit.runCmd('insertHTML', value)
  setTimeout(() => {
    edit.focus()
  }, 300)
}

const onColorPicked = (clear?: boolean) => {
  if (popRefColorPicked.value) popRefColorPicked.value.hide()
  if (!editorRef.value) return
  const edit = editorRef.value
  edit.caret.restore()
  edit.runCmd('foreColor', clear ? 'black' : colorPicked.value)
  setTimeout(() => {
    edit.focus()
  }, 300)
}
const onColorPickedBackground = (clear?: boolean) => {
  if (popRefColorPickerBackground.value) popRefColorPickerBackground.value.hide()
  if (!editorRef.value) return
  const edit = editorRef.value
  edit.caret.restore()
  edit.runCmd('backColor', clear ? 'transparent' : colorPickerBackground.value)
  setTimeout(() => {
    edit.focus()
  }, 300)
}

const selectedFile = ref<string>('')

const onFileSelected = (item: string) => {
  selectedFile.value = item
}

const insertInternalFile = () => {
  if (!selectedFile.value) return
  const src = `${EDITOR_START_IMG_URL.value}${selectedFile.value}`
  insertFile(src)
}

const insertFile = (file: string, prop?: { width: string; height: string }) => {
  if (!file || !editorRef.value) return
  const edit = editorRef.value
  edit.caret.restore()

  const html = `&nbsp;<div class="editable-div"
      style="display:inline-block; width:${prop?.width || '200px'}; height:${prop?.height || '200px'}">
      <img src="${file}" style="width:100%; height:100%; pointer-events:none;"/></div>&nbsp;`

  edit.runCmd('insertHTML', html)

  setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rootEl = (edit as any).$el || (edit as any)
    const contentEl: HTMLElement | null =
      rootEl?.querySelector?.('.q-editor__content') ||
      rootEl?.querySelector?.('[contenteditable="true"]') ||
      (rootEl?.shadowRoot && rootEl.shadowRoot.querySelector('.q-editor__content')) ||
      null
    if (!contentEl) {
      try {
        edit.focus?.()
      } catch {
        console.error()
      }
      return
    }
    contentEl.focus()

    requestAnimationFrame(() => {
      const sel = window.getSelection()
      if (!sel) {
        edit.focus?.()
        return
      }
      const range = document.createRange()
      try {
        range.selectNodeContents(contentEl)
        range.collapse(false)
        sel.removeAllRanges()
        sel.addRange(range)
      } catch (e: unknown) {
        console.error(e)
        const last = contentEl.childNodes[contentEl.childNodes.length - 1]
        if (last) {
          sel.removeAllRanges()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          sel.collapse(last, (last.nodeValue || '').length || (last as any).childNodes?.length || 1)
        }
      }
      try {
        edit.focus?.()
      } catch {
        console.error('error')
      }
    })
  }, 100)
}

// const insertFile = (file: string, prop?: { width: string; height: string }) => {
//   if (!file) return
//   if (!editorRef.value) return
//   const edit = editorRef.value
//   edit.caret.restore()
//   edit.runCmd(
//     'insertHTML',
//     `&nbsp;<div
//   class="editable-div" style="display: inline-block; width: ${prop?.width ? prop.width : '200px'}; height: ${prop?.height ? prop.height : '200px'}">
//   <img
//     src="${file}"
//     style="width: 100%; height: 100%; pointer-events: none;"
//   />
//   </div>&nbsp;`,
//   )
//   setTimeout(() => {
//     edit.focus()
//   }, 300)
// }

const getEditorValue = () => {
  const contentEl = editorRef.value?.$el.querySelector('.q-editor__content') as HTMLElement
  return contentEl?.innerHTML || ''
}

defineExpose({ add, addHTML, addTokenText, insertFile, getEditorValue })

const files = ref<string[]>([])
const newFiles = ref<File[]>([])

const { getFiles, uploadFiles, deleteFile } = useBasicSettings()

onMounted(() => {
  if ($props.showUploader)
    getFiles().then((res) => {
      files.value = res
    })
})

const onUploadMoreFiles = async () => {
  const resp = await uploadFiles(newFiles.value)
  files.value = [...files.value, ...resp]
  newFiles.value = []
}

const onDeleteFile = async (item: string) => {
  const resp = await deleteFile(item)
  if (resp) {
    if (item === selectedFile.value) selectedFile.value = ''
    files.value = files.value.filter((file) => file !== item)
  }
}
</script>

<style scoped lang="scss">
@import './EditorCustom.scss';
</style>
