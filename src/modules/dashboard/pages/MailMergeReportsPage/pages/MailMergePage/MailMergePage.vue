<template>
  <div class="row q-mb-sm">
    <div
      class="top-title-col"
      :class="{
        'col-4': !isMobile,
        'col-12': isMobile,
      }"
    >
      <p class="page-main-title">
        {{ cutName($rStore.getReportSelectedReportData?.name || 'Report', 33) }}
      </p>
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
  <!-- v-if="$rStore.$state.report?.members?.length" -->
  <div class="row">
    <div class="col-12">
      <div style="display: flex; flex-direction: column">
        <div class="row" style="flex: 1">
          <div class="col-12">
            <template v-if="!preview">
              <div class="row q-mb-md">
                <div class="col-12">
                  <q-btn-toggle v-model="pageView" spread no-caps :options="pageOption" />
                </div>
              </div>
              <div v-show="pageView == '1'">
                <!-- <div class="row q-gutter-sm">
                  <q-select popup-content-class="q-menu-300"
                    style="min-width: 200px"
                    v-model="realForm.sendTo.value"
                    outlined
                    :options="['Primary', 'Primary & Alternate']"
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
                </div> -->
                <div class="row">
                  <div
                    class="q-mb-sm"
                    :class="{
                      'col-6': !isMobile,
                      'col-12': isMobile,
                    }"
                  >
                    <!-- <q-input
                      style="min-width: 200px"
                      v-model="realForm.emailSubject.value"
                      outlined
                      label="Email Subject *"
                      lazy-rules
                      :rules="[lazyRules.required()]"
                    /> -->
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
                          label="save draft"
                          @click="saveDialogFlag = true"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="row">
                    <div
                      class="MailMergePage-q-editor"
                      :class="{
                        'col-10': !isMobile,
                        'col-12': isMobile,
                      }"
                    >
                      <EditorCustom
                        show-uploader
                        v-model="email"
                        height="750px"
                        ref="editorRef"
                        :stringTokens="isMobile ? $rStore.$state.tokens : undefined"
                      />
                    </div>
                    <div v-if="!isMobile" class="col-2 q-pa-sm ComposeEmail-tokens-container">
                      <div class="row q-mb-sm">
                        <div class="col-12 separator-bottom">
                          <p style="margin: 5px">Select Mail Merge Fields</p>
                        </div>
                      </div>
                      <div class="token-items-container">
                        <!-- <q-inner-loading
                          :showing="$rStore.isLoadingReportData"
                          class="merged-field-loading"
                        /> -->
                        <q-item
                          class="ComposeEmail-token-item q-mb-sm"
                          v-for="(token, i) in $rStore.$state.tokens"
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

                <SelectImages v-model="selectImagesDialogFlag" @onSelectImg="onSelectImg" />

                <SaveDraft v-model="saveDialogFlag" @onSaveDraft="onSaveDraft" />

                <!--=========================== END OF SECTION ===========================-->
              </div>
              <div v-show="pageView == '2'">
                <div class="row">
                  <q-select
                    v-if="$dStore.categories.length && !$rStore.$state.isCustom"
                    popup-content-class="q-menu-300"
                    :debounce="500"
                    class="q-mr-sm q-mb-sm"
                    :class="{ 'item-width-300': !isMobile, 'w-full': isMobile }"
                    v-model="categoryFiltered"
                    outlined
                    multiple
                    :options="$dStore.categories"
                    label="Filter by categories "
                    option-label="categoryName"
                    option-value="categoryID"
                    clearable
                  />

                  <q-checkbox v-model="showSelectedOnly" label="Show Selected Members Only" />
                </div>

                <div class="q-pa-md">
                  <div class="row white-container" :class="{ fullscreen: isFullScreen }">
                    <div class="col-12">
                      <div class="row">
                        <div class="col-12 justify-content-space-between">
                          <h6>
                            {{ `Recipients: (${$rStore.$state.selectedRecipients.length})` }}
                          </h6>
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
                        :loading="isRecipientsTableLoading"
                        :style="{ height: isFullScreen ? '800px' : '628px' }"
                        class="table-sticky-header-column-table"
                        flat
                        bordered
                        :rows="rowsAux"
                        :columns="columns"
                        row-key="ID"
                        selection="multiple"
                        v-model:selected="$rStore.$state.selectedRecipients"
                        :pagination="{
                          rowsPerPage: 100,
                        }"
                      >
                        <template v-slot:header="props">
                          <q-tr :props="props">
                            <!-- <q-th auto-width /> -->
                            <q-th auto-width>
                              <!-- <q-checkbox v-model="props.selected" /> -->
                              <q-checkbox v-model="allRowSelected" @click="selectUnselectAllRows" />
                            </q-th>
                            <q-th v-for="col in props.cols" :key="col.name" :props="props">
                              {{ col.label }}
                            </q-th>
                          </q-tr>
                        </template>

                        <template v-slot:body="props">
                          <q-tr :props="props">
                            <!-- <q-td auto-width>
                  <q-btn
                    size="sm"
                    round
                    dense
                    @click="props.expand = !props.expand"
                    :icon="props.expand ? 'remove' : 'add'"
                  />
                </q-td> -->
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
                          <!-- <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                  <div class="text-left">
                    <InnerViewRow :recipient="props.row" />
                  </div>
                </q-td>
              </q-tr> -->
                        </template>
                      </q-table>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-else>
              <PreviewEmail :content="email" @onContinue="preview = false" />
            </template>
          </div>
        </div>

        <div class="row q-mt-lg cancel-save-btn-container">
          <div class="col-12 q-pa-sm">
            <q-btn
              outline
              label="Close"
              class="q-mr-sm"
              style="color: #990000; border-color: #990000"
              @click="cancelDialogFlag = true"
            />

            <q-btn
              :disable="!$rStore.$state.selectedRecipients.length"
              class="q-mr-sm"
              :label="`${preview ? 'Continue' : 'Preview'}`"
              @click="preview = !preview"
            />

            <q-btn
              v-if="!preview"
              :disable="!email"
              class="q-mr-sm"
              style="background: var(--happypurim); color: white"
              label="Generate PDF To Print"
              @click="
                () => {
                  if (checkIfRecipients()) pdfTitleFlag = true
                }
              "
            />
            <q-btn
              v-if="!preview"
              :disable="!email"
              class="q-mr-sm"
              style="background: var(--happypurim); color: white"
              label="Schedule or Send Email"
              @click="
                () => {
                  if (checkIfRecipients()) sendEmailFlag = true
                }
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div v-else>
    <div class="row">
      <h6>No members found</h6>
    </div>
  </div> -->
  <!--=============================== dialogs =============================-->

  <!-- generate pdf -->
  <q-dialog v-model="pdfTitleFlag" persistent>
    <q-card :style="{ width: isMobile ? '100vw' : '500px' }">
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Generate PDF to print</p>
        </div>
      </div>

      <div class="custom-dialog-body-container q-pa-lg">
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
        <div class="row q-mb-sm">
          <div class="col-12">
            <div class="row w-full">
              <q-input
                class="w-full"
                v-model="userEmail"
                outlined
                label="Email *"
                lazy-rules
                :rules="[lazyRules.required(), lazyRules.isEmail()]"
              />
            </div>
            <div class="row q-pl-sm q-pr-sm" style="color: red">
              *A link to download your document will be sent to this email address.
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <q-select
              popup-content-class="q-menu-300"
              v-model="orderByPDF"
              :options="$rStore.$state.tokens"
              label="Order By"
              filled
              style="width: 100%"
            />
          </div>
          <div class="col-6 q-pl-sm">
            <div
              class="row"
              style="align-content: center; justify-content: center; align-items: center"
            >
              <div style="cursor: pointer" @click="isAsc = false">Ascendent</div>
              <q-toggle class="unique-toggle" v-model="isAsc" color="primary" keep-color />
              <div style="cursor: pointer" @click="isAsc = true">Descendent</div>
            </div>
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
          :disable="!pdfTitle || !userEmail"
          style="background: var(--happypurim); color: white"
          label="Generate"
          class="q-mr-sm q-mt-sm"
          @click="onGeneratePDF"
          v-close-popup
        />
      </q-card-actions> </q-card
  ></q-dialog>

  <!-- send email-->
  <q-dialog v-model="sendEmailFlag" persistent>
    <q-card :style="{ width: isMobile ? '100vw' : '500px' }">
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Send Email</p>
        </div>
      </div>

      <div class="custom-dialog-body-container q-pa-lg">
        <div class="row">
          <q-select
            popup-content-class="q-menu-300"
            style="width: 100%"
            v-model="realForm.sendTo.value"
            outlined
            :options="['Primary', 'Primary & Alternate']"
            label="Send To *"
            lazy-rules
            :rules="[lazyRules.required()]"
          />
        </div>
        <div class="row">
          <q-input
            style="width: 100%"
            v-model="realForm.fullName.value"
            outlined
            label="Sending From Name *"
            lazy-rules
            :rules="[lazyRules.required()]"
          />
        </div>
        <div class="row">
          <q-input
            style="width: 100%"
            v-model="realForm.email.value"
            outlined
            label="Sending From Email *"
            lazy-rules
            :rules="[lazyRules.required(), lazyRules.isEmail()]"
          />
        </div>

        <div class="row">
          <q-input
            style="width: 100%"
            v-model="realForm.emailSubject.value"
            outlined
            label="Email Subject *"
            lazy-rules
            :rules="[lazyRules.required()]"
          />
        </div>
      </div>

      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn
          outline
          label="Close"
          class="q-mr-sm q-mt-sm"
          style="color: #990000; border-color: #990000; margin: 0px"
          v-close-popup
        />
        <q-btn-dropdown
          v-if="!preview"
          :disable="!isValidForm() || !email"
          label="Schedule or Send Email"
          style="background: var(--happypurim); color: white"
        >
          <q-list>
            <q-item clickable v-close-popup @click="sendLaterFlag = true">
              <q-item-section>
                <q-item-label>Send Later</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="onSendNowEmail">
              <q-item-section>
                <q-item-label>Send Now</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-card-actions>
    </q-card></q-dialog
  >

  <!-- TODO: add time zone -->
  <!-- send later email -->
  <q-dialog v-model="sendLaterFlag" persistent>
    <q-card :style="{ width: isMobile ? '100vw' : '500px' }">
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Schedule Email</p>
        </div>
      </div>

      <div class="custom-dialog-body-container q-pa-lg">
        <div class="row q-mb-sm">
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
              label="Date *"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <!-- :options="dateOptionsFn" -->
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
              label="Time *"
              mask="##:## a.a"
              lazy-rules
              :rules="[...timeRules]"
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <!-- :options="timeOptionsFn" -->
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
        <div class="row q-mb-sm">
          <div class="col-12 q-pa-sm">
            <q-select
              use-input
              v-model="timeZoneSelect"
              outlined
              :options="filteredTimeZoneOptions"
              label="Time Zone *"
              lazy-rules
              :rules="[lazyRules.required()]"
              @filter="timeZoneFilterFn"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey"> No results</q-item-section>
                </q-item>
              </template>
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ scope.label.replace('_', ' ') }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:selected>
                {{ timeZoneSelect.replace('_', ' ') }}
              </template>
            </q-select>
          </div>
        </div>
        <div v-if="!isValidDateValue" class="row q-pl-md" style="color: red">
          Invalid date, please select a date and time in the future (at least 20 min from now)
        </div>
        <div class="row q-mb-sm q-pa-sm" style="align-items: center">
          <div>Regenerate before sending:</div>
          <q-radio v-model="regenerateBefore" :val="true" label="Yes" />
          <q-radio v-model="regenerateBefore" :val="false" label="No" />
        </div>
        <div v-if="regenerateBefore" class="row" style="color: red; font-weight: 600">
          Please note: Since the report will be regenerated before sending, any recipients that were
          deselected will still be included in the email
        </div>
      </div>

      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn
          outline
          label="Close"
          class="q-mr-sm q-mt-sm"
          @click="resetDateForm"
          style="color: #990000; border-color: #990000"
          v-close-popup
        />
        <q-btn
          :disable="!dateValue || !timeValue || !isValidDateValue"
          style="background: var(--happypurim); color: white"
          label="Schedule"
          class="q-mr-sm q-mt-sm"
          @click="onSendLaterEmail"
          v-close-popup
        />
      </q-card-actions> </q-card
  ></q-dialog>

  <!--=============================== canceling  =============================-->
  <DialogAlert
    @on-finish="
      (value) => {
        if (value)
          $router.push({
            name: 'dashboard-MailMergeReportsPage',
          })
      }
    "
    msg="Are you sure you want to close this page? Everything will be lost."
    v-model="cancelDialogFlag"
  />

  <!--=========================== END OF SECTION ===========================-->

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
// import InnerViewRow from '../ViewReport/InnerViewRow.vue'
import { useRouter } from 'vue-router'
import { isValidDate, isValidTime } from 'src/helpers'
import { getFormattedStringDate, turnTimeAndDate } from 'src/helpers/turnTimeAndDate'
import type { RecipientMemberInterface } from 'src/modules/dashboard/interfaces/report.interface'
import { useQuasar, type QTableColumn } from 'quasar'
import { sortArrayByField } from 'src/helpers/sortArrayByfield'
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore/dashboardStore'
import type { ShulCategoryInterface } from 'src/modules/dashboard/interfaces/category-interfaces'
import DialogAlert from 'src/components/DialogAlert/DialogAlert.vue'
import { useReport } from 'src/modules/dashboard/composables/useReport'
import { cutName } from 'src/helpers/cutName'
import { useAuth } from 'src/modules/auth/composables/useAuth'
// import { date as dateUtils } from 'quasar'

