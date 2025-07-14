<template>
  <div class="row q-mb-sm">
    <div
      class="top-title-col"
      :class="{
        'col-4': !isMobile,
        'col-12': isMobile,
      }"
    >
      <p class="page-main-title">Mail Merge & Reports</p>
      <div class="separator-right q-mr-sm q-ml-sm"></div>
    </div>
    <div
      class="top-title-col"
      :class="{
        'col-8': !isMobile,
        'col-12': isMobile,
      }"
    ></div>
  </div>
  <div class="row">
    <div class="col-12">
      <div style="display: flex; flex-direction: column; height: 80vh">
        <div class="row" style="flex: 1">
          <div class="col-12">
            <template v-if="!preview">
              <div class="row q-mb-md">
                <div class="col-12">
                  <q-btn-toggle v-model="pageView" spread no-caps :options="pageOption" />
                </div>
              </div>
              <div v-if="pageView == '1'">
                <div class="row q-gutter-sm">
                  <q-select
                    style="min-width: 200px"
                    v-model="realForm.sendTo.value"
                    outlined
                    :options="['Primary', 'Primary & Alternate options']"
                    label="Send To *"
                    lazy-rules
                    :rules="[lazyRules.required()]"
                  />
                  <q-input
                    style="min-width: 200px"
                    v-model="realForm.fullName.value"
                    outlined
                    label="Sending From Name *"
                    lazy-rules
                    :rules="[lazyRules.required()]"
                  />
                  <q-input
                    style="min-width: 200px"
                    v-model="realForm.email.value"
                    outlined
                    label="Sending From Email *"
                    lazy-rules
                    :rules="[lazyRules.required(), lazyRules.isEmail()]"
                  />
                </div>
                <div class="row">
                  <div
                    class="q-mb-sm"
                    :class="{
                      'col-6': !isMobile,
                      'col-12': isMobile,
                    }"
                  >
                    <q-input
                      style="min-width: 200px"
                      v-model="realForm.emailSubject.value"
                      outlined
                      label="Email Subject *"
                      lazy-rules
                      :rules="[lazyRules.required()]"
                    />
                  </div>
                  <div
                    class="q-mb-sm"
                    :class="{
                      'col-6': !isMobile,
                      'col-12': isMobile,
                    }"
                  >
                    <div class="row">
                      <div class="col-12 q-gutter-sm justify-content-end">
                        <q-btn-dropdown label="Documents">
                          <q-list>
                            <q-item
                              clickable
                              v-close-popup
                              @click="selectTemplateDialogFlag = true"
                            >
                              <q-item-section>
                                <q-item-label>Happy Purim Templates</q-item-label>
                              </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="selectDraftDialogFlag = true">
                              <q-item-section>
                                <q-item-label>My Saved Documents</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-btn-dropdown>

                        <q-btn
                          icon="image"
                          label="Insert images"
                          @click="selectImagesDialogFlag = true"
                        />
                        <div v-if="!isMobile" class="separator-right"></div>
                        <q-btn
                          color="primary"
                          icon="save"
                          label="save template"
                          @click="saveDialogFlag = true"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div >
                  <div class="row">
                    <div class="col-10 q-pa-sm" :class="{
                      'col-10' : !isMobile,
                      'col-12' : isMobile,
                    }">
                      <EditorCustom v-model="email" height="750px" ref="editorRef" :stringTokens=" isMobile ? tokens : undefined"/>
                    </div>
                    <div v-if="!isMobile" class="col-2 q-pa-sm ComposeEmail-tokens-container">
                      <div class="row q-mb-sm">
                        <div class="col-12 separator-bottom">
                          <p style="margin: 5px">Select Mail Merge Fields</p>
                        </div>
                      </div>
                      <div class="token-items-container">
                        <q-item
                          class="ComposeEmail-token-item q-mb-sm"
                          v-for="(token, i) in tokens"
                          :key="i"
                          clickable
                          @click="insertToken(token)"
                        >
                          <q-item-section>
                            <q-icon name="arrow_back_ios" />
                          </q-item-section>

                          <q-item-section>
                            {{ token }}
                          </q-item-section>
                        </q-item>
                      </div>
                    </div>
                  </div>
                </div>


                <!--=============================== Dialogs =============================-->

                <SelectTemplate
                  @onSelectTemplate="onSelectTemplate"
                  v-model="selectTemplateDialogFlag"
                  :templates="templates"
                />
                <SelectDraft @onSelectDraft="onSelectDraft" v-model="selectDraftDialogFlag" />

                <SelectImages v-model="selectImagesDialogFlag" @onSelectImg="onSelectImg"/>

                <SaveDraft v-model="saveDialogFlag" @onSaveDraft="onSaveDraft" />

                <!--=========================== END OF SECTION ===========================-->
              </div>
              <div v-else>

                <div class="q-pa-md">
      <div class="row white-container" :class="{ fullscreen: isFullScreen }">
        <div class="col-12">
          <div class="row">
            <div class="col-12 justify-content-end">
              <q-btn
                flat
                round
                color="primary"
                :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="isFullScreen = !isFullScreen"
              />
            </div>
          </div>
          <q-table
            :style="{ height: isFullScreen ? '800px' : '628px' }"
            class="table-sticky-header-column-table"
            flat:
            bordered
            :title="`Sending To (${$rStore.$state.selectedRecipients.length})`"
            :rows="$rStore.$state.report?.members || []"
            :columns="columns"
            row-key="ID"
            selection="multiple"
            v-model:selected="$rStore.$state.selectedRecipients"
            :pagination="{
              rowsPerPage: 0,
            }"

          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th auto-width />
                <q-th auto-width>
                  <q-checkbox v-model="props.selected" />
                </q-th>
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td auto-width>
                  <q-btn
                    size="sm"
                    round
                    dense
                    @click="props.expand = !props.expand"
                    :icon="props.expand ? 'remove' : 'add'"
                  />
                </q-td>
                <q-td auto-width>
                  <q-checkbox
                    :model-value="props.selected"
                    @update:model-value="(val) => (props.selected = val)"
                    @click.stop
                  />
                </q-td>

                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
              <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                  <div class="text-left">
                    <InnerViewRow :recipient="props.row" />
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
              </div>
            </template>

            <template v-else>
              <PreviewEmail :content="email" />
            </template>
          </div>
        </div>

        <div class="row q-mt-lg cancel-save-btn-container">
          <div class="col-12 q-pa-sm">
            <q-btn
              outline
              label="CANCEL"
              class="q-mr-sm"
              style="color: #990000; border-color: #990000"
              :to="{
                name: 'dashboard-MailMergeReportsPage',
              }"
            />

            <q-btn
              :disable="!$rStore.$state.selectedRecipients.length"
              class="q-mr-sm"
              :label="`${preview ? 'Continue' : 'Preview'}`"
              @click="preview = !preview"
            />

            <q-btn
              v-if="!preview"
              class="q-mr-sm"
              style="background: var(--happypurim); color: white"
              label="Generate PDF"
              @click="pdfTitleFlag = true"
            />

       <q-btn-dropdown :disable="!isValidForm()" label="Send Email"
       style="background: var(--happypurim); color: white"
       >
        <q-list>
          <q-item
            clickable
            v-close-popup
            @click="sendLaterFlag = true"
          >
            <q-item-section>
              <q-item-label>Send Later</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="onSendNowEmail">
            <q-item-section>
              <q-item-label >Send Now</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--=============================== dialogs =============================-->

  <!-- generate pdf -->
  <q-dialog v-model="pdfTitleFlag" persistent>
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Generate PDF</p>
        </div>
      </div>

      <div class="custom-dialog-body-container q-pa-lg" style="min-width: 50vw">
        <div class="row q-mb-sm">
          <div class="col-12">
            <q-input
              v-model="pdfTitle"
              outlined
              label="Title *"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>

      </div>

      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn
          outline
          label="Close"
          class="q-mr-sm q-mt-sm"
          style="color: #990000; border-color: #990000"
          v-close-popup
        />
        <q-btn
           :disable="!pdfTitle"
          style="background: var(--happypurim); color: white"
          label="Generate"
          class="q-mr-sm q-mt-sm"
          @click="onGeneratePDF"
          v-close-popup

        />
      </q-card-actions> </q-card
  ></q-dialog>

  <!-- send later email -->
  <q-dialog v-model="sendLaterFlag" persistent>
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Schedule Email</p>
        </div>
      </div>

      <div class="custom-dialog-body-container q-pa-lg" style="min-width: 50vw">
       <div class="row -q-mb-sm">
    <div
      class="q-pa-sm"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-input
      readonly
        v-model="dateValue"
        outlined
        mask="date"
        lazy-rules
        :rules="[...dateRules]"
        label="Date"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="dateValue">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div
      class="q-pa-sm"
      :class="{
        'col-6': !isMobile,
        'col-12': isMobile,
      }"
    >
      <q-input
      readonly
        outlined
        v-model="timeValue"
        label="Time"
        mask="##:## a.a"
        lazy-rules
        :rules="[...timeRules]"
      >
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="timeValue" mask="hh:mm aa">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>

  <div class="row q-mb-sm q-pa-sm" style="align-items: center;">
    <div>
      Regenerate before sending:
    </div>
    <q-radio v-model="regenerateBefore" :val="true" label="Yes" />
    <q-radio v-model="regenerateBefore" :val="false" label="No" />
  </div>
  <div v-if="regenerateBefore" class="row" style="color: red; font-weight: 600;">
