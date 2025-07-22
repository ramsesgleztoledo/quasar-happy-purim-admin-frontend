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
            <q-input v-model="realForm.title.value" outlined label="Title" />
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
            <q-input v-model="realForm.spouse.value" outlined label="Spouse First Name" />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input v-model="realForm.secondLastName.value" outlined label="Spouse Last Name" />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.displayName.value"
              outlined
              label="Display Name *"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
        </div>
        <!-- <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input v-model="realForm.spouseFirstName.value" outlined label="Spouse First Name" />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input v-model="realForm.spouseLastName.value" outlined label="Spouse Last Name" />
          </div>
        </div> -->
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-input v-model="realForm.address1.value" outlined label="Address" />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input v-model="realForm.address2.value" outlined label="Address 2" />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input v-model="realForm.city.value" outlined label="City" />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-select
              v-model="realForm.state.value"
              outlined
              :options="statesOptions"
              label="State"
            />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input v-model="realForm.zip.value" outlined label="Zip Code" mask="#####" />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.phone.value"
              outlined
              label="Primary Telephone"
              mask="(###) - ### - ####"
              lazy-rules
              :rules="[lazyRules.minCharacters(18), lazyRules.maxCharacters(18)]"
            />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.phone2.value"
              outlined
              label="Optional 2nd Telephone"
              mask="(###) - ### - ####"
              lazy-rules
              :rules="[lazyRules.minCharacters(18), lazyRules.maxCharacters(18)]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.email.value"
              outlined
              label="Email Address"
              lazy-rules
              :rules="[lazyRules.isEmail()]"
              hint="Receipts will be sent here"
            />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.email2.value"
              outlined
              label="Optional 2nd Email Address"
              lazy-rules
              :rules="[lazyRules.isEmail()]"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.misc.value"
              outlined
              label="Misc *"
              @keypress="onlyDigits"
              lazy-rules
              :rules="[lazyRules.required()]"
            />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input
              v-model="realForm.misc2.value"
              outlined
              label="Misc 2"
              @keypress="onlyDigits"
            />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-input v-model="realForm.route.value" outlined label="Route Code" />
          </div>
          <div class="col-6 q-pl-sm q-pr-sm">
            <q-checkbox v-model="realForm.hidden.value" label="Hide this member" />
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-input type="textarea" v-model="realForm.children.value" outlined label="Children" />
          </div>
          <!-- lazy-rules
            :rules="[lazyRules.required(), lazyRules.maxCharacters(255)]"
            :hint="`${realForm.children.value.length}/255 character limit`" -->
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
            <q-input v-model="realForm.salutation.value" outlined label="Salutation" />
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-input type="textarea" v-model="realForm.notes.value" outlined label="Notes" />
            <!-- lazy-rules
              :rules="[lazyRules.required(), lazyRules.maxCharacters(255)]"
              :hint="`${realForm.notes.value.length}/255 character limit`" -->
          </div>
        </div>
        <div class="row q-mt-md">
          <div class="col-12 q-pl-sm q-pr-sm">
            <q-select
              v-model="categories"
              multiple
              :options="$dStores.$state.categories"
              label="Categories"
              outlined
              option-label="categoryName"
              option-value="categoryID"
              clearable
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
          :disable="!areValidForms()"
          class="q-mr-sm"
          style="background: var(--happypurim); color: white"
          label="SAVE MEMBER"
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
    @on-finish="
      (value) => {
        if (value) $router.push({ name: 'MembersSettingsPage' })
      }
    "
    msg="Are you sure you want to cancel this member creation?"
    v-model="cancelOrderDialogFlag"
  />

  <!--=========================== END OF SECTION ===========================-->
</template>

<script setup lang="ts">
import DialogAlert from 'src/components/DialogAlert/DialogAlert.vue'
import { lazyRules, useForm, validations } from 'src/composables'
import { onlyDigits } from 'src/helpers/onlyDigits'
import { useMember } from 'src/modules/dashboard/composables/useMember'
import { statesOptions } from 'src/modules/dashboard/data'
import type { ShulCategoryInterface } from 'src/modules/dashboard/interfaces/category-interfaces'
import type { MemberAddFormInterface } from 'src/modules/dashboard/interfaces/member-interfaces'
import { useDashboardStore } from 'src/modules/dashboard/store/dashboardStore/dashboardStore'
import { useUI } from 'src/modules/UI/composables'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// interface CheckboxItemInterface {
//   value: boolean
//   label: string
//   id: number
// }

const $router = useRouter()

const {
  // reloadPage,
  isMobile,
} = useUI()

const { addMember_Co } = useMember()
const $dStores = useDashboardStore()

// const altAddress = ref<boolean>(false)
const cancelOrderDialogFlag = ref<boolean>(false)

const categories = ref<ShulCategoryInterface[]>([])

// const categories = ref<CheckboxItemInterface[]>([])
// const otherOptions = ref<CheckboxItemInterface[]>([
//   { id: 0, value: false, label: 'Reciprocity' },
//   { id: 1, value: false, label: 'Hidden' },
// ])
// const customOptions = ref<CheckboxItemInterface[]>([])

interface CreateMemberFormInterface {
  lastName: string
  firstName: string
  spouse: string
  title: string
  displayName: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  phone: string
  email: string
  email2: string
  children: string
  route: string
  misc: string
  hidden: boolean
  notes: string
  secondLastName: string
  misc2: string
  salutation: string
  phone2: string
}

const { realForm, isValidForm, getFormValue, resetForm } = useForm<CreateMemberFormInterface>({
  lastName: { value: '', required: true },
  firstName: { value: '', required: true },
  misc: { value: '', required: true },
  displayName: { value: '', required: true },
  spouse: { value: '', validations: [] },
  title: { value: '', validations: [] },
  address1: { value: '', validations: [] },
  address2: { value: '', validations: [] },
  city: { value: '', validations: [] },
  state: { value: '', validations: [] },
  zip: { value: '', validations: [] },
  phone: {
    value: '',
    validations: [validations.minCharacters(18), validations.minCharacters(18)],
  },
  email: { value: '', validations: [validations.isEmail] },
  email2: { value: '', validations: [validations.isEmail] },
  children: { value: '', validations: [] },
  route: { value: '', validations: [] },

  hidden: { value: false, type: 'boolean', validations: [] },
  notes: { value: '', validations: [] },
  secondLastName: { value: '', validations: [] },
  misc2: { value: '', validations: [] },
  salutation: { value: '', validations: [] },
  phone2: {
    value: '',
    validations: [validations.minCharacters(18), validations.minCharacters(18)],
  },
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

const onAddMember = async () => {
  const data = {
    ...getFormValue(),
    categoryIds: categories.value.map((ca) => ca.categoryID),
  } as unknown as MemberAddFormInterface

  const resp = await addMember_Co(data)
  if (resp) resetForm()
}
</script>

<style scoped lang="scss" src="./AddMemberPage.scss"></style>
