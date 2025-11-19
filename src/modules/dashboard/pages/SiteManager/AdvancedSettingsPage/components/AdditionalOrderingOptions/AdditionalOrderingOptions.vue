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

          <div class="row q-mt-sm q-mb-md">
            <div class="col-12 justify-content-end">
              <q-btn
                style="background: white; color: var(--happypurim)"
                icon="save"
                label="Save"
                @click="
                  () =>
                    updateAdditionalOrderingItems({
                      enabled: sellAdditionalFlag,
                      message: sellAdditionalText,
                    })
                "
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="separator-bottom q-mb-sm"></div>
              <!-- <InfoAlert
                v-if="isMobile"
                type="info"
                :text="infoAlertText"
                icon="fullscreen"
                icon-color="#f36b09"
              /> -->
              <InfoAlert
                type="error"
                text="Do not enter more than one item with the same description"
              />

              <div
                class="row white-container q-pa-sm ProfileOptions-table-content"
                :class="{ fullscreen: isFullScreen }"
              >
                <div class="col-12">
                  <div class="row q-mb-sm justify-content-end">
                    <q-btn
                      flat
                      round
                      color="primary"
                      :icon="isFullScreen ? 'fullscreen_exit' : 'fullscreen'"
                      @click="isFullScreen = !isFullScreen"
                    />
                  </div>
                  <div class="row">
                    <q-btn
                      @click="onAddNewItem"
                      style="background: white; color: var(--happypurim)"
                      icon="add"
                      label="add new item"
                      :disable="
                        rowEdit?.id === -1 || !!sellAdditionalItems.find((it) => it.id === -1)
                      "
                    />
                  </div>
                  <div class="row q-mt-sm" :style="{ height: isFullScreen ? '85%' : '400px' }">
                    <div class="col-12">
                      <q-table
                        :pagination="{
                          rowsPerPage: 0,
                        }"
                        style="height: 100%"
                        flat
                        bordered
                        :rows="sellAdditionalItems"
                        :columns="columns"
                        row-key="name"
                        class="table-sticky-header-column-table"
                      >
                        <template v-slot:body="props">
                          <q-tr :props="props" v-if="rowEdit?.id !== props.row.id">
                            <q-td key="description" :props="props">
                              <div>
                                {{ props.row.description }}
                              </div>
                            </q-td>

                            <q-td key="price" :props="props">
                              <div>
                                {{ props.row.price ? '$' : ''
                                }}{{ convertWithCommas(Number(props.row.price) || 0,{
              dontAllowZero: true
            }) }}
                              </div>
                            </q-td>
                            <q-td key="sortOrder" :props="props">
                              <q-badge color="primary">
                                {{ props.row.sortOrder }}
                              </q-badge>
                            </q-td>
                            <q-td key="edit" :props="props">
                              <q-btn
                                v-if="rowEdit?.id !== props.row.id"
                                flat
                                style="background: var(--happypurim); color: white"
                                label="Edit"
                                @click="() => (rowEdit = { ...props.row })"
                              />
                            </q-td>
                          </q-tr>

                          <q-tr :props="props" v-else>
                            <q-td key="description" :props="props">
                              <q-input
                                label="Description *"
                                v-model="rowEdit!.description"
                                outlined
                                lazy-rules
                                :rules="[lazyRules.required()]"
                              />
                            </q-td>

                            <q-td key="price" :props="props">
                              <q-input
                                label="Price"
                                v-model="rowEdit!.price"
                                outlined
                                lazy-rules
                                type="number"
                                :rules="[lazyRules.required(), lazyRules.greaterThan(0, false)]"
                              />
                            </q-td>
                            <q-td key="sortOrder" :props="props">
                              <q-input
                                label="Sort Order"
                                v-model="rowEdit!.sortOrder"
                                outlined
                                lazy-rules
                                type="number"
                                :rules="[lazyRules.required(), lazyRules.greaterThan(0, true)]"
                              />
                            </q-td>
                            <q-td key="edit" :props="props">
                              <div class="row justify-content-end">
                                <q-btn
                                  class="q-mr-sm"
                                  dense
                                  color="primary"
                                  size="sm"
                                  icon="save"
                                  :disable="!isRowEditValid()"
                                  @click="addNewItem"
                                />
                                <q-btn
                                  v-if="rowEdit?.id !== -1"
                                  class="q-mr-sm"
                                  dense
                                  style="background-color: red; color: white"
                                  size="sm"
                                  icon="delete"
                                  @click="onDeleteItem"
                                />
                                <q-btn
                                  class="q-mr-sm"
                                  dense
                                  size="sm"
                                  icon="close"
                                  @click="onClose"
                                />
                              </div>
                            </q-td>
                          </q-tr>
                        </template>
                      </q-table>
                    </div>
                  </div>
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
import type { QTableColumn } from 'quasar'
import EditorCustom from 'src/components/EditorCustom/EditorCustom.vue'
import ExpanCustom from 'src/components/ExpanCustom/ExpanCustom.vue'
import InfoAlert from 'src/components/InfoAlert/InfoAlert.vue'
import { lazyRules } from 'src/composables'
import { convertWithCommas } from 'src/helpers'
import { useAdvancedSettings } from 'src/modules/dashboard/composables/useAdvancedSettings'
import type { Tab2AdditionalItemInterface } from 'src/modules/dashboard/interfaces/advanced-settings.interfaces'
// import { useUI } from 'src/modules/UI/composables'
import { onMounted, ref } from 'vue'

