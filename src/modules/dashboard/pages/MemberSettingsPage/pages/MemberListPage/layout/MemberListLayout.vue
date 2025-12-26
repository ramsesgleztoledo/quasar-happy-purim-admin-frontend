<template>
  <template v-if="!$dStore.$state.canUploadList">
    <div class="row q-mb-md">
      <div class="col-12 top-title-col">
        <p class="page-main-title">Revert to previous Member List</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
        <p>
          <b> Upload disabled: </b>
          A list has already been uploaded or an order has already been placed.
        </p>
      </div>
    </div>
    <div class="row" style="height: 60vh">
      <div class="col-12 MemberListLayout-last-info-container">
        <div class="MemberListLayout-last-info">
          <div class="row">
            <p>
              <q-icon
                name="info"
                style="font-size: 30px; color: var(--happypurim)"
                class="q-mr-sm"
              />
              You already uploaded a list this year, you always can roll back to the previous list
              and then upload a new one.
              <b> Please if you need any help you can contact the HappyPurim Support team </b>
            </p>
          </div>
          <div class="row" v-for="item in dictsRef" :key="item.label">
            <p>
              <b>{{ item.quantity }} </b> {{ item.label }}
            </p>
          </div>
          <div class="row q-mt-md">
            <div class="col-12 justify-content-end">
              <q-btn
                @click="revertDialogFlag = true"
                color="primary"
                icon="history"
                label="Revert to previous list"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="row w-full top-title-col justify-content-space-between">
      <div
        :class="{
          'col-12': isMobile,
          'justify-content-space-between': !isMobile,
        }"
      >
        <p class="page-main-title">Manage Member List</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
      </div>
      <div
        :class="{
          'col-12': isMobile,
        }"
      >
        <q-stepper
          class="MemberListLayout-stepper"
          v-model="step"
          ref="stepper"
          color="primary"
          animated
        >
          <q-step :name="1" title="Upload List" icon="upload" :done="step > 1" />
          <q-step :name="2" title="Select Sheet" icon="description" :done="step > 2" />
          <q-step :name="3" title="Match Column" icon="view_column" :done="step > 3" />
          <q-step :name="4" title="Primary Key" icon="key" :done="step > 4" />
          <q-step :name="5" title="Changes to Apply" icon="add" :done="step > 5" />
          <q-step :name="6" title="Preview Changes" icon="preview" :done="step > 6" />
          <q-step :name="7" title="Uploaded" icon="check" :done="allDone" />
        </q-stepper>
      </div>
    </div>

    <div style="display: flex; flex-direction: column">
      <div style="flex: 1; min-height: 70vh" class="row MemberListLayout-container q-mb-lg">
        <div class="col-12 q-pa-md">
          <!-- STEP 1 UPLOAD LIST -->
          <template v-if="step === 1">
            <UploaderComponent
              description="By following these instructions, you should be able to upload a new member list efficiently and accurately. If you have any questions or need further assistance, please contact us"
              v-model:file-model="fileModel"
              accept="xlsx, xls"
            />
          </template>

          <!-- STEP 2 SELECT SHEET-->
          <template
            v-if="
              step === 2 &&
              step_one_data?.sheetNames?.length &&
              step_one_data?.sheetNames?.length > 1
            "
          >
            <div class="row q-pa-lg">
              <div class="col-12 q-pa-lg q-item-bordered">
                <div class="row q-mb-sm justify-content-center">
                  <h6 class="q-ma-md">
                    Please select the sheet of this document that you want to use
                  </h6>
                </div>
                <div class="row justify-content-center">
                  <q-select
                    popup-content-class="q-menu-300"
                    style="width: 200px"
                    v-model="sheet"
                    :options="step_one_data?.sheetNames || []"
                    label="Sheet"
                    filled
                  />
                </div>
              </div>
            </div>
          </template>

          <!-- STEP 3 match field-->
          <template v-if="step === 3">
            <div class="row q-pa-lg">
              <div class="col-12 q-pa-lg q-item-bordered">
                <!-- if error -->
                <template v-if="step_three_data?.success === false">
                  <div class="row" style="color: red">
                    <h6>
                      Something went wrong processing the file, please fix the problem and try again
                    </h6>
                  </div>
                </template>

                <template v-else-if="step_three_data?.errorDescription">
                  <div class="row" style="color: red">
                    <h6>
                      {{ step_three_data?.errorDescription }}
                    </h6>
                  </div>
                </template>

                <template v-else>
                  <div class="row q-mb-sm">
                    <h6 style="margin: 0px">
                      Match up the column names in your member in your member list with the column
                      names in our system
                    </h6>
                  </div>

                  <div v-if="!step_three_resp.success" class="row q-ma-sm" style="color: red">
                    {{ step_three_resp.message }}
                  </div>

                  <div class="row">
                    <div class="col-12">
                      <div class="row q-mb-md">
                        <div class="col-3">
                          <b> Import Fields </b>
                        </div>
                        <div class="col-3">
                          <b> Destination Fields </b>
                        </div>
                      </div>
                      <div
                        class="row q-mb-md"
                        v-for="item in matchedFields"
                        :key="item.matchedMapID"
                      >
                        <div class="col-3">
                          <label class="q-mr-sm"> {{ item.importField }}</label>
                        </div>
                        <div class="col-3">
                          <q-select
                            popup-content-class="q-menu-300"
                            option-label="fieldName"
                            option-value="mapID"
                            class="q-mr-sm"
                            v-model="item.value"
                            :options="useFieldOptions"
                            label="field"
                            filled
                            @update:model-value="
                              ;() => {
                                item.oldValue = false
                              }
                              step_three_resp.success = true
                            "
                          />
                        </div>
                        <div class="col">
                          <q-checkbox
                            :disable="isCheckOldValueDisabled(item).value"
                            class="q-mr-sm"
                            v-model="item.oldValue"
                            label="Maintain old Value on Empty"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>

          <!-- STEP 4 primary key-->
          <template v-if="step === 4">
            <div class="row q-pa-lg">
              <div class="col-12 q-pa-lg q-item-bordered">
                <div class="row q-mb-sm">
                  <h6 style="margin: 0px">
                    Identify the field you would like to use as your key (this needs to be unique to
                    each row)
                  </h6>
                </div>
                <div v-if="!step_four_resp.success" class="row q-ma-sm" style="color: red">
                  {{ step_four_resp.message }}
                </div>

                <div class="row">
                  <div class="col-12">
                    <div class="row">
                      <div class="col-6 q-pa-sm">
                        <q-select
                          @update:model-value="
                            () => {
                              step_four_resp.success = true
                            }
                          "
                          popup-content-class="q-menu-300"
                          v-model="sourceField"
                          :options="matchedFields.map((item) => item.importField)"
                          label="Source Field"
                          filled
                        />
                      </div>
                      <div class="col-6 q-pa-sm">
                        <q-select
                          @update:model-value="
                            () => {
                              step_four_resp.success = true
                            }
                          "
                          popup-content-class="q-menu-300"
                          v-model="destinationField"
                          :options="destinationKeys.map((item) => item.fieldName)"
                          label="Destination Field"
                          filled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- STEP 5 choose changes-->
          <template v-if="step === 5">
            <div class="row q-pa-lg">
              <div class="col-12 q-pa-lg q-item-bordered">
                <div class="row q-mb-sm">
                  <h6 style="margin: 0px">
                    Choose the changes you would like to apply to your membership list
                  </h6>
                </div>

                <div class="row">
                  <div class="col-12">
                    <div class="row q-mb-sm">
                      <q-checkbox v-model="stepFiveData.update" label="Update Existing Members" />
                    </div>
                    <div class="row q-mb-sm">
                      <q-checkbox v-model="stepFiveData.add" label="Add New Members" />
                    </div>
                    <div class="row q-mb-sm">
                      <q-checkbox
                        v-model="stepFiveData.delete"
                        label="Delete Existing Members not in list"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- STEP 6 preview changes-->
          <template v-if="step === 6">
            <PreviewNewMemberList ref="previewNewMemberList" />
          </template>

          <template v-if="step === 7">
            <div class="row" style="height: 100%">
              <div class="col-12 MemberListLayout-last-info-container">
                <div class="MemberListLayout-last-info">
                  <div class="row">
                    <p><b>Upload Completed !</b></p>
                  </div>
                  <div class="row" v-for="item in dictsRef" :key="item.label">
                    <p>
                      <b>{{ item.quantity }} </b> {{ item.label }}
                    </p>
                  </div>
                  <div class="row q-mt-md">
                    <div class="col-12 justify-content-end">
                      <q-btn
                        @click="revertDialogFlag = true"
                        color="primary"
                        icon="history"
                        label="Revert Changes"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="row q-mt-lg cancel-save-btn-container">
        <div class="col-12">
          <div v-if="step !== 7" @click="goToTop({ delay: 500 })">
            <q-btn
              outline
              label="CANCEL"
              class="q-mr-sm"
              style="color: #990000; border-color: #990000"
              :disable="loading"
              :to="{
                name: 'MembersSettingsPage-home',
              }"
            />
            <q-btn
              v-if="step !== 1"
              class="q-mr-sm"
              label="Back"
              @click="
                () => {
                  step--
                  if (
                    step === 2 &&
                    (!step_one_data?.sheetNames?.length ||
                      (step_one_data?.sheetNames?.length &&
                        step_one_data?.sheetNames?.length === 1))
                  )
                    step--
                }
              "
              :disable="loading"
            />

            <q-btn
              v-if="step === 1"
              :loading="loading"
              :disable="!fileModel.length"
              class="q-mr-sm loading-btn"
              style="background: var(--happypurim); color: white"
              label="continue"
              @click="step_one"
            />
            <q-btn
              v-if="step === 2"
              :loading="loading"
              :disable="!sheet"
              class="q-mr-sm loading-btn"
              style="background: var(--happypurim); color: white"
              label="continue"
              @click="step_two"
            />
            <q-btn
              v-if="step === 3"
              :loading="loading"
              class="q-mr-sm loading-btn"
              style="background: var(--happypurim); color: white"
              label="continue"
              @click="step_three"
            />
            <q-btn
              v-if="step === 4"
              :loading="loading"
              :disable="!sourceField || !destinationField"
              class="q-mr-sm loading-btn"
              style="background: var(--happypurim); color: white"
              label="continue"
              @click="step_four"
            />
            <q-btn
              v-if="step === 5"
              :loading="loading"
              class="q-mr-sm loading-btn"
              style="background: var(--happypurim); color: white"
              label="continue"
              @click="step_five"
            />
            <q-btn
              v-if="step === 6"
              :loading="loading"
              class="q-mr-sm loading-btn"
              style="background: var(--happypurim); color: white"
              label="continue & Upload List "
              @click="onContinueAndUpload"
            />
          </div>

          <template v-else>
            <q-btn
              class="q-mr-sm"
              style="background: var(--happypurim); color: white"
              label="Close"
              :to="{
                name: 'DashboardLayout',
              }"
            />
          </template>
        </div>
      </div>
    </div>
  </template>

  <!--=============================== reverting  =============================-->
  <DialogAlert
    @on-finish="
      (value) => {
        if (value) revertBack()
      }
    "
    msg="Are you sure you want go back to your previous list."
    v-model="revertDialogFlag"
  />

  <!--=========================== END OF SECTION ===========================-->
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import UploaderComponent from 'src/components/UploaderComponent/UploaderComponent.vue'
import { useUI } from 'src/modules/UI/composables'
import { useUploadList } from 'src/modules/dashboard/composables/useUploadList'
import type {
  BackupUploadFormInterface,
  DestinationKeyInterface,
  FieldOptionInterface,
  MemberRecordInterface,
  ProcessAndMatchResponseInterface,
  UploadFileResponseInterface,
} from 'src/modules/dashboard/interfaces/upload-list.interfaces'
import PreviewNewMemberList from './components/PreviewNewMemberList.vue'
import { QBtn, useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore/dashboardStore'
import DialogAlert from 'src/components/DialogAlert/DialogAlert.vue'

interface StepResponseInterface {
  success: boolean
  message: string
}

const $router = useRouter()
const $route = useRoute()
const $q = useQuasar()

const $dStore = useDashboardStore()

const { isMobile, goToTop } = useUI()
const {
  uploadMemberList,
  processAndMatch,
  getFieldOptions,
  updateAndValidate,
  checkMatchSrcDestKey,
  saveSelectionOptions,
  getDestinationKeys,
  backupAndUpload,
  revertChanges,
} = useUploadList()

const loading = ref(false)
const revertDialogFlag = ref(false)

// stepper
const step = ref<number>(1)

// step 1 data
const fileModel = ref<File[]>([])
const step_one_data = ref<UploadFileResponseInterface | undefined>(undefined)

// step 2 data
const sheet = ref('')

// step 3 data
const step_three_data = ref<ProcessAndMatchResponseInterface | undefined>(undefined)
const fieldOptions = ref<FieldOptionInterface[]>([])

const useFieldOptions = computed<FieldOptionInterface[]>(() =>
  fieldOptions.value.map((item) => {
    const found = matchedFields.value.find((mField) => mField.value.mapID == item.mapID)

    const disable = item.mapID != '<ignore>' && !!found

    return { ...item, disable }
  }),
)

type MatchedFieldInterface = {
  value: {
    mapID: string
    fieldName: string
  }
  oldValue: boolean
  importField: string
  matchedMapID: string
  matchedFieldName: string
}

const matchedFields = ref<MatchedFieldInterface[]>([])

// step 4 data
const sourceField = ref('')
const destinationField = ref('')

// step 5 data
const stepFiveData = ref({
  update: true,
  add: true,
  delete: true,
})

// last step data
const allDone = ref(false)

//! step 1 functions
const step_one = async () => {
  $q.loading.show({ message: 'Loading...' })
  loading.value = true
  step_two_reset_data()
  const step_one_response = await uploadMemberList(fileModel.value[0]!)
  loading.value = false
  if (step_one_response) {
    step_one_data.value = step_one_response
    step.value++
    if (step_one_data.value?.sheetNames?.length === 1) {
      sheet.value = step_one_data.value?.sheetNames[0] || ''
      await step_two()
    }
  }
  $q.loading.hide()
  goToTop({ delay: 500 })
}

//! step 2 functions
const step_two = async () => {
  $q.loading.show({ message: 'Loading...' })
  step_three_reset_data()
  loading.value = true
  const resp = await processAndMatch({
    sheetName: sheet.value,
    filePath: step_one_data.value?.filePath || '',
  })
  step_three_data.value = resp
  matchedFields.value =
    resp?.matchedFields.map((item) => ({
      ...item,
      value: {
        mapID: item.matchedMapID,
        fieldName: item.matchedFieldName,
      },
      oldValue: false,
    })) || []
  loading.value = false
  step.value++
  $q.loading.hide()
  goToTop({ delay: 500 })
}

const step_three_resp = ref<StepResponseInterface>({
  success: true,
  message: '',
})

const step_three = async () => {
  $q.loading.show({ message: 'Loading...' })
  loading.value = true
  step_four_reset_data()
  step_three_resp.value = (
    await updateAndValidate(
      matchedFields.value.map((item) => ({
        isChecked: item.oldValue,
        newFieldName: item.value.fieldName,
        oldFieldName: item.importField,
      })),
    )
  ).data as unknown as StepResponseInterface
  loading.value = false
  if (step_three_resp.value.success) step.value++

  $q.loading.hide()
  goToTop({ delay: 500 })
}

const step_four_resp = ref<StepResponseInterface>({
  success: true,
  message: '',
})

const step_four = async () => {
  $q.loading.show({ message: 'Loading...' })
  loading.value = true
  step_four_resp.value = (
    await checkMatchSrcDestKey({
      destinationKey: destinationField.value,
      sourceKey: sourceField.value,
    })
  ).data

  loading.value = false

  if (step_four_resp.value.success) step.value++

  $q.loading.hide()
  goToTop({ delay: 500 })
}

const step_five = async () => {
  $q.loading.show({ message: 'Loading, This may take a few moments' })
  loading.value = true
  await saveSelectionOptions(stepFiveData.value)
  loading.value = false
  step.value++
  $q.loading.hide()
  goToTop({ delay: 500 })
}

const destinationKeys = ref<DestinationKeyInterface[]>([])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const previewNewMemberList = ref<any>(undefined)

const dictsRef = ref<{ label: string; quantity: number }[]>([])

const onContinueAndUpload = async () => {
  if (!previewNewMemberList.value) return

  $q.loading.show({ message: 'Loading...' })

  const dicts = previewNewMemberList.value.onSave() as unknown as {
    updateMembers: MemberRecordInterface
    addMembers: MemberRecordInterface
    deleteMembers: MemberRecordInterface
    unchangedMembers: MemberRecordInterface
  }

  dictsRef.value = [
    { label: 'Members updated', quantity: Object.keys(dicts.updateMembers).length },
    { label: 'Members added', quantity: Object.keys(dicts.addMembers).length },
    { label: 'Members deleted', quantity: Object.keys(dicts.deleteMembers).length },
    { label: 'Members did not change', quantity: Object.keys(dicts.unchangedMembers).length },
  ]

  const data: BackupUploadFormInterface = {
    file: {
      filePath: step_one_data.value?.filePath.replace(/\\/g, '/') || '',
      fileName: step_one_data.value?.originalFileName || '',
    },
    dicts,
  }
  const resp = await backupAndUpload(data)
  if (resp) step.value++

  $q.loading.hide()
  goToTop({ delay: 500 })
}

const revertBack = async () => {
  const reps = await revertChanges()
  if (reps) {
    $router.push({
      name: 'DashboardLayout',
    })
  }
}

/**========================================================================
 *                           resetting data
 *========================================================================**/
const step_two_reset_data = () => {
  sheet.value = ''
}
const step_three_reset_data = () => {
  step_three_resp.value = {
    success: true,
    message: '',
  }
  step_three_data.value = undefined
  matchedFields.value = []
}
const step_four_reset_data = () => {
  step_four_resp.value = {
    success: true,
    message: '',
  }
  sourceField.value = ''
  destinationField.value = ''
}

const isCheckOldValueDisabled = (item: MatchedFieldInterface) =>
  computed(() => {
    const value = item.value.mapID
    return value == '<ignore>' || value == 'm_hidden' || value.startsWith('C_')
  })

onMounted(async () => {
  const resp = await Promise.all([getFieldOptions(), getDestinationKeys()])
  fieldOptions.value = resp[0]
  destinationKeys.value = resp[1]
})

watch(
  () => $route.query.force,
  () => {
    step.value = 1
  },
)
</script>

<style scoped lang="scss" src="./MemberListLayout.scss" />
