<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-6 q-pl-sm q-pr-sm">
        <q-input
          v-model="realForm.recipient.value"
          outlined
          label="Recipient *"
          lazy-rules
          :rules="[lazyRules.required()]"
        />
      </div>
      <div class="col-6 q-pl-sm q-pr-sm">
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
          :rules="[lazyRules.required()]"
        />
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-6 q-pl-sm q-pr-sm">
        <q-input
          v-model="realForm.phoneNumber.value"
          outlined
          label="Phone *"
          mask="(###) - ### - ####"
          lazy-rules
          :rules="[lazyRules.required(), lazyRules.minCharacters(18, 'Invalid phone number')]"
        />
      </div>
      <div class="col-6 q-pl-sm q-pr-sm">
        <q-input
          v-model="realForm.email.value"
          outlined
          label="Email Address *"
          lazy-rules
          :rules="[lazyRules.required(), lazyRules.isEmail()]"
        />
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-12 q-pl-sm q-pr-sm">
        <q-input
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

    <div class="row q-mt-md basket-img-row-container">
      <div
        :class="{
          'col-4': !isMobile,
          'col-6': isMobile,
          'selected-basket-img-container': item.id === customShippingSelected?.id,
        }"
        class="q-pa-sm q-mb-sm basket-img-container q-item-bordered"
        v-for="(item, i) in memberOrderState.customShippingOptions"
        :key="i"
        style=""
        @click="customShippingSelected = item"
      >
        <BasketImg :item="item" />
      </div>
    </div>

    <div
      v-if="customShippingSelectedAttributes && customShippingSelectedAttributes.length"
      class="row q-mt-md"
    >
      <div class="col-12">
        <div class="row CustomShippingBasket-personalization">Basket Personalization</div>
        <q-separator />
        <div
          class="row"
          v-for="(attribute, index) in customShippingSelectedAttributes"
          :key="attribute.id"
        >
          <div
            :class="{
              'col-6': !isMobile,
              'col-12': isMobile,
            }"
          >
            <div class="row q-pa-sm CustomShippingBasket-text">
              {{ index + 1 }}: {{ attribute.name }}
            </div>
            <div class="row q-pa-sm">
              <q-checkbox v-model="attribute.selected" :label="attribute.description" />
            </div>
            <div class="row q-pa-sm CustomShippingBasket-text">
              {{ attribute.promptText }}
            </div>
            <div class="row q-pa-sm">
              <div class="col-12">
                <q-input
                  v-model="attribute.value"
                  :type="attribute.type"
                  outlined
                  lazy-rules
                  label="enter value"
                  :rules="[lazyRules.required()]"
                  :disable="!attribute.selected"
                />
              </div>
            </div>
          </div>
          <div
            class="col-6 q-pa-sm"
            :class="{
              'col-6': !isMobile,
              'col-12': isMobile,
            }"
          >
            <img :src="attribute.imageURL" alt="" style="width: 100%; height: 100%" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="!prop_customsShippingItem" class="row q-mt-md">
      <div class="col-12 d-flex justify-content-end">
        <q-btn
          :disable="isInvalid"
          color="primary"
          icon="check"
          label="ADD TO ORDER"
          @click="onAddCustomShippingOption"
        />
      </div>
    </div>
  </div>
  <q-card-actions
    v-if="prop_customsShippingItem"
    class="custom-dialog-footer-container"
    align="right"
    style="width: 100%"
  >
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
      label="Save"
      v-close-popup
      :disable="isInvalid"
      @click="onAddCustomShippingOption"
    />
  </q-card-actions>
</template>

<script setup lang="ts">
import { lazyRules, useForm, validations } from 'src/composables'
import { statesOptions } from 'src/modules/dashboard/data'
import BasketImg from '../BasketImg/BasketImg.vue'
import { useUI } from 'src/modules/UI/composables'
import { useMemberOrder } from 'src/modules/dashboard/composables/useMemberOrder'
import { computed, onMounted, ref, watch } from 'vue'
import type {
  CustomShippingItemInterface,
  UpdateShippingItemFormInterface,
} from '../../../../../../../../../../interfaces/memberOrder-interfaces'
import type {
  CustomShippingItemFormInterface,
  CustomShippingOptionAttributeType,
  CustomShippingOptionInterface,
} from 'src/modules/dashboard/interfaces/memberOrder-interfaces'

