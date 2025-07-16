<template>
  <template v-if="isReady">
    <div class="row q-mb-lg">
      <PaginationCustom
        ref="paginationCustomRef"
        :total="memberState.members.length"
        :current="currentMemberPage"
        @page-change="onPageChange"
      />
    </div>
    <InfoAlert
      v-if="memberState.isPendingDeletion"
      class="q-mb-md q-mt-md"
      type="error"
      text="This member is pending for deletion"
    />

    <div class="q-mb-md">
      <div class="row">
        <!--=============================== if desktop =============================-->

        <div v-if="!isMobile" class="col-12 top-title-col">
          <p class="MemberPage-user-title">{{ memberState.selectedMember?.displayAs }}</p>
          <div class="separator-right q-mr-sm q-ml-sm"></div>
          <p
            class="MemberPage-login-code"
            @click="copyToClipboard(memberState.selectedMember?.loginCode || '')"
          >
            Login Code:
            <b>{{ memberState.selectedMember?.loginCode }}</b> <q-icon name="copy_all" />
          </p>
          <div class="separator-right q-mr-sm q-ml-sm"></div>
          <p
            class="MemberPage-login-code"
            @click="copyToClipboard(memberState.selectedMember?.signOnLink || '')"
          >
            SignOn Link:
            <b> {{ memberState.selectedMember?.signOnLink }}</b> <q-icon name="copy_all" />
          </p>
        </div>
        <!--=========================== END OF SECTION ===========================-->
        <!--=============================== if mobile =============================-->
        <template v-else>
          <div
            class="col-12 MemberPage-user-title-col"
            style="display: flex; justify-content: space-between"
          >
            <p class="MemberPage-user-title">{{ memberState.selectedMember?.displayAs }}</p>
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
                <q-item clickable v-close-popup v-if="dashboardState.showCreateOrderByCode">
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
                    <q-btn
                      icon="close"
                      outline
                      label="CLEAR CART"
                      class="q-mr-sm q-mt-sm"
                      @click="clearCartMemberDialogFlag = true"
                    />
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <q-btn
                      icon="restart_alt"
                      class="q-mr-sm q-mt-sm"
                      style="background: var(--happypurim); color: white"
                      label="Reset Login Code"
                      @click="onResetLoginCode"
                    />
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
                      :icon="`${memberState.isPendingDeletion ? 'close' : 'delete'}`"
                      @click="deleteMemberDialogFlag = true"
                      outline
                      :label="`${memberState.isPendingDeletion ? 'Remove delete flag' : 'DELETE'}`"
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
              <b> {{ memberState.selectedMember?.loginCode }}</b> <q-icon name="copy_all" />
            </p>
          </div>
          <div class="row separator-bottom q-mt-sm"></div>
          <div class="col-12 q-mt-sm">
            <p
              class="MemberPage-login-code"
              @click="copyToClipboard(memberState.selectedMember?.signOnLink || '')"
            >
              SignOn Link:
              <b> {{ memberState.selectedMember?.signOnLink }}</b> <q-icon name="copy_all" />
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
              v-if="dashboardState.showCreateOrderByCode"
              outline
              icon="add"
              label="CREATE ORDER BY CODE"
              :to="{ name: 'MemberLayout-CreateOrderPageByCode' }"
              class="q-mr-sm q-mt-sm"
            />
            <q-btn
              outline
              icon="close"
              label="CLEAR CART"
              class="q-mr-sm q-mt-sm"
              @click="clearCartMemberDialogFlag = true"
            />
            <q-btn
              icon="restart_alt"
              class="q-mr-sm q-mt-sm"
              style="background: var(--happypurim); color: white"
              label="Reset Login Code"
              @click="onResetLoginCode"
            />
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
            :icon="`${memberState.isPendingDeletion ? 'close' : 'delete'}`"
            @click="deleteMemberDialogFlag = true"
            outline
            :label="`${memberState.isPendingDeletion ? 'Remove delete flag' : 'DELETE'}`"
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
              <q-input
                v-model="realForm.spouseFirstName.value"
                outlined
                label="Spouse First Name"
              />
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
                label="Address *"
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
                label="City *"
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
                label="State *"
                lazy-rules
                :rules="[lazyRules.required()]"
              />
            </div>
            <div class="col-6 q-pl-sm q-pr-sm">
              <q-input
                v-model="realForm.zip.value"
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
                v-model="realForm.route.value"
                outlined
                label="Route *"
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
              <q-input
                v-model="realForm.salutation.value"
                outlined
                label="Salutation"
                lazy-rules
                :rules="[]"
              />
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

          <div class="q-pa-sm" v-if="memberState.memberAlternativeAddress?.showAlternateDelivery">
            <div class="border-container row q-mt-md">
              <div class="col-12">
                <div class="row q-mt-md">
                  <div class="col-12">
                    <q-checkbox
                      v-model="altAddress"
                      label="Deliver My Basket to an Alternate Address"
                    />
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
                      <q-input
                        v-model="altAddressForm.address2.value"
                        outlined
                        label="Address 2"
                      />
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
                </div>
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
                  <div v-for="(item, index) in options" :key="index" class="row q-mb-sm">
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
              v-if="profileQuestions.length"
            >
              <div class="border-container">
                <label>Profile Questions</label>
                <div class="q-mt-md">
                  <div v-for="(item, index) in profileQuestions" :key="index" class="row q-mb-sm">
                    <q-checkbox v-model="item.value" :label="item.label" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!!memberState.memberDonateBasketOption?.visible" class="row q-mt-md">
            <div
              class="q-pl-sm q-pr-sm q-mb-md"
              :class="{
                'col-6': !isMobile,
                'col-12': isMobile,
              }"
            >
              <div v-if="otherOptions.length" class="border-container">
                <label>Other Options</label>
                <div class="q-mt-md">
                  <div v-for="(item, index) in otherOptions" :key="index" class="row q-mb-sm">
                    <q-checkbox v-model="item.value" :label="item.label" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="categories.length" class="row q-mt-md">
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
            @click="() => resetAllForm(true)"
          />
          <q-btn
            class="q-mr-sm"
            style="background: var(--happypurim); color: white"
            label="SAVE CHANGES"
            @click="
              () => {
                onUpdateMember()
              }
            "
            :disable="!areValidForms()"
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
          if (value) setDeleteMember()
        }
      "
      :msg="`Are you sure you want to ${memberState.isPendingDeletion ? 'Remove delete flag for' : 'delete'} this member?`"
      v-model="deleteMemberDialogFlag"
    />
    <!--* confirm cart clear --->
    <DialogAlert
      @on-finish="
        (value) => {
          if (value) clearMemberCart_Co(memberState.selectedMember?.memberId!)
        }
      "
      :msg="`Are you sure you want to clear the cart for this member?`"
      v-model="clearCartMemberDialogFlag"
    />

    <!--=========================== END OF SECTION ===========================-->
  </template>