const $router = useRouter()
const $q = useQuasar()
const $rStore = useReportStore()
const $dStore = useDashboardStore()
const { getReportData } = useReport()
const { authState } = useAuth()

const categoryFiltered = ref<ShulCategoryInterface[] | undefined>(undefined)

const allRowSelected = computed(() => {
  if ($rStore.$state.selectedRecipients.length === rowsAux.value.length && rowsAux.value.length > 0)
    return true
  else if ($rStore.$state.selectedRecipients.length === 0) return false
  else return null
})

const selectUnselectAllRows = () => {
  if ($rStore.$state.selectedRecipients.length) $rStore.$state.selectedRecipients = []
  else $rStore.$state.selectedRecipients = rowsAux.value.map((row) => ({ ...row }))
}

// const rows = computed(() => {
//   const members = $rStore.$state.report?.members || []
//   if (!categoryFiltered.value) return members

//   return members.filter((member) =>
//     member.Categories?.toLowerCase().includes(
//       `${categoryFiltered.value?.categoryID}`.toLowerCase(),
//     ),
//   )
// })

const showSelectedOnly = ref(false)

const rows = ref($rStore.$state.report?.members || [])
const rowsAux = computed(() => {
  const arr: RecipientMemberInterface[] = rows.value || []
  if (!showSelectedOnly.value) return arr

  return arr.filter((re) => !!$rStore.$state.selectedRecipients.find((re2) => re2.ID === re.ID))
})

