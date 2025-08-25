<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p v-if="!user">Add New User</p>
          <p v-else>Edit User</p>
        </div>
      </div>

      <div class="custom-dialog-body-container q-pa-lg" style="min-width: 50vw">
        <div v-if="user" class="row q-mb-sm justify-content-end">
          <q-btn
            color="primary"
            icon="history"
            label="set new password"
            @click="setPasswordFlag = true"
          />
        </div>
        <div class="row">
          <!--=============================== member left=============================-->
          <div class="q-pr-lg col-12">
            <div class="row q-mt-md">
              <div
                :class="{
                  'col-6': !isMobile,
                  'col-12': isMobile,
                }"
                class="q-pl-sm q-pr-sm"
              >
                <q-input
                  v-model="realForm.firstName.value"
                  outlined
                  label="First Name *"
                  lazy-rules
                  :rules="[lazyRules.required()]"
                />
              </div>
              <div
                :class="{
                  'col-6': !isMobile,
                  'col-12': isMobile,
                }"
                class="q-pl-sm q-pr-sm"
              >
                <q-input
                  v-model="realForm.lastName.value"
                  outlined
                  label="Last Name *"
                  lazy-rules
                  :rules="[lazyRules.required()]"
                />
              </div>
            </div>
            <div v-if="!user" class="row q-mt-md">
              <div
                :class="{
                  'col-6': !isMobile,
                  'col-12': isMobile,
                }"
                class="q-pl-sm q-pr-sm"
              >
                <q-input
                  v-model="realForm.login.value"
                  outlined
                  label="Login *"
                  lazy-rules
                  :rules="[lazyRules.required()]"
                />
              </div>
              <div
                v-if="!user"
                :class="{
                  'col-6': !isMobile,
                  'col-12': isMobile,
                }"
                class="q-pl-sm q-pr-sm"
              >
                <q-input
                  v-model="realForm.password.value"
                  outlined
                  :type="showPassword ? 'text' : 'password'"
                  lazy-rules
                  :rules="[
                    lazyRules.required(),
                    lazyRules.minCharacters(8),
                    lazyRules.isGoodPassword(),
                  ]"
                  label="Password *"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="showPassword ? 'visibility' : 'visibility_off'"
                      class="cursor-pointer"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row q-mt-md">
              <div
                :class="{
                  'col-6': !isMobile,
                  'col-12': isMobile,
                }"
                class="q-pl-sm q-pr-sm"
              >
                <q-input
                  v-model="realForm.email.value"
                  outlined
                  label="Email *"
                  lazy-rules
                  :rules="[lazyRules.required(), lazyRules.isEmail()]"
                />
              </div>
              <div
                :class="{
                  'col-6': !isMobile,
                  'col-12': isMobile,
                }"
                class="q-pl-sm q-pr-sm"
              >
                <q-input
                  v-model="realForm.phone.value"
                  outlined
                  label="Phone *"
                  mask="(###) - ### - ####"
                  lazy-rules
                  :rules="[
                    lazyRules.required(),
                    lazyRules.minCharacters(17, 'Invalid phone number'),
                  ]"
                />
              </div>
            </div>
            <div class="row q-mt-md">
              <div
                :class="{
                  'col-6': !isMobile,
                  'col-12': isMobile,
                }"
                class="q-pl-sm q-pr-sm"
              >
                <q-input
                  v-model="realForm.address1.value"
                  outlined
                  label="Address *"
                  lazy-rules
                  :rules="[lazyRules.required()]"
                />
              </div>
              <div
                :class="{
                  'col-6': !isMobile,
                  'col-12': isMobile,
                }"
                class="q-pl-sm q-pr-sm"
              >
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
                  popup-content-class="q-menu-300"
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
          </div>
          <!--=========================== END OF SECTION ===========================-->
          <!--=============================== member left=============================-->

          <!--=========================== END OF SECTION ===========================-->
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
          v-if="!user"
          @click="onAddUser"
          style="background: var(--happypurim); color: white"
          label="Add"
          class="q-mr-sm q-mt-sm"
          :disable="!isValidForm()"
        />

        <div v-else>
          <q-btn @click="onDeleteFlag = true" label="Delete" class="q-mr-sm q-mt-sm" />
          <q-btn
            @click="onSaveUser"
            style="background: var(--happypurim); color: white"
            label="Save"
            class="q-mr-sm q-mt-sm"
            :disable="!isValidForm()"
          />
        </div>
      </q-card-actions> </q-card
  ></q-dialog>

  <!-- set password dialog -->
  <q-dialog v-model="setPasswordFlag" persistent>
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Set New Password</p>
        </div>
      </div>

      <div class="custom-dialog-body-container q-pa-lg" style="min-width: 50vw">
        <div class="row">
          <!--=============================== member left=============================-->
          <div class="q-pr-lg col-12">
            <div class="row q-mt-md">
              <div class="q-pl-sm q-pr-sm col-12">
                <q-input
                  v-model="passwordForm.password.value"
                  outlined
                  :type="showPassword ? 'text' : 'password'"
                  lazy-rules
                  :rules="[
                    lazyRules.required(),
                    lazyRules.minCharacters(8),
                    lazyRules.isGoodPassword(),
                  ]"
                  label="Password *"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="showPassword ? 'visibility' : 'visibility_off'"
                      class="cursor-pointer"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </q-input>
              </div>
            </div>
          </div>
          <!--=========================== END OF SECTION ===========================-->
          <!--=============================== member left=============================-->

          <!--=========================== END OF SECTION ===========================-->
        </div>
      </div>

      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn
          outline
          label="Close"
          class="q-mr-sm q-mt-sm"
          style="color: #990000; border-color: #990000"
          @click="
            () => {
              setPasswordFlag = false
              resetPasswordForm()
            }
          "
        />
        <q-btn
          style="background: var(--happypurim); color: white"
          label="set password"
          class="q-mr-sm q-mt-sm"
          :disable="!isValidPasswordForm()"
          @click="onSetNewPassword"
        />
      </q-card-actions> </q-card
  ></q-dialog>

  <!-- alert before delete  -->
  <DialogAlert
    v-model="onDeleteFlag"
    @on-finish="onDeleteUser"
    cancel-btn-text="Cancel"
    ok-btn-text="Delete"
    msg="Are you sure you want to delete this user?"
  />
