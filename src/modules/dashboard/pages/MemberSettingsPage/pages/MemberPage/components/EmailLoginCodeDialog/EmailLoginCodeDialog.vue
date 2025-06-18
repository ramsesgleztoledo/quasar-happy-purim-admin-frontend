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
                    v-model="(realForm.fromName as FormField).value as string"
                    outlined
                    label="From Name"
                    lazy-rules
                    :rules="[lazyRules.required()]"
                    disable
                  />
                </div>
                <div class="col-6 q-pr-sm q-pl-sm">
                  <q-input
                    v-model="(realForm.fromEmail as FormField).value as string"
                    outlined
                    label="From Email"
                    lazy-rules
                    :rules="[lazyRules.required(), lazyRules.isEmail()]"
                    disable
                  />
                </div>
              </div>
              <div class="row q-mb-sm">
                <div class="col-4 q-pr-sm q-pl-sm">
                  <q-input
                    v-model="(realForm.subject as FormField).value as string"
                    outlined
                    label="Subject"
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
import type { FormField } from 'src/composables'
import { lazyRules, useForm, validations } from 'src/composables'
import EditorCustom from 'src/components/EditorCustom/EditorCustom.vue'
import { onMounted, ref } from 'vue'
import { useMember } from 'src/modules/dashboard/composables/useMember'
import { useRoute } from 'vue-router'
const {
  getEmailLoginCodeInfo,
  memberState: {
    value: { selectedMember },
  },
} = useMember()
const $route = useRoute()

const attacherForEdit = ref([
  {
    name: 'code',
    label: 'code',
    icon: 'code',
    value: `
  <b>${selectedMember?.loginCode}</b>
`,
  },
  {
    name: 'token-link',
    label: 'token-link',
    icon: 'link',
    value: `
  <a href="${selectedMember?.signOnLink}" target="_blank">${selectedMember?.signOnLink}</a>
`,
  },
  {
    name: 'name',
    label: 'first and last name',
    icon: 'person',
    value: `
  <p >${selectedMember?.firstName} ${selectedMember?.lastName}</p>
`,
  },
  {
    name: 'nameSpouse',
    label: 'Spouse first and last name',
    icon: 'person',
    value: `
  <p >${selectedMember?.spouseFirstName} ${selectedMember?.spouseLastName}</p>
`,
  },
])

interface FormInterface {
  fromName: FormField<string>
  fromEmail: FormField<string>
  toEmail: FormField<string>
  subject: FormField<string>
}

const {
  realForm,
  resetForm,
  isValidForm: isValidRealForm,
} = useForm<FormInterface>({
  fromName: { value: '', validations: [validations.required] },
  fromEmail: { value: '', validations: [validations.required, validations.isEmail] },
  toEmail: { value: '', validations: [validations.required, validations.isEmail] },
  subject: { value: '', validations: [validations.required] },
})

const emailContent = ref<string>('')

onMounted(() => {
  const id = Number($route.params.memberId)
  getEmailLoginCodeInfo(id).then((res) => {
    resetForm({
      fromName: res.fromName,
      fromEmail: res.fromEmail,
      subject: res.subject,
      toEmail: `ramsesgleztoledo@gmail.com`,
    })
    emailContent.value = res.body
  })
})

const isValidForm = () => {
  if (!emailContent.value) return false
  if (!isValidRealForm()) return false
  return true
}
</script>

<style scoped lang="scss">
@import './EmailLoginCodeDialog';
</style>