const {
  advancedSettingsState,
  updateDonationContent,
  updateAddon,
  updateSendOut,
  addAdditionalOrderingItems,
  deleteAdditionalOrderingItems,
  updateAdditionalOrderingItems,
  updateAdditionalOrderingItem,
} = useAdvancedSettings()

// const { isMobile } = useUI()
// const infoAlertText = `To handle "Additional Profile Questions/Options" we strongly recommend to use yor phone or tablet in landscape and the fullscreen mode`

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
    enabled: value,
    message: sellAdditionalText.value,
  })
}

onMounted(() => {
  resetDonations()
  resetSellGift()
  resetAllowMembers()
  resetSellAdditional()
})

const addNewItem = async () => {
  const data = rowEdit.value
  if (!data) return
  if (data.id === -1) {
    const resp = await addAdditionalOrderingItems(rowEdit.value!)
    sellAdditionalItems.value.shift()
    sellAdditionalItems.value = [...resp, ...sellAdditionalItems.value]
  } else {
    updateAdditionalOrderingItem(data)
    sellAdditionalItems.value = sellAdditionalItems.value.map((da) => {
      if (da.id === data.id) return data
      return da
    })
  }

  rowEdit.value = undefined
}

const onDeleteItem = async () => {
  const id = rowEdit.value?.id
  if (!id) return

  const resp = await deleteAdditionalOrderingItems(id)
  if (resp) sellAdditionalItems.value = sellAdditionalItems.value.filter((item) => item.id !== id)
  rowEdit.value = undefined
}

const rowEdit = ref<Tab2AdditionalItemInterface | undefined>(undefined)

const isRowEditValid = () => {
  const data = rowEdit.value

  if (!data) return false
  if (
    !data.description ||
    !data.price ||
    data.sortOrder === undefined ||
    data.sortOrder === null ||
    `${data.sortOrder}` == '' ||
    Number(data.price) <= 0 ||
    Number(data.sortOrder) < 0
  )
    return false

  return true
}

const onClose = () => {
  if (rowEdit.value?.id === -1) sellAdditionalItems.value.shift()
  rowEdit.value = undefined
}

const columns = ref<QTableColumn<Tab2AdditionalItemInterface>[]>([
  {
    name: 'description',
    required: true,
    label: 'Description',
    align: 'left',
    field: 'description',
    sortable: true,
  },
  {
    name: 'price',
    required: true,
    label: 'Price',
    align: 'center',
    field: 'price',
  },
  {
    name: 'sortOrder',
    required: true,
    label: 'Sort Order',
    align: 'center',
    field: 'sortOrder',
  },
  {
    name: 'edit',
    required: true,
    label: '',
    field: 'id',
  },
])

const onAddNewItem = () => {
  const value = {
    id: -1,
    clientId: -1,
    description: '',
    price: 0,
    sortOrder: 0,
  }

  rowEdit.value = value
  sellAdditionalItems.value = [value, ...sellAdditionalItems.value]
}
</script>

<style scoped lang="scss" src="./AdditionalOrderingOptions.scss" />
