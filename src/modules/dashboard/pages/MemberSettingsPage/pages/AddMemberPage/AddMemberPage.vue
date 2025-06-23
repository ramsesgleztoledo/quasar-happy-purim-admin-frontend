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
            <q-input
              v-model="realForm.title.value"
              outlined
              label="Title *"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.firstName.value"
              outlined
              label="First Name *"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.lastName.value"
              outlined
              label="Last Name *"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.spouseTitle.value"
              outlined
              label="Title *"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input v-model="realForm.spouseFirstName.value" outlined label="Spouse First Name" />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input v-model="realForm.spouseLastName.value" outlined label="Spouse Last Name" />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.address.value"
              outlined
              label="Address  *"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input v-model="realForm.address2.value" outlined label="Address 2" />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.city.value"
              outlined
              label="City  *"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-select
              v-model="realForm.state.value"
              outlined
              :options="statesOptions"
              label="State  *"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.zip.value"
              outlined
              label="Zip Code  *"
              mask="#####"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.phone.value"
              outlined
              label="Primary Telephone *"
              mask="(###) - ### - ####"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.phone2.value"
              outlined
              label="Optional 2nd Telephone"
              mask="(###) - ### - ####"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.email.value"
              outlined
              label="Email Address *"
              lazy-rules
              :rules="[lazyRules.required(), lazyRules.isEmail()]"
              hint="Receipts will be sent here"
            />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.email2.value"
              outlined
              label="Optional 2nd Email Address"
              lazy-rules
              :rules="[lazyRules.checkOnlyIfValue(validations.isEmail)]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input v-model="realForm.misc.value" outlined label="Misc" />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input v-model="realForm.misc2.value" outlined label="Misc 2" />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.displayAs.value"
              outlined
              label="Display Name *"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-input
              type="textarea"
              v-model="realForm.foods.value"
              outlined
              label="Please specify any special food needs"
              lazy-rules
              :rules="[lazyRules.maxCharacters(255)]"
              :hint="`${realForm.foods.value.length}/255 character limit`"
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
            <q-input v-model="realForm.salutation.value" outlined label="Salutation" lazy-rules />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-input
              type="textarea"
              v-model="realForm.notes.value"
              outlined
              label="Notes"
              lazy-rules
              :rules="[lazyRules.maxCharacters(255)]"
              :hint="`${realForm.notes.value.length}/255 character limit`"
            />
          </div>
        </div>
        <!-- TODO: alt options to edit -->
        <!-- <div class="row q-mt-md">
          <div class="col-12">
            <q-checkbox v-model="altAddress" label="Deliver My Basket to an Alternate Address" />
          </div>
        </div>

        <div v-if="altAddress">
          <div class="row q-mt-md">
            <div class="col-12 q-pl-sm q-pr-sm">
              <q-input
                v-model="altAddressForm.name.value"
                outlined
                label="Name *"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col-12 q-pl-sm q-pr-sm">
              <q-input
                v-model="altAddressForm.address.value"
                outlined
                label="Address *"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col-6 q-pl-sm q-pr-sm">
              <q-input v-model="altAddressForm.address2.value" outlined label="Address 2" />
            </div>
            <div class="col-6 q-pl-sm q-pr-sm">
              <q-input
                v-model="altAddressForm.city.value"
                outlined
                label="City *"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col-6 q-pl-sm q-pr-sm">
              <q-select
                v-model="altAddressForm.state.value"
                outlined
                :options="statesOptions"
                label="State *"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
            <div class="col-6 q-pl-sm q-pr-sm">
              <q-input
                v-model="altAddressForm.zip.value"
                outlined
                label="Zip Code *"
                mask="#####"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
          </div>
        </div> -->
        <!-- <div class="row q-mt-md">
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
        </div> -->
        <!-- <div class="row q-mt-md">
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
        </div> -->
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
        <!-- <q-btn
          class="q-mr-sm"
          label="SAVE AND ADD ANOTHER"
          @click="
            () => {
              reloadPage()
            }
          "
          :disable="!areValidForms()"
        /> -->
        <q-btn
          class="q-mr-sm"
          style="background: var(--happypurim); color: white"
          label="SAVE CHANGES"
          :disable="!areValidForms()"
          @click="onAddMember"
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
import { lazyRules, useForm, validations } from 'src/composables'
import { useMember } from 'src/modules/dashboard/composables/useMember'
import { statesOptions } from 'src/modules/dashboard/data'
import type { MemberAddFormInterface } from 'src/modules/dashboard/interfaces/member-interfaces'
import { useUI } from 'src/modules/UI/composables'
import { ref } from 'vue'

// interface CheckboxItemInterface {
//   value: boolean
//   label: string
//   id: number
// }

const {
  // reloadPage,
  isMobile,
} = useUI()

const { addMember_Co } = useMember()

// const altAddress = ref<boolean>(false)
const cancelOrderDialogFlag = ref<boolean>(false)

// const categories = ref<CheckboxItemInterface[]>([])
// const otherOptions = ref<CheckboxItemInterface[]>([
//   { id: 0, value: false, label: 'Reciprocity' },
//   { id: 1, value: false, label: 'Hidden' },
// ])
// const customOptions = ref<CheckboxItemInterface[]>([])

const { realForm, isValidForm, getFormValue } = useForm({
  title: { value: '', validations: [] },
  firstName: {
    value: '',
    validations: [validations.required],
  },
  lastName: {
    value: '',
    validations: [validations.required],
  },
  spouseTitle: { value: '', validations: [] },
  spouseFirstName: { value: '', validations: [] },
  spouseLastName: { value: '', validations: [] },
  address: { value: '', validations: [validations.required] },
  address2: { value: '', validations: [] },
  city: { value: '', validations: [validations.required] },
  state: { value: '', validations: [validations.required] },
  zip: {
    value: '',
    validations: [validations.required, validations.minCharacters(5), validations.maxCharacters(5)],
  },
  phone: { value: '', validations: [validations.required] },
  phone2: { value: '', validations: [] },
  email: { value: '', validations: [validations.required, validations.isEmail] },
  email2: { value: '', validations: [validations.isEmail] },
  misc: { value: '', validations: [] },
  misc2: { value: '', validations: [] },
  displayAs: { value: '', validations: [validations.required] },
  foods: { value: '', validations: [] },
  salutation: { value: '', validations: [] },
  notes: { value: '', validations: [] },
})
// const { realForm: altAddressForm, isValidForm: isValidAltAddressForm } = useForm({
//   name: { value: '', validations: [validations.required] },
//   address: { value: '', validations: [validations.required] },
//   address2: { value: '', validations: [] },
//   city: { value: '', validations: [validations.required] },
//   state: { value: '', validations: [validations.required] },
//   zip: {
//     value: '',
//     validations: [validations.required, validations.minCharacters(5), validations.maxCharacters(5)],
//   },
// })

const areValidForms = () => {
  return isValidForm()
  // && (!altAddress.value || (altAddress.value && isValidAltAddressForm()))
}

const onAddMember = () => {
  const data = getFormValue() as unknown as MemberAddFormInterface
  addMember_Co(data)
}
</script>

<style scoped lang="scss">
@import './AddMemberPage.scss';
</style>
