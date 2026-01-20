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
             <q-input
          v-model="realForm.state.value"
          outlined
          label="State *"
          lazy-rules
          :rules="[lazyRules.required()]"
        />
        <!-- <q-select
          popup-content-class="q-menu-300"
          v-model="realForm.state.value"
          outlined
          :options="statesOptions"
          label="State *"
          lazy-rules
          :rules="[lazyRules.required()]"
        /> -->
      </div>
      <div class="col-6 q-pl-sm q-pr-sm">
        <q-input
          v-model="realForm.zip.value"
          outlined
          label="Zip Code *"
          class="regular-number-input"
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
          class="regular-number-input"
          lazy-rules
          :rules="[lazyRules.required()]"
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
    <template v-if="!prop_customsShippingItem">
      <div class="row q-mt-md basket-img-row-container justify-content-center">
        <div
          class="q-pa-sm col-6 col-sm-4 col-md-3 col-lg-3"
          v-for="item in memberOrderState.customShippingOptions"
          :key="item.id"
        >
          <div
            :class="{
              // 'col-4': !isMobile,
              // 'col-6': isMobile,
              'selected-basket-img-container': item.id === customShippingSelected?.id,
            }"
            class="q-pa-sm q-mb-sm basket-img-container q-item-bordered"
            style=""
            @click="customShippingSelected = item"
          >
            <BasketImg :item="item" />
          </div>
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
                <q-checkbox
                  v-model="attribute.selected"
                  :label="attribute.description"
                  @click="attribute.value = ''"
                />
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
                    label="Enter Value"
                    :rules="[lazyRules.required()]"
                    :disable="!attribute.selected"
                  />
                </div>
              </div>
            </div>
            <div
              class="col-6 q-pa-sm justify-content-center"
              :class="{
                'col-6': !isMobile,
                'col-12': isMobile,
              }"
            >
              <img :src="attribute.imageURL" alt="" style="width: 300px; height: 300px" />
            </div>
          </div>
        </div>
      </div>

      <div class="row q-mt-md">
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
    </template>
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
// import { statesOptions } from 'src/modules/dashboard/data'
import BasketImg from '../BasketImg/BasketImg.vue'
import { useUI } from 'src/modules/UI/composables'
import { useMemberOrder } from 'src/modules/dashboard/composables/useMemberOrder'
import { computed, onMounted, ref, watch } from 'vue'
import type {
  AttributeCustomShippingItemInterface,
  CustomShippingItemInterface,
  UpdateShippingItemFormInterface,
} from '../../../../../../../../../../interfaces/memberOrder-interfaces'
import type {
  CustomShippingItemFormInterface,
  CustomShippingOptionAttributeType,
  CustomShippingOptionInterface,
} from 'src/modules/dashboard/interfaces/memberOrder-interfaces'
import { useAuth } from 'src/modules/auth/composables/useAuth'

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
  addOrRemoveItem,
} = useMemberOrder()
const { authState } = useAuth()

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
    (!customShippingSelected.value && memberOrderState.value.customShippingOptions?.length)
  )
    return true

  if (customShippingSelectedAttributes.value?.length) {
    const atts = customShippingSelectedAttributes.value || []

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

  const attributes = !customShippingSelectedAttributes.value
    ? []
    : customShippingSelectedAttributes.value.filter((ats) => ats.selected)

  const data: CustomShippingItemFormInterface = {
    ...formData,
    shippingOptionId: customShippingSelected.value?.id || undefined,
    glutenFree: false,
    attributes: attributes.length ? JSON.stringify(attributes) : '',
  } as unknown as CustomShippingItemFormInterface

  const id = $props.prop_customsShippingItem?.shippingItemId || undefined

  const newPrice = getBasketPrice(data)

  // const currentPrice = $props.prop_customsShippingItem
  //   ? getBasketPrice({
  //       ...$props.prop_customsShippingItem,
  //       attributes: JSON.stringify($props.prop_customsShippingItem.attributes),
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     } as any)
  //   : 0

  if (!id) {
    const dataAux = { ...data }
    if (!dataAux.shippingOptionId) dataAux.shippingOptionId = -1

    await addCustomShippingItem(dataAux)
    await addOrRemoveItem(true, {
      description: 'Shipping Gift Basket',
      itemId: 2,
      sessionId: authState.value?.token?.token || '',
      quantity: 1,
      message: dataAux.message || '',
      shipTo: dataAux.recipient || '',
      price: newPrice,
    })

    resetForm()
    customShippingSelected.value = undefined
    customShippingSelectedAttributes.value = []
  } else {
    const edit = {
      ...$props.prop_customsShippingItem,
      ...data,
    } as unknown as UpdateShippingItemFormInterface

    if (!edit.shippingOptionId) edit.shippingOptionId = -1

    await updateCustomShippingItem(
      edit,
      // newPrice, currentPrice
    )
  }
}

const getBasketPrice = (basket: CustomShippingItemFormInterface) => {
  const cShippings = memberOrderState.value.customShippingOptions || []

  const cShipping = cShippings.find((cs) => cs.id === basket.shippingOptionId)
  if (!cShipping) {
    const sSendoutprice = memberOrderState.value.shulSetting?.sSendoutprice || 0
    const localDelivery =
      (memberOrderState.value.localDeliveries || []).find(
        (it) => it.enabled && it.zipCode == basket.zip,
      )?.localDeliveryPrice || 0

    return localDelivery || sSendoutprice
  }

  const basketTotal = cShipping.price || 0

  const attributes: AttributeCustomShippingItemInterface[] = JSON.parse(basket.attributes || '[]')

  const attributesTotal = attributes.reduce(
    (acc: number, curr: AttributeCustomShippingItemInterface) => {
      return acc + (curr.price || 0)
    },
    0,
  )

  return basketTotal + attributesTotal || 0
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
    .then((resp) => {
      customShippingSelectedAttributes.value = resp
    })
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
      // !!at.value
    }
  }
})
</script>

<style scoped lang="scss" src="./CustomShippingBasket.scss" />
