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

        // handler: uploadIt,
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
</template>

<script setup lang="ts">
import { QBtnDropdown, QEditor, QPopupProxy } from 'quasar'
import { computed, ref } from 'vue'

interface EditorCustomPropsInterface {
  modelValue: string
  height?: string
  tokens?: { name: string; label: string; icon?: string }[]
  attacher?: { name: string; label: string; icon?: string; value: string }[]
}

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

defineExpose({ add, addHTML })
</script>

<style scoped lang="scss">
@import './EditorCustom.scss';
</style>
