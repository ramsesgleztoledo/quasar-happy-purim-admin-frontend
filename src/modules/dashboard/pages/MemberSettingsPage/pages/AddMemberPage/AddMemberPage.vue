<template>
  <div class="q-mb-md">
    <div class="row">
      <!--=============================== if desktop =============================-->

      <div class="col-12 top-title-col">
        <p class="MemberPage-user-title">Add New Member</p>
        <div class="separator-right q-mr-sm q-ml-sm"></div>
      </div>
      <!--=========================== END OF SECTION ===========================-->
      <!--=============================== if mobile =============================-->

      <!--=========================== END OF SECTION ===========================-->
    </div>
  </div>

  <!-- eslint-disable -->
  <form action="" class="q-mt-lg">
    <div class="row">
      <!--=============================== member left=============================-->
      <div
        class="q-pr-lg"
        :class="{
          'col-6': !isMobile,
          'col-12': isMobile,
        }"
      >
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-select
              v-model="(realForm.memberTitle as FormField).value as string"
              outlined
              :options="memberTitleOptions"
              label="Title"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="(realForm.firstName as FormField).value as string"
              outlined
              label="First Name"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="(realForm.lastName as FormField).value as string"
              outlined
              label="Last Name"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-select
              v-model="(realForm.spouseTitle as FormField).value as string"
              outlined
              :options="memberTitleOptions"
              label="Title"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="(realForm.spouseFirstName as FormField).value as string"
              outlined
              label="Spouse First Name"
            />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="(realForm.spouseLastName as FormField).value as string"
              outlined
              label="Spouse Last Name"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-input
              v-model="(realForm.address as FormField).value as string"
              outlined
              label="Address"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="(realForm.address2 as FormField).value as string"
              outlined
              label="Address 2"
            />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="(realForm.city as FormField).value as string"
              outlined
              label="City"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-select
              v-model="(realForm.state as FormField).value as string"
              outlined
              :options="statesOptions"
              label="State"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="(realForm.zipCode as FormField).value as string"
              outlined
              label="Zip Code"
              mask="#####"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="(realForm.phone as FormField).value as string"
              outlined
              label="Primary Telephone"
              mask="(###) - ### - ####"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="(realForm.phone2 as FormField).value as string"
              outlined
              label="Optional 2nd Telephone"
              mask="(###) - ### - ####"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="(realForm.email as FormField).value as string"
              outlined
              label="Email Address"
              lazy-rules
              :rules="[lazyRules.required(), lazyRules.isEmail()]"
              hint="Receipts will be sent here"
            />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="(realForm.email2 as FormField).value as string"
              outlined
              label="Optional 2nd Email Address"
              lazy-rules
              :rules="[lazyRules.checkOnlyIfValue(validations.isEmail)]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input v-model="(realForm.misc as FormField).value as string" outlined label="Misc" />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="(realForm.email2 as FormField).value as string"
              outlined
              label="Misc 2"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-input
              v-model="(realForm.displayName as FormField).value as string"
              outlined
              label="Display Name"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-input
              type="textarea"
              v-model="(realForm.foods as FormField).value as string"
              outlined
              label="Please specify any special food needs"
              lazy-rules
              :rules="[lazyRules.maxCharacters(255)]"
              :hint="`${((realForm.foods as FormField).value as string).length}/255 character limit`"
            />
          </div>
        </div>
      </div>
      <!--=========================== END OF SECTION ===========================-->
      <!--=============================== member left=============================-->
      <div
        class="q-pr-lg"
        :class="{
          'col-6': !isMobile,
          'col-12': isMobile,
        }"
      >
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-input
              v-model="(realForm.firstName as FormField).value as string"
              outlined
              label="Salutation"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-input
              type="textarea"
              v-model="(realForm.notes as FormField).value as string"
              outlined
              label="Notes"
              lazy-rules
              :rules="[lazyRules.maxCharacters(255)]"
              :hint="`${((realForm.notes as FormField).value as string).length}/255 character limit`"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-12">
            <q-checkbox v-model="altAddress" label="Deliver My Basket to an Alternate Address" />
          </div>
        </div>
        <div v-if="altAddress">
          <div class="row q-mt-md">
            <div class="col-12 q-pl-sm q-pr-sm">
              <q-input
                v-model="(realForm.address as FormField).value as string"
                outlined
                label="Address"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col-6 q-pl-sm q-pr-sm">
              <q-input
                v-model="(realForm.address2 as FormField).value as string"
                outlined
                label="Address 2"
              />
            </div>
            <div class="col-6 q-pl-sm q-pr-sm">
              <q-input
                v-model="(realForm.city as FormField).value as string"
                outlined
                label="City"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col-6 q-pl-sm q-pr-sm">
              <q-select
                v-model="(realForm.state as FormField).value as string"
                outlined
                :options="statesOptions"
                label="State"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
            <div class="col-6 q-pl-sm q-pr-sm">
              <q-input
                v-model="(realForm.zipCode as FormField).value as string"
                outlined
                label="Zip Code"
                mask="#####"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
          </div>
        </div>
        <div class="row q-mt-md">
          <div
            class="q-pl-sm q-pr-sm q-mb-md"
            :class="{
              'col-6': !isMobile,
              'col-12': isMobile,
            }"
          >
            <div class="border-container">
              <label> Other Options</label>
              <div class="q-mt-md">
                <div v-for="(item, index) in otherOptions" :key="index" class="row q-mb-sm">
                  <q-checkbox v-model="item.value" :label="item.label" />
                </div>
              </div>
            </div>
          </div>
          <div
            class="q-pl-sm q-pr-sm"
            :class="{
              'col-6': !isMobile,
              'col-12': isMobile,
            }"
          >
            <div class="border-container">
              <label> Other Options</label>
              <div class="q-mt-md">
                <div v-for="(item, index) in customOptions" :key="index" class="row q-mb-sm">
                  <q-checkbox v-model="item.value" :label="item.label" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <div class="border-container">
              <label> Select Categories</label>
              <div class="q-mt-md">
                <div class="row">
                  <div class="col-6 q-mb-sm" v-for="(item, index) in categories" :key="index">
                    <q-checkbox v-model="item.value" :label="item.label" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--=========================== END OF SECTION ===========================-->
    </div>
    <div class="row q-mt-lg cancel-save-btn-container">
      <div class="col-12">
        <q-btn
          outline
          label="CANCEL"
          class="q-mr-sm"
          style="color: #990000; border-color: #990000"
          @click="cancelOrderDialogFlag = true"
        />
        <q-btn
          class="q-mr-sm"
          label="SAVE AND ADD ANOTHER"
          @click="
            () => {
              reloadPage()
            }
          "
        />
        <q-btn
          class="q-mr-sm"
          style="background: var(--happypurim); color: white"
          label="SAVE CHANGES"
        />
      </div>
    </div>
  </form>

  <div class="row q-mt-lg">
    <div class="col-12"></div>
  </div>

  <!-- eslint-enable -->

  <!--=============================== Dialogs =============================-->

  <!--* confirm cancel --->
  <DialogAlert
    @on-finish="(value) => console.log('on finish', { value })"
    msg="Are you sure you want to cancel this order?"
    v-model="cancelOrderDialogFlag"
  />

  <!--=========================== END OF SECTION ===========================-->