Please note: Since the report will be regenerated before sending, any recipients that were deselected will still be included in the email
  </div>

      </div>

      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn
          outline
          label="Close"
          class="q-mr-sm q-mt-sm"
          style="color: #990000; border-color: #990000"
          v-close-popup
        />
        <q-btn
           :disable="!dateValue || !timeValue"
          style="background: var(--happypurim); color: white"
          label="Schedule"
          class="q-mr-sm q-mt-sm"
          @click="onSendLaterEmail"
          v-close-popup

        />
      </q-card-actions> </q-card
  ></q-dialog>

<!--=========================== END OF SECTION ===========================-->


</template>

<script setup lang="ts">
import { useUI } from 'src/modules/UI/composables'
import { computed, onMounted, ref, watch } from 'vue'
import PreviewEmail from './components/PreviewEmail/PreviewEmail.vue'
import EditorCustom from 'src/components/EditorCustom/EditorCustom.vue'
import { lazyRules, useForm, validations } from 'src/composables'
import SelectTemplate from './Dialogs/SelectTemplate/SelectTemplate.vue'
import SelectImages from './Dialogs/SelectImages/SelectImages.vue'
import { useMailMerge } from 'src/modules/dashboard/composables/useMailMerge'
import type { MailMergeTemplateInterface } from 'src/modules/dashboard/interfaces/mail-merge.interface'
import { useReportStore } from 'src/modules/dashboard/store/ReportStore/reportStore'
import SelectDraft from './Dialogs/SelectDraft/SelectDraft.vue'
import type { DraftInterface } from 'src/modules/dashboard/interfaces/draft.interfaces'
import SaveDraft from './Dialogs/SaveDraft/SaveDraft.vue'
import { useDraft } from 'src/modules/dashboard/composables/useDraft'
import { columns } from './data/columns'
import InnerViewRow from '../ViewReport/InnerViewRow.vue'
import { useRouter } from 'vue-router'
import { isValidDate, isValidTime } from 'src/helpers'
import { turnTimeAndDate } from 'src/helpers/turnTimeAndDate'