watch(
  () => $rStore.$state.report?.members,
  (value: RecipientMemberInterface[] | undefined) => {
    if (!value) return
    rows.value = value
  },
  {
    deep: true,
  },
)

const isRecipientsTableLoading = ref(false)
const categoryFilteredDebounce = ref<NodeJS.Timeout | undefined>(undefined)

watch(
  categoryFiltered,
  async (value: ShulCategoryInterface[] | undefined) => {
    if (categoryFilteredDebounce.value) clearTimeout(categoryFilteredDebounce.value)

    categoryFilteredDebounce.value = setTimeout(async () => {
      if ($rStore.$state.isCustom) return
      if (!value) {
        rows.value = $rStore.$state.report?.members || []
        return
      }

      isRecipientsTableLoading.value = true
      const resp = await getReportData(
        {
          id: $rStore.$state.reportId,
          categories: value.map((cat) => `${cat.categoryID}`),
        },
        $rStore.$state.isCustom,
      )
      rows.value = resp?.members || []
      isRecipientsTableLoading.value = false
    }, 600)
  },
  {
    deep: true,
  },
)

const { isMobile } = useUI()
const { getData, generatePDF, sendNowEmail, addUnmergedEmailJobToTable } = useMailMerge()
const { addDrafts } = useDraft()

