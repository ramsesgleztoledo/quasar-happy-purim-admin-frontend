<template>
  <div class="row q-pa-sm q-mb-sm">
    <div class="col-12">
      <ExpanCustom
        @update:model-value="onUpdateSolicitDotation"
        v-model="solicitDotationFlag"
        title="Solicit Donations for Charity"
      >
        <template v-slot:body>
          <div class="row">
            <div class="col-12">
              <p>Text to display:</p>
            </div>
          </div>
          <EditorCustom v-model="solicitDotationText" />
          <div class="row q-mt-sm">
            <div class="col-12 justify-content-end">
              <q-btn
                style="background: white; color: var(--happypurim)"
                icon="save"
                label="Save"
                @click="
                  () => {
                    updateDonationContent({
                      active: solicitDotationFlag,
                      message: solicitDotationText,
                    })
                  }
                "
              />
            </div>
          </div>
        </template>
      </ExpanCustom>
    </div>
  </div>
  <div class="row q-pa-sm q-mb-sm">
    <div class="col-12">
      <ExpanCustom
        @update:model-value="onUpdateSellGift"
        v-model="sellGiftFlag"
        title="Sell Gift Baskets for Personal Use"
      >
        <template v-slot:body>
          <div class="row">
            <div class="col-12">
              <q-input
                type="number"
                v-model="sellGiftPrice"
                outlined
                lazy-rules
                :rules="[lazyRules.required(), lazyRules.greaterThan(0, true)]"
                label="Price per Basket ($)"
                hint="* You must ALSO include your price in the textbox below."
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <p>Text to display:</p>
            </div>
          </div>
          <EditorCustom v-model="sellGiftText" />
          <div class="row q-mt-sm">
            <div class="col-12 justify-content-end">
              <q-btn
                :disable="!sellGiftPrice || sellGiftPrice < 0"
                style="background: white; color: var(--happypurim)"
                icon="save"
                label="Save"
                @click="
                  () => {
                    updateAddon({
                      enabled: sellGiftFlag,
                      text: sellGiftText,
                      priceEach: Number(sellGiftPrice),
                    })
                  }
                "
              />
            </div>
          </div>
        </template>
      </ExpanCustom>
    </div>
  </div>
  <div class="row q-pa-sm q-mb-sm">
    <div class="col-12">
      <ExpanCustom
        @update:model-value="onUpdateAllowMembers"
        v-model="allowMembersFlag"
        title="Allow Members to Send to Others Outside the List"
      >
        <template v-slot:body>
          <div class="row">
            <div class="col-12">
              <q-input
                type="number"
                v-model="allowMembersPrice"
                outlined
                lazy-rules
                :rules="[lazyRules.required(), lazyRules.greaterThan(0, true)]"
                label="Price per Basket ($)"
                hint="* You must ALSO include your price in the textbox below."
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <p>Text to display:</p>
            </div>
          </div>
          <EditorCustom v-model="allowMembersText" />
          <div class="row q-mt-sm">
            <div class="col-12 justify-content-end">
              <q-btn
                :disable="!allowMembersPrice || allowMembersPrice < 0"
                style="background: white; color: var(--happypurim)"
                icon="save"
                label="Save"
                @click="
                  () => {
                    updateSendOut({
                      enabled: allowMembersFlag,
                      message: allowMembersText,
                      priceEach: Number(allowMembersPrice),
                    })
                  }
                "
              />
            </div>
          </div>
        </template>
      </ExpanCustom>
    </div>
  </div>
  <div class="row q-pa-sm q-mb-sm">
    <div class="col-12">
      <ExpanCustom
        @update:model-value="onUpdateSellAdditional"
        v-model="sellAdditionalFlag"
        title="Sell Additional Items"
      >
        <template v-slot:body>
          <div class="row q-mb-sm">
            <div class="col-12 q-mb-sm">
              <p>Text to display:</p>
            </div>
            <div class="col-12 q-mb-sm">
              <EditorCustom v-model="sellAdditionalText" />
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="separator-bottom q-mb-sm"></div>
              <InfoAlert
                v-if="isMobile"
                type="info"
                :text="infoAlertText"
                icon="fullscreen"
                icon-color="#ef6982"
              />
              <div
                class="row q-pa-sm q-mb-sm AdditionalOrderingOptions-additional-profile"
                :class="{ fullscreen: isFullScreen }"
                :style="{ height: isFullScreen ? '100%' : '400px' }"
              >
                <div class="col-12">
                  <div class="row AdditionalOrderingOptions-additional-profile-desc-row">
                    <div class="col-12">
                      <div class="row">
                        <div class="col-12 justify-content-end">
                          <q-btn
                            flat
                            round
                            color="primary"
                            :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
                            @click="isFullScreen = !isFullScreen"
                          />
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-5 q-pa-sm d-flex">
                          <div class="row" style="width: 100%">
                            <div class="col-12 q-pl-lg">
                              <b>Description</b>
                            </div>
                          </div>
                        </div>
                        <div class="col-2 q-pa-sm">
                          <b>Price</b>
                        </div>
                        <div class="col-2 q-pa-sm">
                          <b>Sort Order</b>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-5 q-pa-sm d-flex">
                          <b class="q-pa-sm"> # </b>
                          <div class="row" style="width: 100%">
                            <div class="col-12">
                              <q-input
                                v-model="realForm.description.value"
                                outlined
                                :rules="[lazyRules.required()]"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="col-2 q-pa-sm">
                          <q-input
                            v-model="realForm.price.value"
                            outlined
                            :rules="[lazyRules.required(), lazyRules.greaterThan(0, false)]"
                            prefix="$"
                          />
                        </div>
                        <div class="col-2 q-pa-sm">
                          <q-input
                            v-model="realForm.sortOrder.value"
                            outlined
                            :rules="[lazyRules.required(), lazyRules.greaterThan(0, true)]"
                          />
                        </div>
                        <div class="col-3 q-pa-sm justify-content-center">
                          <q-btn
                            style="background: var(--happypurim); color: white"
                            icon="add"
                            label="Add new item"
                            @click="addNewItem"
                            :disable="!isValidForm()"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="separator-bottom q-mb-sm"></div>
                  </div>
                  <!--=============================== here =============================-->

                  <div class="row" v-for="(item, i) in sellAdditionalItems" :key="item.id">
                    <div class="col-5 q-pa-sm d-flex">
                      <b class="q-pa-sm"> {{ i + 1 }} </b>
                      <div class="row" style="width: 100%">
                        <div class="col-12">
                          <q-input
                            :rules="[lazyRules.required()]"
                            v-model="item.description"
                            outlined
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-2 q-pa-sm">
                      <q-input
                        :rules="[lazyRules.required(), lazyRules.greaterThan(0, false)]"
                        v-model="item.price"
                        outlined
                        type="number"
                        prefix="$"
                      />
                    </div>
                    <div class="col-2 q-pa-sm">
                      <q-input
                        :rules="[lazyRules.required(), lazyRules.greaterThan(0, true)]"
                        v-model="item.sortOrder"
                        outlined
                        type="number"
                      />
                    </div>
                    <div class="col-3 q-pa-sm justify-content-center">
                      <q-btn
                        icon="delete"
                        @click="
                          () => {
                            onDeleteItem(item.id)
                          }
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="separator-bottom q-mb-md"></div>
              <div class="row q-mt-sm q-mb-md">
                <div class="col-12 justify-content-end">
                  <q-btn
                    style="background: white; color: var(--happypurim)"
                    icon="save"
                    label="Save"
                    :disable="areOrderItemsValid()"
                    @click="
                      () =>
                        updateAdditionalOrderingItems({
                          content: {
                            enabled: sellAdditionalFlag,
                            message: sellAdditionalText,
                          },
                          items: sellAdditionalItems,
                        })
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
      </ExpanCustom>
    </div>
  </div>