interface CustomShippingBasketPropsInterface {
  prop_customsShippingItem?: CustomShippingItemInterface | undefined
}

const $props = defineProps<CustomShippingBasketPropsInterface>()

const { isMobile } = useUI()

const {
  memberOrderState,
  getAttributesByCustomShippingOptionId,
  addCustomShippingItem,
  updateCustomShippingItem,
} = useMemberOrder()

const customShippingSelected = ref<CustomShippingOptionInterface | undefined>(undefined)

const customShippingSelectedAttributes = ref<CustomShippingOptionAttributeType[]>([])

const { realForm, isValidForm, getFormValue, resetForm } = useForm({
  recipient: { value: '', validations: [validations.required] },
  address: { value: '', validations: [validations.required] },
  address2: { value: '', validations: [] },
  city: { value: '', validations: [validations.required] },
  state: { value: '', validations: [validations.required] },
  zip: { value: '', validations: [validations.required] },
  phoneNumber: { value: '', validations: [validations.required] },
  email: { value: '', validations: [validations.isEmail] },
  message: { value: '', validations: [] },
})

const isInvalid = computed(() => {
  if (
    !isValidForm() ||
    (!customShippingSelected.value && memberOrderState.value.customShippingOptions.length)
  )
    return true

  if (customShippingSelectedAttributes.value.length) {
    const atts = customShippingSelectedAttributes.value

    for (let i = 0; i < atts.length; i++) {
      const att = atts[i]!

      const isNull = att.value === '' || att.value === undefined || att.value === null

      if (att.required && (!att.selected || isNull)) return true

      if (att.selected && isNull) return true
    }
  }
  return false
})

const onAddCustomShippingOption = async () => {
  const formData = getFormValue()

  const data: CustomShippingItemFormInterface = {
    ...formData,
    shippingOptionId: customShippingSelected.value?.id || undefined,
    glutenFree: false,
    attributes: !customShippingSelectedAttributes.value
      ? ''
      : JSON.stringify(customShippingSelectedAttributes.value),
  } as unknown as CustomShippingItemFormInterface

  const id = $props.prop_customsShippingItem?.shippingItemId || undefined
  if (!id) {
    await addCustomShippingItem(data)
    resetForm()
    customShippingSelected.value = undefined
    customShippingSelectedAttributes.value = []
  } else {
    const edit = {
      ...$props.prop_customsShippingItem,
      ...data,
    } as unknown as UpdateShippingItemFormInterface

    await updateCustomShippingItem(edit)
  }
}

// reset form with current value
onMounted(() => {
  if (!$props.prop_customsShippingItem) return
  const item = $props.prop_customsShippingItem
  // resetting form
  resetForm(
    {
      ...item,
    },
    {
      original: true,
      omitExtraFields: true,
    },
  )
  // resetting selected item
  customShippingSelected.value = memberOrderState.value.customShippingOptions.find(
    (cs) => cs.id === item.shippingOptionId,
  )
})

watch(customShippingSelected, (value) => {
  if (!value) return
  getAttributesByCustomShippingOptionId(value.id)
    .then((resp) => (customShippingSelectedAttributes.value = resp))
    .catch(console.error)
})

watch(customShippingSelectedAttributes, (value) => {
  const item = $props.prop_customsShippingItem

  if (!item?.attributes.length || !customShippingSelectedAttributes.value.length) return

  // resetting custom options
  for (let i = 0; i < item.attributes.length; i++) {
    const at = item.attributes[i]!

    const foundAt = value.find((ats) => ats.id === at.id)

    if (foundAt) {
      foundAt.value = at.value
      foundAt.selected = true
    }
  }
})
</script>

<style scoped lang="scss" src="./CustomShippingBasket.scss" />
