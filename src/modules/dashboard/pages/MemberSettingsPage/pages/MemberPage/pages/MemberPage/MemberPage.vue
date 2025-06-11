<template>
  <div v-if="isReady">
    <div class="row q-mb-lg">
      <PaginationCustom
        :total="memberState.members.length"
        :current="currentMemberPage"
        @page-change="onPageChange"
      />
    </div>

    <div class="q-mb-md">
      <div class="row">
        <!--=============================== if desktop =============================-->

        <div v-if="!isMobile" class="col-12 top-title-col">
          <p class="MemberPage-user-title">{{ (realForm.displayName as FormField).value }}</p>
          <div class="separator-right q-mr-sm q-ml-sm"></div>
          <p
            class="MemberPage-login-code"
            @click="copyToClipboard(memberState.selectedMember?.loginCode || '')"
          >
            Login Code:
            <b>{{ memberState.selectedMember?.loginCode }}</b>
          </p>
          <div class="separator-right q-mr-sm q-ml-sm"></div>
          <p
            class="MemberPage-login-code"
            @click="copyToClipboard(memberState.selectedMember?.signOnLink || '')"
          >
            SignOn Link:
            <b> {{ memberState.selectedMember?.signOnLink }}</b>
          </p>
        </div>
        <!--=========================== END OF SECTION ===========================-->
        <!--=============================== if mobile =============================-->
        <template v-else>
          <div
            class="col-12 MemberPage-user-title-col"
            style="display: flex; justify-content: space-between"
          >
            <p class="MemberPage-user-title">{{ (realForm.displayName as FormField).value }}</p>
            <q-btn-dropdown icon="edit" color="primary" label="Actions">
              <q-list>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-btn
                      icon="add"
                      outline
                      label="CREATE ORDER"
                      :to="{ name: 'MemberLayout-CreateOrderPage' }"
                      class="q-mr-sm q-mt-sm"
                    />
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-btn
                      icon="add"
                      outline
                      label="CREATE ORDER BY CODE"
                      :to="{ name: 'MemberLayout-CreateOrderPageByCode' }"
                      class="q-mr-sm q-mt-sm"
                    />
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-btn icon="close" outline label="CLEAR CART" class="q-mr-sm q-mt-sm" />
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-btn
                      icon="email"
                      class="q-mr-sm q-mt-sm"
                      style="background: var(--happypurim); color: white"
                      label="EMAIL LOGIN CODE"
                      @click="emailLoginCodeDialogFlag = true"
                    />
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-btn
                      icon="credit_card"
                      class="q-mr-sm q-mt-sm"
                      style="background: var(--happypurim); color: white"
                      label="RECORD PAYMENT"
                      @click="recordPaymentDialogFlag = true"
                    />
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-btn
                      icon="delete"
                      @click="deleteMemberDialogFlag = true"
                      outline
                      label="DELETE"
                      class="q-mr-sm q-mt-sm"
                      style="color: #990000; border-color: #990000"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <div class="col-12 q-mt-sm">
            <p
              class="MemberPage-login-code"
              @click="copyToClipboard(memberState.selectedMember?.loginCode || '')"
            >
              Login Code:
              <b> {{ memberState.selectedMember?.loginCode }}</b>
            </p>
          </div>
          <div class="row separator-bottom q-mt-sm"></div>
          <div class="col-12 q-mt-sm">
            <p
              class="MemberPage-login-code"
              @click="copyToClipboard(memberState.selectedMember?.signOnLink || '')"
            >
              SignOn Link:
              <b> {{ memberState.selectedMember?.signOnLink }}</b>
            </p>
          </div>
          <div class="row separator-bottom q-mt-sm"></div>
        </template>

        <!--=========================== END OF SECTION ===========================-->
      </div>
      <template v-if="!isMobile">
        <div
          class="row q-mt-md"
          :style="{
            justifyContent: 'space-between',
          }"
        >
          <div
            :style="{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              width: isMobile ? '100%' : '',
            }"
          >
            <q-btn
              icon="add"
              outline
              label="CREATE ORDER"
              :to="{ name: 'MemberLayout-CreateOrderPage' }"
              class="q-mr-sm q-mt-sm"
            />
            <q-btn
              outline
              icon="add"
              label="CREATE ORDER BY CODE"
              :to="{ name: 'MemberLayout-CreateOrderPageByCode' }"
              class="q-mr-sm q-mt-sm"
            />
            <q-btn outline icon="close" label="CLEAR CART" class="q-mr-sm q-mt-sm" />
            <q-btn
              icon="email"
              class="q-mr-sm q-mt-sm"
              style="background: var(--happypurim); color: white"
              label="EMAIL LOGIN CODE"
              @click="emailLoginCodeDialogFlag = true"
            />
            <q-btn
              icon="credit_card"
              class="q-mr-sm q-mt-sm"
              style="background: var(--happypurim); color: white"
              label="RECORD PAYMENT"
              @click="recordPaymentDialogFlag = true"
            />
          </div>
          <q-btn
            icon="delete"
            @click="deleteMemberDialogFlag = true"
            outline
            label="DELETE"
            class="q-mr-sm q-mt-sm"
            style="color: #990000; border-color: #990000"
          />
        </div>
      </template>
    </div>
    <div class="row separator-bottom"></div>

    <InfoAlert
      v-if="memberState.memberOptions.hidden"
      class="q-mt-md"
      type="error"
      text="This member is hidden, and does not show up on the order form."
    />
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
                v-model="(realForm.memberTitle as FormField).value as string"
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
                v-model="(realForm.firstName as FormField).value as string"
                outlined
                label="First Name *"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
            <div class="col-6 q-pl-sm q-pr-sm">
              <q-input
                v-model="(realForm.lastName as FormField).value as string"
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
                v-model="(realForm.spouseTitle as FormField).value as string"
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
                label="Address *"
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
                label="City *"
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
                label="State *"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
            <div class="col-6 q-pl-sm q-pr-sm">
              <q-input
                v-model="(realForm.zipCode as FormField).value as string"
                outlined
                label="Zip Code *"
                mask="#####"
                lazy-rules
                :rules="[
                  lazyRules.required(),
                  lazyRules.maxCharacters(5),
                  lazyRules.minCharacters(5),
                ]"
              />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col-6 q-pl-sm q-pr-sm">
              <q-input
                v-model="(realForm.phone as FormField).value as string"
                outlined
                label="Primary Telephone *"
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
                label="Email Address *"
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
              <q-input
                v-model="(realForm.misc as FormField).value as string"
                outlined
                label="Misc"
              />
            </div>
            <div class="col-6 q-pl-sm q-pr-sm">
              <q-input
                v-model="(realForm.misc2 as FormField).value as string"
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
                label="Salutation *"
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
                  label="Address *"
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
                  label="City *"
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
                  label="State *"
                  lazy-rules
                  :rules="[lazyRules.required()]"
                />
              </div>
              <div class="col-6 q-pl-sm q-pr-sm">
                <q-input
                  v-model="(realForm.zipCode as FormField).value as string"
                  outlined
                  label="Zip Code *"
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
                <label>Options</label>
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
                <label>Profile Questions</label>
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
            label="RESET"
            class="q-mr-sm"
            style="color: #990000; border-color: #990000"
            @click="() => resetForm(true)"
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
      <div class="col-12">
        <OrderHistoryTable />
      </div>
    </div>

    <!-- eslint-enable -->

    <!--=============================== Dialogs =============================-->
    <!--================= Record Payment ================-->
    <q-dialog v-model="recordPaymentDialogFlag" persistent>
      <RecordPaymentDialog />
    </q-dialog>
    <!--============== END OF SECTION =============-->
    <!--================= email logion code ================-->
    <q-dialog v-model="emailLoginCodeDialogFlag" persistent>
      <EmailLoginCodeDialog />
    </q-dialog>
    <!--============== END OF SECTION =============-->
    <!--* confirm delete --->
    <DialogAlert
      @on-finish="
        (value) => {
          if (value) deleteMember()
        }
      "
      msg="Are you sure you want to delete this member?"
      v-model="deleteMemberDialogFlag"
    />

    <!--=========================== END OF SECTION ===========================-->
  </div>