const preview = ref(false)
const isFullScreen = ref(false)
const cancelDialogFlag = ref(false)

const pageView = ref('1')
const pageOption = computed(() => [
  { label: 'Compose Merge', value: '1', disable: false },
  {
    label: `Recipients (${$rStore.$state.selectedRecipients.length}/${$rStore.$state.report?.members.length || 0})`,
    value: '2',

    loading: $rStore.isLoadingReportData,
  },
])

const columns: QTableColumn<RecipientMemberInterface>[] = [
  {
    name: 'Name',
    required: true,
    label: 'Name',
    align: 'left',
    field: 'ID',
    format: (_, row) => `${row['Last Name']}, ${row['First Name']}`,
    sortable: true,
    style: 'max-width: 200px; overflow: hidden; text-overflow: ellipsis',
    headerStyle: 'max-width: 200px; overflow: hidden; text-overflow: ellipsis',
  },
  {
    name: 'email',
    required: true,
    label: 'Email',
    align: 'left',
    field: 'Email',
    format: (val) => `${val}`,
    sortable: true,
  },
]

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
  if (!editorRef.value) return
  const content = editorRef.value.getEditorValue() || ''

  const draft = {
    body: content,
    name: form.name,
    description: form.description,
    documentType: 'html',
  }

  await addDrafts(draft)
}