</template>

<script setup lang="ts">
import EditorCustom from 'src/components/EditorCustom/EditorCustom.vue'
import ExpanCustom from 'src/components/ExpanCustom/ExpanCustom.vue'
import InfoAlert from 'src/components/InfoAlert/InfoAlert.vue'
import { lazyRules, useForm, validations } from 'src/composables'
import { useAdvancedSettings } from 'src/modules/dashboard/composables/useAdvancedSettings'
import type { Tab2AdditionalItemInterface } from 'src/modules/dashboard/interfaces/advanced-settings.interfaces'
import { useUI } from 'src/modules/UI/composables'
import { onMounted, ref } from 'vue'

const {
  advancedSettingsState,
  updateDonationContent,
  updateAddon,
  updateSendOut,
  addAdditionalOrderingItems,
  deleteAdditionalOrderingItems,
  updateAdditionalOrderingItems,
} = useAdvancedSettings()

const { isMobile } = useUI()
const infoAlertText = `To handle "Additional Profile Questions/Options" we strongly recommend to use yor phone or tablet in landscape and the fullscreen mode`

// Charity
const solicitDotationFlag = ref(false)
const solicitDotationText = ref('')

// gif basket
const sellGiftFlag = ref(false)
const sellGiftText = ref('')
const sellGiftPrice = ref(0)