</template>

<script setup lang="ts">
import InfoAlert from 'src/components/InfoAlert/InfoAlert.vue'
import PaginationCustom from 'src/components/PaginationCustom/PaginationCustom.vue'
import DialogAlert from 'src/components/DialogAlert/DialogAlert.vue'
import OrderHistoryTable from '../../components/OrderHistoryTable/OrderHistoryTable.vue'
import RecordPaymentDialog from '../../components/RecordPaymentDialog/RecordPaymentDialog.vue'
import EmailLoginCodeDialog from '../../components/EmailLoginCodeDialog/EmailLoginCodeDialog.vue'
import type { FormField } from 'src/composables'
import { lazyRules, useForm, validations } from 'src/composables'
import { onMounted, ref } from 'vue'
import { useUI } from 'src/modules/UI/composables'
import { statesOptions } from 'src/modules/dashboard/data'
import { useMember } from 'src/modules/dashboard/composables/useMember'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $route = useRoute()
const $router = useRouter()
const $q = useQuasar()
const { copyToClipboard, isMobile } = useUI()
const { getMemberDataById, memberState, deleteMemberById } = useMember()

const currentMemberPage = ref<number>(1)
const isReady = ref<boolean>(false)

const altAddress = ref<boolean>(false)
const recordPaymentDialogFlag = ref<boolean>(false)
const emailLoginCodeDialogFlag = ref<boolean>(false)
const deleteMemberDialogFlag = ref<boolean>(false)

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

