<template>
  <q-card>
    <div class="row dialog-header custom-dialog-header-container">
      <div class="col-12">
        <p>Email Member Login Code</p>
      </div>
    </div>
    <q-card-section class="row items-center">
      <div class="custom-dialog-body-container">
        <div class="row">
          <div class="col-12"><b> Email </b></div>
          <div class="col-12 q-mt-sm">Send an Email to this member with their login code.</div>
        </div>
        <div class="EmailLoginCodeDialog-container">
          <div class="row">
            <div class="col-12">
              <div class="row q-mt-lg q-mb-sm">
                <div class="col-6 q-pr-sm q-pl-sm">
                  <q-input
                    v-model="realForm.fromName.value"
                    outlined
                    label="From Name"
                    lazy-rules
                    :rules="[lazyRules.required()]"
                  />
                </div>
                <div class="col-6 q-pr-sm q-pl-sm">
                  <q-input
                    v-model="realForm.fromEmail.value"
                    outlined
                    label="From Email"
                    lazy-rules
                    :rules="[lazyRules.required(), lazyRules.isEmail()]"
                  />
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-6 q-pr-sm q-pl-sm">
                  <q-input
                    v-model="realForm.subject.value"
                    outlined
                    label="Subject"
                    lazy-rules
                    :rules="[lazyRules.required()]"
                  />
                </div>
                <div class="col-6 q-pr-sm q-pl-sm">
                  <q-input
                    v-model="realForm.toEmail.value"
                    outlined
                    label="To Email"
                    lazy-rules
                    :rules="[lazyRules.required()]"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <EditorCustom :attacher="attacherForEdit" v-model="emailContent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-actions class="custom-dialog-footer-container" align="right">
      <q-btn
        outline
        label="Cancel"
        class="q-mr-sm q-mt-sm"
        style="color: #990000; border-color: #990000"
        v-close-popup
      />
      <q-btn
        @click="sendEmail"
        class="q-mr-sm q-mt-sm"
        style="background: var(--happypurim); color: white"
        label="send email"
        v-close-popup
        :disable="!isValidForm()"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { lazyRules, useForm, validations } from 'src/composables'
import EditorCustom from 'src/components/EditorCustom/EditorCustom.vue'
import { onMounted, ref } from 'vue'
import { useMember } from 'src/modules/dashboard/composables/useMember'
import { useRoute } from 'vue-router'
import { useEmail } from 'src/modules/dashboard/composables/useEmail'
import type { EmailDataFormInterface } from 'src/modules/dashboard/interfaces/email-interfaces'

const { sendAEmail } = useEmail()

const {
  getEmailLoginCodeInfo_Co,
  memberState: {
    value: { selectedMember },
  },
} = useMember()
const $route = useRoute()

const attacherForEdit = ref([
  {
    name: 'code',
    label: 'Login Code',
    icon: 'code',
    value: `
  <b>${selectedMember?.loginCode}</b>
`,
  },
  {
    name: 'token-link',
    label: 'Sign On Link',
    icon: 'link',
    value: `
  <a href="${selectedMember?.signOnLink}" target="_blank">${selectedMember?.signOnLink}</a>
`,
  },
  {
    name: 'name',
    label: 'First and Last Name',
    icon: 'person',
    value: `
  <p >${selectedMember?.firstName} ${selectedMember?.lastName}</p>
`,
  },
  {
    name: 'nameSpouse',
    label: 'Spouse First and Last Name',
    icon: 'group',
    value: `
  <p >${selectedMember?.spouseFirstName} ${selectedMember?.spouseLastName}</p>
`,
  },
])

interface FormInterface {
  fromName: string
  fromEmail: string
  toEmail: string
  subject: string
}

const {
  realForm,
  resetForm,
  isValidForm: isValidRealForm,
  getFormValue,
} = useForm<FormInterface>({
  fromName: { value: '', validations: [validations.required] },
  fromEmail: { value: '', validations: [validations.required, validations.isEmail] },
  toEmail: { value: '', validations: [validations.required, validations.isEmail] },
  subject: { value: '', validations: [validations.required] },
})

const emailContent = ref<string>('')

onMounted(() => {
  const id = Number($route.params.memberId)
  getEmailLoginCodeInfo_Co(id).then((res) => {
    resetForm({
      fromName: res.fromName,
      fromEmail: res.fromEmail,
      subject: res.subject,
      toEmail: res.toEmail,
    })
    emailContent.value = res.body
  })
})

const isValidForm = () => {
  if (!emailContent.value) return false
  if (!isValidRealForm()) return false
  return true
}

const sendEmail = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formData = getFormValue() as any

  const data: EmailDataFormInterface = {
    bcc: [],
    isBodyHtml: true,
    encoding: 'utf-8',
    cc: [],
    replyTo: '',
    ...formData,
    body: emailContent.value,
  }

  await sendAEmail(data)
}
</script>

<style scoped lang="scss">
@import './EmailLoginCodeDialog';
</style>