</template>

<script setup lang="ts">
import DialogAlert from 'src/components/DialogAlert/DialogAlert.vue'
import type { FormField } from 'src/composables'
import { lazyRules, useForm, validations } from 'src/composables'
import { useUI } from 'src/modules/UI/composables'
import { ref } from 'vue'

const { reloadPage, isMobile } = useUI()

const memberTitleOptions: string[] = ['Mr', 'Mrs']
const statesOptions: string[] = ['Fl', 'NY']
const altAddress = ref<boolean>(false)
const cancelOrderDialogFlag = ref<boolean>(false)

const categories = ref([
  { value: false, label: 'Incomplete Address' },
  { value: false, label: 'Happy Purim' },
  { value: false, label: 'Paper Order Form' },
  { value: false, label: 'Parents' },
  { value: false, label: 'Board Members' },
  { value: false, label: 'Automatically Receives Basket' },
  { value: false, label: 'Avel' },
  { value: false, label: 'Staff' },
])
const otherOptions = ref([
  { value: false, label: 'Reciprocity' },
  { value: false, label: 'Hidden' },
])
const customOptions = ref([
  {
    value: false,
    label:
      'Please donate my basket to charity and instead ONLY send me a list of those who gave to me.',
  },
  { value: false, label: 'I would like to help pack the baskets on March 8th at 2pm' },
  { value: false, label: 'I would be willing to help deliver/distribute baskets' },
  { value: false, label: 'Avel' },
  { value: false, label: 'I would like to pick up my basket in the office' },
])

const { realForm } = useForm({
  memberTitle: { value: '', validations: [] },
  firstName: { value: '', validations: [validations.required] },
  lastName: { value: '', validations: [validations.required] },
  spouseTitle: { value: '', validations: [] },
  spouseFirstName: { value: '', validations: [] },
  spouseLastName: { value: '', validations: [] },
  address: { value: '', validations: [validations.required] },
  address2: { value: '', validations: [] },
  city: { value: '', validations: [validations.required] },
  state: { value: '', validations: [validations.required] },
  zipCode: { value: '', validations: [validations.required] },
  phone: { value: '', validations: [validations.required] },
  phone2: { value: '', validations: [] },
  email: { value: '', validations: [validations.isEmail] },
  email2: { value: '', validations: [] },
  misc: { value: '', validations: [] },
  misc2: { value: '', validations: [] },
  displayName: { value: '', validations: [validations.required] },
  foods: { value: '', validations: [] },
  salutation: { value: '', validations: [validations.required] },
  notes: { value: '', validations: [] },
})
</script>

<style scoped lang="scss">
@import './AddMemberPage.scss';
</style>