</template>

<script setup lang="ts">
import DialogAlert from 'src/components/DialogAlert/DialogAlert.vue'
import { lazyRules, useForm, validations } from 'src/composables'
import { useUserAdmin } from 'src/modules/dashboard/composables/useUserAdmin'
import { statesOptions } from 'src/modules/dashboard/data'
import type {
  AddUserFormInterface,
  AdminUserInterface,
  EditUserFormType,
} from 'src/modules/dashboard/interfaces/admin-user.interface'
import { useUI } from 'src/modules/UI/composables'
import { computed, ref, watch } from 'vue'

interface ScheduleSendPropsInterface {
  modelValue: boolean
  user?: AdminUserInterface | undefined
}

const $emit = defineEmits(['update:modelValue', 'onClose'])

const $props = defineProps<ScheduleSendPropsInterface>()

const show = computed({
  get: () => $props.modelValue,
  set: (val) => $emit('update:modelValue', val),
})

const setPasswordFlag = ref(false)

const { isMobile, showToast } = useUI()
const { addUser, editAdmin, setNewPassword, deleteUser } = useUserAdmin()

const showPassword = ref(false)

const { realForm, isValidForm, getFormValue, resetForm } = useForm({
  firstName: { value: '', validations: [validations.required] },
  lastName: { value: '', validations: [validations.required] },
  login: { value: '', validations: [validations.required] },
  email: { value: '', validations: [validations.required, validations.isEmail] },
  phone: { value: '', validations: [validations.required, validations.minNumberDigitOnly(10)] },
  address1: { value: '', validations: [validations.required] },
  city: { value: '', validations: [validations.required] },
  state: { value: '', validations: [validations.required] },
  zip: { value: '', validations: [validations.required] },
  password: {
    value: '',
    validations: [validations.required, validations.minCharacters(8), validations.isGoodPassword],
  },
})

const {
  realForm: passwordForm,
  isValidForm: isValidPasswordForm,
  resetForm: resetPasswordForm,
} = useForm({
  password: {
    value: '',
    validations: [validations.required, validations.minCharacters(8), validations.isGoodPassword],
  },
})

const onAddUser = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formData: any = getFormValue()

  const user: AddUserFormInterface = {
    isAdmin: true,
    active: true,
    ...formData,
  }
  const resp = await addUser(user)

  showToast(
    resp.ok,
    'User Added Successfully',
    `Something went wrong adding the user (${resp.msg})`,
  )
  if (resp.ok) {
    resetForm()
    $emit('update:modelValue', false)
  }
}

const onSaveUser = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formData: any = getFormValue()

  delete formData.password
  delete formData.login

  const data: EditUserFormType = {
    id: $props.user?.uId || 0,
    ...formData,
  }
  const resp = await editAdmin(data)
  if (resp) $emit('update:modelValue', false)
}

const onDeleteFlag = ref(false)

const onDeleteUser = async (value: boolean) => {
  if (!value || !$props.user) return
  await deleteUser($props.user.uId)
  $emit('update:modelValue', false)
}

const onSetNewPassword = async () => {
  await setNewPassword({
    userId: $props.user?.uId || 0,
    password: passwordForm.value.password.value,
  })
  setPasswordFlag.value = false
  resetPasswordForm()
}

watch(
  () => $props.user,
  (val: AdminUserInterface | undefined) => {
    if (!val) resetForm()
    else
      resetForm(
        {
          password: '@1Qqeqweqweqwe',
          ...val,
          login: 'default',
          address1: val.address,
        },
        {
          omitExtraFields: true,
          original: true,
        },
      )
  },
)
</script>

<style scoped lang="scss"></style>