</template>

<script setup lang="ts">
import InfoAlert from 'src/components/InfoAlert/InfoAlert.vue'
import PaginationCustom from 'src/components/PaginationCustom/PaginationCustom.vue'
import DialogAlert from 'src/components/DialogAlert/DialogAlert.vue'
import OrderHistoryTable from '../../components/OrderHistoryTable/OrderHistoryTable.vue'
import RecordPaymentDialog from '../../components/RecordPaymentDialog/RecordPaymentDialog.vue'
import EmailLoginCodeDialog from '../../components/EmailLoginCodeDialog/EmailLoginCodeDialog.vue'
import { lazyRules, useForm, validations } from 'src/composables'
import { ref, watch } from 'vue'
import { useUI } from 'src/modules/UI/composables'
import { statesOptions } from 'src/modules/dashboard/data'
import { useMember } from 'src/modules/dashboard/composables/useMember'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import type {
  AlternativeMemberAddressFormInterface,
  MemberUpdateAllDataForm,
  MemberUpdateFormInterface,
} from 'src/modules/dashboard/interfaces/member-interfaces'
import { useDashboard } from 'src/modules/dashboard/composables/useDashboard'

interface CheckboxItemInterface {
  value: boolean
  label: string
  id: number
}

const $route = useRoute()
const $router = useRouter()
const $q = useQuasar()
const { dashboardState } = useDashboard()
const { copyToClipboard, isMobile } = useUI()
const {
  memberState,
  deleteMemberById_Co,
  updateMember_Co,
  clearMemberCart_Co,
  resetMemberLoginCode_Co,
} = useMember()

const currentMemberPage = ref<number>(1)
const paginationCustomRef = ref()
const isReady = ref<boolean>(false)
const altAddress = ref<boolean>(false)

// const altAddress = ref<boolean>(false)
const recordPaymentDialogFlag = ref<boolean>(false)
const emailLoginCodeDialogFlag = ref<boolean>(false)
const deleteMemberDialogFlag = ref<boolean>(false)
const clearCartMemberDialogFlag = ref<boolean>(false)

const categories = ref<CheckboxItemInterface[]>([])

const options = ref<CheckboxItemInterface[]>([])
const otherOptions = ref<CheckboxItemInterface[]>([])

const profileQuestions = ref<CheckboxItemInterface[]>([])

const { realForm, resetForm, getFormValue, isValidForm } = useForm({
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
  email: { value: '', validations: [validations.isEmail] },
  email2: { value: '', validations: [] },
  misc: { value: '', validations: [] },
  misc2: { value: '', validations: [] },
  displayAs: { value: '', validations: [validations.required] },
  foods: { value: '', validations: [] },
  salutation: { value: '', validations: [] },
  notes: { value: '', validations: [] },
  route: { value: '', validations: [validations.required] },
})
const {
  realForm: altAddressForm,
  isValidForm: isValidAltAddressForm,
  getFormValue: getAltAddressFormValue,
  resetForm: altAddressResetForm,
} = useForm({
  name: { value: '', validations: [validations.required] },
  address: { value: '', validations: [validations.required] },
  address2: { value: '', validations: [] },
  city: { value: '', validations: [validations.required] },
  state: { value: '', validations: [validations.required] },
  zip: {
    value: '',
    validations: [validations.required, validations.minCharacters(5), validations.maxCharacters(5)],
  },
})