const pdfTitle = ref('')
const userEmail = ref(authState.value?.user?.email || '')
const orderByPDF = ref('')
const isAsc = ref(false)
const pdfTitleFlag = ref(false)
const sendEmailFlag = ref(false)

const onGeneratePDF = async () => {
  if (!editorRef.value) return
  const content = editorRef.value.getEditorValue() || ''
  generatePDF({
    title: pdfTitle.value,
    userEmail: userEmail.value,
    content: content.replace(/\\+/g, ''),
    memberIds: (orderByPDF.value
      ? sortArrayByField(
          $rStore.$state.selectedRecipients,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          orderByPDF.value as any,
          isAsc.value,
        )
      : $rStore.$state.selectedRecipients
    ).map((re) => re.ID),
  }).catch(console.error)
}

watch(pdfTitleFlag, () => {
  pdfTitle.value = ''
  orderByPDF.value = ''
  isAsc.value = false
})

const onSendNowEmail = async () => {
  await onSendEmail()
}

// TODO: add time zone
const onSendLaterEmail = async () => {
  if (!editorRef.value) return
  const content = editorRef.value.getEditorValue() || ''

  const dateString = getFormattedStringDate({
    dateValue: dateValue.value,
    timeValue: timeValue.value,
    timeZone: timeZoneSelect.value,
  })

  // const date = new Date(dateString!)
  const date = dateString!

  if (!regenerateBefore.value) await onSendEmail(date, true)
  else {
    const formData = getFormValue()
    const resp = await addUnmergedEmailJobToTable({
      content,
      date,
      timeZone: timeZoneSelect.value,
      form: {
        sendTo: formData.sendTo == 'Primary' ? 'Primary' : 'primary_alternate',
        fullName: formData.fullName || '',
        email: formData.email || '',
        emailSubject: formData.emailSubject || '',
      },
    })
    if (resp)
      $router.push({
        name: 'dashboard-MailMergeReportsPage',
      })
  }
  resetDateForm()
}
// const onSendLaterEmail = async () => {
//   if (!editorRef.value) return
//   const content = editorRef.value.getEditorValue() || ''

//   const dateString = turnTimeAndDate({
//     dateValue: dateValue.value,
//     timeValue: timeValue.value,
//   })