// allow Members
const allowMembersFlag = ref(false)
const allowMembersText = ref('')
const allowMembersPrice = ref(0)

// sell additional
const sellAdditionalFlag = ref(false)
const sellAdditionalText = ref('')
const sellAdditionalItems = ref<Tab2AdditionalItemInterface[]>([])

/**============================================
 *               Additional Profile Questions/Options
 *=============================================**/
const isFullScreen = ref<boolean>(false)

const { realForm, isValidForm, getFormValue, resetForm } = useForm({
  description: { value: '', validations: [validations.required] },
  price: { value: 0, validations: [validations.required, validations.greaterThan(0)] },
  sortOrder: { value: 0, validations: [validations.required, validations.greaterThan(0, true)] },
})

const resetDonations = () => {
  solicitDotationFlag.value = advancedSettingsState.value.charitySettings.active
  solicitDotationText.value = advancedSettingsState.value.charitySettings.message
}
const resetSellGift = () => {
  sellGiftFlag.value = advancedSettingsState.value.addonSettings.enabled
  sellGiftText.value = advancedSettingsState.value.addonSettings.message
  sellGiftPrice.value = advancedSettingsState.value.addonSettings.price
}
const resetAllowMembers = () => {
  allowMembersFlag.value = advancedSettingsState.value.sendOutSettings.enabled
  allowMembersText.value = advancedSettingsState.value.sendOutSettings.message
  allowMembersPrice.value = advancedSettingsState.value.sendOutSettings.price
}
const resetSellAdditional = () => {
  sellAdditionalFlag.value = advancedSettingsState.value.additionalOrderingItem.enabled
  sellAdditionalText.value = advancedSettingsState.value.additionalOrderingItem.message
  sellAdditionalItems.value = advancedSettingsState.value.additionalOrderingItem.items
}

const onUpdateSolicitDotation = (value: boolean) => {
  updateDonationContent({
    active: value,
    message: solicitDotationText.value,
  })
}

const onUpdateSellGift = (value: boolean) => {
  updateAddon({
    enabled: value,
    text: sellGiftText.value,
    priceEach: Number(sellGiftPrice.value),
  })
}
const onUpdateAllowMembers = (value: boolean) => {
  updateSendOut({
    enabled: value,
    message: allowMembersText.value,
    priceEach: Number(allowMembersPrice.value),
  })
}

const onUpdateSellAdditional = (value: boolean) => {
  updateAdditionalOrderingItems({
    content: {
      enabled: value,
      message: sellAdditionalText.value,
    },
    items: sellAdditionalItems.value,
  })
}

onMounted(() => {
  resetDonations()
  resetSellGift()
  resetAllowMembers()
  resetSellAdditional()
})

const addNewItem = async () => {
  const item = getFormValue() as unknown as Tab2AdditionalItemInterface
  const resp = await addAdditionalOrderingItems(item)
  sellAdditionalItems.value = [...resp, ...sellAdditionalItems.value]
  resetForm()
}

const onDeleteItem = async (id: number) => {
  const resp = await deleteAdditionalOrderingItems(id)
  if (resp) sellAdditionalItems.value = sellAdditionalItems.value.filter((item) => item.id !== id)
}

const areOrderItemsValid = () => {
  const found = sellAdditionalItems.value.find(
    (item) =>
      !item.description ||
      !item.price ||
      !item.sortOrder ||
      Number(item.price) <= 0 ||
      Number(item.sortOrder) < 0,
  )

  return !!found
}
</script>

<style scoped lang="scss">
@import './AdditionalOrderingOptions';
</style>