const $router = useRouter()
const $rStore = useReportStore()
const { isMobile } = useUI()
const { getData, generatePDF,sendNowEmail,addUnmergedEmailJobToTable } = useMailMerge()
const { addDrafts } = useDraft()

const preview = ref(false)
const isFullScreen = ref(false)

const pageView = ref('1')
const pageOption = computed(() => [
  { label: 'Compose Email', value: '1' },
  {
    label: `Recipients (${$rStore.$state.selectedRecipients.length}/${$rStore.$state.report?.members.length || 0})`,
    value: '2',
  },
])

const selectTemplateDialogFlag = ref<boolean>(false)
const selectDraftDialogFlag = ref<boolean>(false)
const selectImagesDialogFlag = ref<boolean>(false)
const saveDialogFlag = ref<boolean>(false)

const editorRef = ref<InstanceType<typeof EditorCustom> | null>(null)

const insertToken = (tokenName: string) => {
  if (editorRef.value) {
    editorRef.value.addTokenText(tokenName)
  }
}

const email = ref('')

const tokens = ref<string[]>([])
const templates = ref<MailMergeTemplateInterface[]>([])



const { realForm, resetForm, isValidForm, getFormValue } = useForm({
  sendTo: { value: 'Primary', validations: [validations.required] },
  fullName: { value: '', validations: [validations.required] },
  email: { value: '', validations: [validations.required, validations.isEmail] },
  emailSubject: { value: '', validations: [validations.required] },
})