const { realForm, onFormReset } = useForm({
  memberTitle: { value: memberState.value.selectedMember?.title, validations: [] },
  firstName: {
    value: memberState.value.selectedMember?.firstName,
    validations: [validations.required],
  },
  lastName: {
    value: memberState.value.selectedMember?.lastName,
    validations: [validations.required],
  },
  spouseTitle: { value: '', validations: [] },
  spouseFirstName: { value: '', validations: [] },
  spouseLastName: { value: '', validations: [] },
  address: { value: '', validations: [validations.required] },
  address2: { value: '', validations: [] },
  city: { value: '', validations: [validations.required] },
  state: { value: '', validations: [validations.required] },
  zipCode: {
    value: '',
    validations: [validations.required, validations.minCharacters(5), validations.maxCharacters(5)],
  },
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

onMounted(() => {
  loadData()
})

const loadData = () => {
  loadInitialData()
    .catch(console.error)
    .finally(() => {
      setTimeout(() => {
        currentMemberPage.value =
          memberState.value.members.findIndex(
            (member) => member.m_id === Number($route.params.memberId),
          ) + 1
        isReady.value = true
      }, 500)
    })
}

const resetForm = (showNotify: boolean = false) => {
  onFormReset({
    memberTitle: memberState.value.selectedMember?.title,
    firstName: memberState.value.selectedMember?.firstName,
    lastName: memberState.value.selectedMember?.lastName,
    spouseTitle: memberState.value.selectedMember?.spouseTitle,
    spouseFirstName: memberState.value.selectedMember?.spouseFirstName,
    spouseLastName: memberState.value.selectedMember?.spouseLastName,
    address: memberState.value.selectedMember?.address,
    address2: memberState.value.selectedMember?.address2,
    city: memberState.value.selectedMember?.city,
    state: memberState.value.selectedMember?.state,
    zipCode: memberState.value.selectedMember?.zip,
    phone: memberState.value.selectedMember?.phone,
    phone2: memberState.value.selectedMember?.phone2,
    email: memberState.value.selectedMember?.email,
    email2: memberState.value.selectedMember?.email2,
    misc: memberState.value.selectedMember?.misc,
    misc2: memberState.value.selectedMember?.misc2,
    displayName: memberState.value.selectedMember?.displayAs,
    foods: memberState.value.selectedMember?.foods,
    salutation: memberState.value.selectedMember?.salutation,
    notes: memberState.value.selectedMember?.notes,
  })
  otherOptions.value = [{ value: memberState.value.memberOptions.hidden, label: 'Hidden' }]

  if (memberState.value.memberOptions.reciprocity.showReciprocity)
    otherOptions.value = [
      { value: memberState.value.memberOptions.reciprocity.isReciprocal, label: 'Reciprocity' },
      ...otherOptions.value,
    ]

  if (showNotify)
    $q.notify({
      color: 'blue',
      textColor: 'black',
      icon: 'error',
      message: 'Data reset',
    })
}

const loadInitialData = async () => {
  try {
    const memberId = $route.params.memberId
    await getMemberDataById(Number(memberId))
    resetForm()
  } catch (error) {
    return error
  }
}

const onPageChange = (page: number) => {
  const member = memberState.value.members[page - 1]

  $router.push({
    name: 'MemberLayout',
    params: {
      memberId: member?.m_id || 0,
    },
  })
  loadData()
}

const deleteMember = async () => {
  await deleteMemberById(Number($route.params.memberId))
  $router.push({ name: 'MembersSettingsPage' })
}
</script>

<style scoped lang="scss">
@import './MemberPage.scss';
</style>
