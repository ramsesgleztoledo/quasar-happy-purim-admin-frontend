<template>
  <div style="min-width: 50vw">
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>{{ !dontEdit ? 'Update' : '' }} Shipment Information</p>
        </div>
      </div>
      <q-card-section>
        <div class="row q-mb-lg q-pa-md">
          <div class="col-12">
            <div class="row q-mb-sm">
              <div class="col-12 q-pr-sm q-pl-sm">
                <q-input
                  :disable="dontEdit"
                  v-model="realForm.sendTo.value"
                  outlined
                  label="Send To"
                  lazy-rules
                  :rules="[lazyRules.required()]"
                />
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-6 q-pr-sm q-pl-sm">
                <q-input
                  :disable="dontEdit"
                  v-model="realForm.address.value"
                  outlined
                  label="Address"
                  lazy-rules
                  :rules="[lazyRules.required()]"
                />
              </div>
              <div class="col-6 q-pr-sm q-pl-sm">
                <q-input
                  :disable="dontEdit"
                  v-model="realForm.address2.value"
                  outlined
                  label="Address 2"
                  lazy-rules
                  :rules="[]"
                />
              </div>
            </div>
            <div class="row q-mb-sm">
              <div class="col-6 q-pr-sm q-pl-sm">
                <q-input
                  :disable="dontEdit"
                  v-model="realForm.city.value"
                  outlined
                  label="City"
                  lazy-rules
                  :rules="[lazyRules.required()]"
                />
              </div>
              <div class="col-6 q-pr-sm q-pl-sm">
                <q-select
                  :disable="dontEdit"
                  v-model="realForm.state.value"
                  outlined
                  :options="statesOptions"
                  label="State"
                  lazy-rules
                  :rules="[lazyRules.required()]"
                />
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-6 q-pr-sm q-pl-sm">
                <q-input
                  :disable="dontEdit"
                  v-model="realForm.zip.value"
                  outlined
                  label="Zip Code"
                  mask="#####"
                  lazy-rules
                  :rules="[lazyRules.required()]"
                />
              </div>
              <div class="col-6 q-pl-sm q-pr-sm">
                <q-input
                  :disable="dontEdit"
                  v-model="realForm.phone.value"
                  outlined
                  label="Phone"
                  mask="(###) - ### - ####"
                  lazy-rules
                  :rules="[]"
                />
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-6 q-pr-sm q-pl-sm">
                <q-input
                  :disable="dontEdit"
                  v-model="realForm.route.value"
                  outlined
                  label="Route"
                  lazy-rules
                  :rules="[]"
                />
              </div>
              <div class="col-6 q-pl-sm q-pr-sm">
                <q-input
                  :disable="dontEdit"
                  v-model="realForm.misc.value"
                  outlined
                  label="Misc"
                  lazy-rules
                  :rules="[]"
                />
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-12 q-pr-sm q-pl-sm">
                <q-input
                  :disable="dontEdit"
                  v-model="realForm.email.value"
                  outlined
                  label="Email"
                  lazy-rules
                  :rules="[lazyRules.isEmail()]"
                />
              </div>
            </div>
            <div class="row q-mt-md">
              <div class="col-12 q-pr-sm q-pl-sm">
                <q-input
                  :disable="dontEdit"
                  type="textarea"
                  v-model="realForm.message.value"
                  outlined
                  label="Message"
                  lazy-rules
                  :rules="[lazyRules.maxCharacters(255)]"
                  :hint="`${realForm.message.value.length}/255 character limit`"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions class="custom-dialog-footer-container" align="right">
        <q-btn
          outline
          label="CLOSE"
          class="q-mr-sm q-mt-sm"
          style="color: #990000; border-color: #990000"
          v-close-popup
        />
        <q-btn
          class="q-mr-sm q-mt-sm"
          style="background: var(--happypurim); color: white"
          :label="dontEdit ? 'EDIT' : 'SAVE'"
          @click="onUpdate"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import type { QDialog } from 'quasar'
import { lazyRules, useForm, validations } from 'src/composables'
import { useShipment } from 'src/modules/dashboard/composables/useShipment'
import { statesOptions } from 'src/modules/dashboard/data'
import type { BasketToBeShippedInterface } from 'src/modules/dashboard/interfaces/shipment-interfaces'
import { onMounted, ref } from 'vue'

const { UpdateBasketsToBeShipped } = useShipment()

const emit = defineEmits(['onValueUpdated'])

interface BasketToBeShippedComponentPropsInterface {
  dialogRef: QDialog | undefined
  basket: BasketToBeShippedInterface
}

const $props = defineProps<BasketToBeShippedComponentPropsInterface>()

const dontEdit = ref(true)

interface FormInterface {
  sendTo: string
  address: string
  address2: string
  city: string
  state: string
  zip: string
  message: string
  email: string
  phone: string
  route: string
  misc: string
}

const { realForm, getFormValue, resetForm } = useForm<FormInterface>({
  sendTo: { value: '', validations: [validations.required] },
  address: { value: '', validations: [validations.required] },
  address2: { value: '', validations: [] },
  city: { value: '', validations: [validations.required] },
  state: { value: '', validations: [validations.required] },
  zip: { value: '', validations: [validations.required] },
  message: { value: '', validations: [] },
  email: { value: '', validations: [validations.isEmail] },
  phone: { value: '', validations: [] },
  route: { value: '', validations: [] },
  misc: { value: '', validations: [] },
})

const onUpdate = () => {
  if (dontEdit.value) {
    dontEdit.value = false
    return
  }
  const refD = $props.dialogRef
  if (!refD) return

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any = {
    ...getFormValue(),
    shippingID: $props.basket.shippingID,
    shippingOptionID: $props.basket.shippingOptionID,
  }

  UpdateBasketsToBeShipped({
    ...value,
  })
    .then((result) => {
      if (result) emit('onValueUpdated', value)
    })
    .catch(console.error)
    .finally(() => {
      refD.hide()
    })
}

onMounted(() => {
  resetForm(
    { ...$props.basket },
    {
      omitExtraFields: true,
    },
  )
})
</script>

<style scoped lang="scss"></style>