const onSelectTemplate = (content: string) => {
  email.value = ` ${content}`
}
const onSelectDraft = (draft: DraftInterface) => {
  email.value = ` ${draft.documentContent}`
}

const onSaveDraft = async (form: { name: string; description: string }) => {
  const draft = {
    body: email.value,
    name: form.name,
    description: form.description,
    documentType: 'html',
  }

  await addDrafts(draft)
}


const pdfTitle = ref('')
const pdfTitleFlag = ref(false)

const onGeneratePDF = async () => {
  await generatePDF({
    title: pdfTitle.value,
    content: email.value,
    memberIds: $rStore.$state.selectedRecipients.map((re) => re.ID),
  })
};


watch(pdfTitleFlag, () => pdfTitle.value = '')


const onSendNowEmail = async () => {
await onSendEmail(new Date())
}


const onSendLaterEmail = async () => {
    const dateString = turnTimeAndDate({
    dateValue: dateValue.value,
    timeValue: timeValue.value,
  })

  const date = new Date(dateString!)

  if(!regenerateBefore.value)
await onSendEmail(date)

else{
    const formData = getFormValue()
const resp = await addUnmergedEmailJobToTable({
  content: email.value,
  date,
 form: {
        sendTo: formData.sendTo || "",
    fullName: formData.fullName || "",
    email: formData.email || "",
    emailSubject: formData.emailSubject || "",
    },
})
if(resp)
$router.push({
  name: 'dashboard-MailMergeReportsPage'
})
}
};


const onSendEmail = async (date: Date) => {
  const formData = getFormValue()

const data ={
    form: {
        sendTo: formData.sendTo || "",
    fullName: formData.fullName || "",
    email: formData.email || "",
    emailSubject: formData.emailSubject || "",
    },
    content: email.value,
    memberIds: $rStore.$state.selectedRecipients.map((re) => re.ID),
    date
}
const resp = await sendNowEmail(data)

if(resp)
$router.push({
  name: 'dashboard-MailMergeReportsPage'
})
};


const onSelectImg = (img: string) => {

  if (editorRef.value) {
    editorRef.value.insertFile(img)
  }

};


/**========================================================================
 *                           send later data
 *========================================================================**/
const dateValue = ref('')
const timeValue = ref('')
const regenerateBefore = ref(false)
const sendLaterFlag = ref(false)

const dateRules = [(value: string) => isValidDate(value) || 'Invalid date']
const timeRules = [
  (value: string) => {
    return isValidTime(value) || 'Invalid time'
  },
]



/**========================================================================
 *                           get initial data
 *========================================================================**/

onMounted(() => {
  getData().then((resp) => {
    // tokens
    tokens.value = resp.tokens

    // templates
    templates.value = resp.templates

    // setting form
    resetForm({
      sendTo: 'Primary',
      fullName: resp.form.fullName,
      email: resp.form.email,
    })
  })
})
</script>

<style scoped lang="scss">
@import './MailMergePage';
</style>