//   // console.log({ dateString })

//   // const date = new Date(dateString!)
//   const date = dateString!

//   if (!regenerateBefore.value) await onSendEmail(date, true)
//   else {
//     const formData = getFormValue()
//     const resp = await addUnmergedEmailJobToTable({
//       content,
//       date,
//       form: {
//         sendTo: formData.sendTo == 'Primary' ? 'Primary' : 'primary_alternate',
//         fullName: formData.fullName || '',
//         email: formData.email || '',
//         emailSubject: formData.emailSubject || '',
//       },
//     })
//     if (resp)
//       $router.push({
//         name: 'dashboard-MailMergeReportsPage',
//       })
//   }
//   resetDateForm()
// }

const onSendEmail = async (date?: Date | string, isSchedule?: boolean) => {
  if (!editorRef.value) return
  const content = editorRef.value.getEditorValue() || ''
  const formData = getFormValue()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = {
    form: {
      sendTo: formData.sendTo == 'Primary' ? 'Primary' : 'primary_alternate',
      fullName: formData.fullName || '',
      email: formData.email || '',
      emailSubject: formData.emailSubject || '',
    },
    content,
    memberIds: $rStore.$state.selectedRecipients.map((re) => re.ID),
    date,
    timeZone: timeZoneSelect.value || '',
    sendNow: !date ? true : false,
  }

  const resp = await sendNowEmail(data, isSchedule)

  if (resp)
    $router.push({
      name: 'dashboard-MailMergeReportsPage',
    })
}

const onSelectImg = (img: string) => {
  if (editorRef.value) {
    editorRef.value.insertFile(img)
  }
}

/**========================================================================
 *                            data
 *========================================================================**/
const dateValue = ref('')
const timeValue = ref('')

const isValidDateValue = computed<boolean>(() => {
  if (!dateValue.value || !timeValue.value) return true
  const currentDate = new Date().getTime() + 20 * 60 * 1000
  const selectedDate =
    turnTimeAndDate({
      dateValue: dateValue.value,
      timeValue: timeValue.value,
      timeZone: timeZoneSelect.value,
    })?.getTime() || 0
  return selectedDate > currentDate
})

const regenerateBefore = ref(false)
const sendLaterFlag = ref(false)

const resetDateForm = () => {
  dateValue.value = ''
  timeValue.value = ''
  regenerateBefore.value = false
}

const dateRules = [(value: string) => isValidDate(value) || 'Invalid date']
const timeRules = [
  (value: string) => {
    return isValidTime(value) || 'Invalid time'
  },
]

// const dateOptionsFn = (day: string) => {
//   const today = dateUtils.formatDate(new Date(), 'YYYY/MM/DD')
//   return day >= today
// }

// const timeOptionsFn = (hr: number, min: number | null) => {
//   const now = new Date()
//   const currentHour = now.getHours()
//   const currentMinute = now.getMinutes()

//   if (hr > currentHour) return true

//   if (hr === currentHour && min !== null && min >= currentMinute) return true

//   return false
// }

const checkIfRecipients = () => {
  if ($rStore.$state.selectedRecipients.length) return true
  $q.notify({
    color: 'blue',
    textColor: 'black',
    icon: 'error',
    message: 'No Recipients Selected',
  })
  return false
}

/**========================================================================
 *                           time zone selector
 *========================================================================**/
const timeZones: string[] = Intl.supportedValuesOf('timeZone') || []
// const timeZoneOptions = ref<string[]>(timeZones)
const filteredTimeZoneOptions = ref<string[]>(['pepe', 'juan'])
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
const timeZoneSelect = ref(userTimeZone)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const timeZoneFilterFn = (val: string, update: any) => {
  update(() => {
    const needle = val.toLowerCase()
    filteredTimeZoneOptions.value = timeZones.filter((v) => v.toLowerCase().indexOf(needle) > -1)
  })
}

/**========================================================================
 *                           get initial data
 *========================================================================**/

onMounted(() => {
  getData().then((resp) => {
    // tokens

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

<style scoped lang="scss" src="./MailMergePage.scss" />