const areValidForms = () => {
  return isValidForm() && (!altAddress.value || (altAddress.value && isValidAltAddressForm()))
}

const onPageChange = (page: number) => {
  const member = memberState.value.members[page - 1]

  const routeId = $route.params.memberId
  const memberId = (member?.m_id || 0).toString()

  if (routeId != memberId)
    $router.push({
      name: 'MemberLayout',
      params: {
        memberId: member?.m_id || 0,
      },
    })
}

const loadPage = () => {
  isReady.value = false
  currentMemberPage.value =
    memberState.value.members.findIndex(
      (member) => member.m_id === Number($route.params.memberId),
    ) + 1
  if (currentMemberPage.value === 0) return

  onPageChange(currentMemberPage.value)
  isReady.value = true
}

const resetAllForm = (showNotify: boolean = false) => {
  //main form
  resetForm({
    title: memberState.value.selectedMember?.title,
    firstName: memberState.value.selectedMember?.firstName,
    lastName: memberState.value.selectedMember?.lastName,
    spouseTitle: memberState.value.selectedMember?.spouseTitle,
    spouseFirstName: memberState.value.selectedMember?.spouseFirstName,
    spouseLastName: memberState.value.selectedMember?.spouseLastName,
    address: memberState.value.selectedMember?.address,
    address2: memberState.value.selectedMember?.address2,
    city: memberState.value.selectedMember?.city,
    state: memberState.value.selectedMember?.state,
    zip: memberState.value.selectedMember?.zip,
    phone: memberState.value.selectedMember?.phone,
    phone2: memberState.value.selectedMember?.phone2,
    email: memberState.value.selectedMember?.email,
    email2: memberState.value.selectedMember?.email2,
    misc: memberState.value.selectedMember?.misc,
    misc2: memberState.value.selectedMember?.misc2,
    displayAs: memberState.value.selectedMember?.displayAs,
    foods: memberState.value.selectedMember?.foods,
    salutation: memberState.value.selectedMember?.salutation,
    notes: memberState.value.selectedMember?.notes,
    route: memberState.value.selectedMember?.route,
  })

  altAddress.value = !!memberState.value.memberAlternativeAddress?.isChecked

  altAddressResetForm({
    address: memberState.value.memberAlternativeAddress?.altAddress1,
    name: memberState.value.memberAlternativeAddress?.altName,
    address2: memberState.value.memberAlternativeAddress?.altAddress2,
    city: memberState.value.memberAlternativeAddress?.altCity,
    state: memberState.value.memberAlternativeAddress?.altState,
    zip: memberState.value.memberAlternativeAddress?.altZip,
  })

  // options
  options.value = [{ id: 0, value: !!memberState.value.memberOptions.hidden, label: 'Hidden' }]

  if (memberState.value.memberOptions.reciprocity.showReciprocity)
    options.value = [
      ...options.value,
      {
        id: 1,
        value: memberState.value.memberOptions.reciprocity.isReciprocal,
        label: 'Reciprocity',
      },
    ]

  //categories
  categories.value = memberState.value.memberCategories.map((cat) => ({
    id: cat.categoryId,
    value: cat.selected,
    label: cat.categoryName,
  }))

  profileQuestions.value = memberState.value.profileQuestions.map((proQ) => ({
    id: proQ.optionId,
    value: proQ.isChecked,
    label: proQ.optionName,
  }))

  if (memberState.value.memberDonateBasketOption?.visible)
    otherOptions.value = [
      {
        id: 0,
        value: !!memberState.value.memberDonateBasketOption.checked,
        label: memberState.value.memberDonateBasketOption.text || '',
      },
    ]

  if (showNotify)
    $q.notify({
      color: 'blue',
      textColor: 'black',
      icon: 'error',
      message: 'Data reset',
    })
}

const setDeleteMember = async () => {
  await deleteMemberById_Co(Number($route.params.memberId))
}

const onUpdateMember = async () => {
  const id = Number($route.params.memberId)

  const memberData = {
    ...getFormValue(),
    category: categories.value.filter((cat) => cat.value).map((cat) => cat.id),
  }
  const altAddressData = {
    ...getAltAddressFormValue(),
    useAlternateDelivery: altAddress.value,
  }

  const data: MemberUpdateAllDataForm = {
    hidden: !!options.value[0]?.value,
    reciprocity: !!options.value[1]?.value,
    memberData: memberData as unknown as MemberUpdateFormInterface,
    donate: otherOptions.value.length ? otherOptions.value[0]!.value : undefined,
    profileQuestions: profileQuestions.value,
    altAddressData: altAddressData as unknown as AlternativeMemberAddressFormInterface,
  }

  await updateMember_Co(id, data)
}

const onResetLoginCode = () => {
  const id = memberState.value.selectedMember?.memberId
  if (id) resetMemberLoginCode_Co(id)
}

watch(
  () => [memberState.value.selectedMember, memberState.value.members],
  () => {
    resetAllForm()
    loadPage()
  },
  { immediate: true },
)
</script>

<style scoped lang="scss">
@import './MemberPage.scss';
</style>
