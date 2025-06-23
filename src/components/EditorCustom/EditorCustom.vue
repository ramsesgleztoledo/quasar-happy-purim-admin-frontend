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
      ['token', 'insert', 'hr', 'link', 'custom_btn', 'upload'],
      [
        {
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['h3', 'h4', 'h5', 'h6', 'p'],
        },
        {
          label: $q.lang.editor.fontSize,
          icon: $q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: 'no-icons',
          options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7'],
        },
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
        'removeFormat',
      ],
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
            @update:model-value="onColorPicked"
            no-header
            no-footer
            default-view="palette"
          />
        </q-popup-proxy>
      </q-btn>
    </template>
    <template v-slot:colorPickerBackground>
      <q-btn :class="colorBtnClasses" style="font-size: 10px"
        ><q-icon name="border_color" />
        <q-popup-proxy ref="popRefColorPickerBackground" cover>
          <q-color
            v-model="colorPickerBackground"
            @update:model-value="onColorPickedBackground"
            no-header
            no-footer
            default-view="palette"
          />
        </q-popup-proxy>
      </q-btn>
    </template>
  </q-editor>

  <!-- Insert Img -->
  <q-dialog v-model="uploadInsertFileFlag" persistent>
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Insert File</p>
        </div>
      </div>
      <q-card-section>
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
        <div class="row">
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
              <div class="EditorCustom-img-container" @click="() => onFileSelected(item)"></div>
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
          @click="insertFile"
          v-close-popup
          :disable="!selectedFile"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Upload Img -->
  <q-dialog v-model="uploadNewFileFlag" persistent>
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Upload Files</p>
        </div>
      </div>
      <q-card-section>
        <UploaderComponent title=" " v-model:file-model="newFiles" />
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
import { QBtnDropdown, QEditor, QPopupProxy } from 'quasar'
import { useBasicSettings } from 'src/modules/dashboard/composables/useBasicSettings'
import { computed, onMounted, ref } from 'vue'
import UploaderComponent from '../UploaderComponent/UploaderComponent.vue'
import { useUI } from 'src/modules/UI/composables'

const { isMobile } = useUI()

interface EditorCustomPropsInterface {
  modelValue: string
  height?: string
  tokens?: { name: string; label: string; icon?: string }[]
  attacher?: { name: string; label: string; icon?: string; value: string }[]
}

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
const attacherRef = ref<QBtnDropdown | undefined>(undefined)
const editorRef = ref<QEditor | undefined>(undefined)
// Emit the updated value when the internal state changes
const $emit = defineEmits(['update:modelValue'])

const add = (name: string) => {
  if (!editorRef.value) return
  const edit = editorRef.value
  tokenRef.value?.hide()
  edit.caret.restore()
  edit.runCmd(
    'insertHTML',
    `&nbsp;<div class="EditorCustom-token editor_token row inline items-center" contenteditable="false">&nbsp;<span>${name}</span>&nbsp;<i class="q-icon material-icons cursor-pointer" onclick="this.parentNode.parentNode.removeChild(this.parentNode)">close</i></div>&nbsp;`,
  )
  edit.focus()
}
const addHTML = (value: string) => {
  if (!editorRef.value) return
  const edit = editorRef.value
  attacherRef.value?.hide()
  edit.caret.restore()
  edit.runCmd('insertHTML', value)
  edit.focus()
}

const onColorPicked = () => {
  if (popRefColorPicked.value) popRefColorPicked.value.hide()
  if (!editorRef.value) return
  const edit = editorRef.value
  edit.caret.restore()
  edit.runCmd('foreColor', colorPicked.value)
  edit.focus()
}
const onColorPickedBackground = () => {
  if (popRefColorPickerBackground.value) popRefColorPickerBackground.value.hide()
  if (!editorRef.value) return
  const edit = editorRef.value
  edit.caret.restore()
  edit.runCmd('backColor', colorPickerBackground.value)
  edit.focus()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const selectedFile = ref<any>('')

const onFileSelected = (item: unknown) => {
  selectedFile.value = item
}

const insertFile = () => {
  if (!editorRef.value) return
  const edit = editorRef.value
  tokenRef.value?.hide()
  edit.caret.restore()
  edit.runCmd(
    'insertHTML',
    `&nbsp;
    <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSEDXTwqQdVDG_Olz2iNmsW2IQ-vmMTrHIREyAYPJCANU-ZYo1-419gGAJjKB1X4IWf5QzjPbvlhRDnBsrskqbp-B8JgWfXi8fZQuZW4pE" height="100%" style="height:100%; width: 100%">&nbsp;`,
  )
  edit.focus()
}

defineExpose({ add, addHTML })

const files = ref<string[]>([])
const newFiles = ref<File[]>([])

const { getFiles, uploadFiles, deleteFile } = useBasicSettings()

onMounted(() => {
  getFiles().then((res) => {
    files.value = res
  })
})

const onUploadMoreFiles = () => {
  uploadFiles(newFiles.value).then((resp) => {
    files.value = [...files.value, ...resp]
  })
}

const onDeleteFile = async (item: string) => {
  await deleteFile(item)
}
</script>

<style scoped lang="scss">
@import './EditorCustom.scss';
</style>
