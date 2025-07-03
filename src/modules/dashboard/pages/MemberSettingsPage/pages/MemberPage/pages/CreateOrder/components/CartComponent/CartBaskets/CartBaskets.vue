<template>
  <div v-if="memberOrderState.customShippingItems.length" class="row">
    <div class="col-12">
      <q-separator />
      <q-expansion-item
        icon="shopping_basket"
        :label="`Gift Baskets to be Shipped (${memberOrderState.customShippingItems.length})`"
        default-opened
        header-class="CartBaskets-headers-container"
      >
        <q-card>
          <q-card-section>
            <div class="CartBaskets-baskets-container">
              <div
                v-for="item in memberOrderState.customShippingItems"
                :key="item.shippingOptionId"
                class="CartBaskets-basket-container q-mb-md"
              >
                <div class="row q-pa-sm" style="background-color: #ffdfc3">
                  <div class="col-2">{{ item.recipient }}</div>
                  <div class="col-4">{{ getShippingOption(item).value?.description }}</div>
                  <div v-if="item.attributes.length" class="col-4">
                    Customization (${{ convertWithCommas(totalCustomization(item).value) }})
                  </div>
                  <div class="col-2 justify-content-end">
                    <q-icon
                      @click="
                        () => {
                          customShippingToEdit = { ...item }
                          editCustomShippingDialogFlag = true
                        }
                      "
                      class="q-mr-md cursor-pointer"
                      name="edit"
                      style="color: #ff7600"
                    />
                    <q-icon
                      @click="
                        () => {
                          deleteCustomShippingItem({
                            ...item,
                            attributes: JSON.stringify(item.attributes),
                          } as unknown as UpdateShippingItemFormInterface)
                        }
                      "
                      class="cursor-pointer"
                      name="close"
                      style="color: red"
                    />
                  </div>
                </div>
                <q-separator class="q-mb-sm" />
                <div class="row">
                  <div class="col-12">
                    <div class="mini-text">Message:</div>
                    <div class="mini-text">{{ item.message }}</div>
                  </div>
                </div>
                <q-separator class="q-mb-sm" />
                <div class="row">
                  <div class="col-12">
                    <div class="mini-text">Address:</div>
                    <div class="mini-text">
                      {{ item.address }} {{ `${item.address2 ? `, ${item.address2}` : ''}` }},
                      {{ item.city }}, {{ item.state }}, {{ item.zip }}
                    </div>
                  </div>
                </div>

                <div v-if="item.attributes.length" class="row">
                  <div class="col-12">
                    <div class="row">
                      <div class="col-12">
                        <q-separator class="q-mb-sm" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <div class="row mini-text q-mb-sm">Customization:</div>
                        <div class="row">
                          <div class="col-12">
                            <ul>
                              <li
                                v-for="attribute in item.attributes"
                                :key="attribute.shippingOptionAttributeGuid"
                              >
                                <p style="margin: 0px">
                                  <b> {{ attribute.promptText }}: </b>
                                  {{ attribute.value }} - (${{
                                    convertWithCommas(attribute.price || 0)
                                  }})
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <q-separator class="q-mb-sm" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
  <q-dialog v-model="editCustomShippingDialogFlag" persistent>
    <q-card>
      <div class="row dialog-header custom-dialog-header-container">
        <div class="col-12">
          <p>Edit Custom Shipping Option</p>
        </div>
      </div>
      <q-card-section style="padding: 0px">
        <CustomShippingBasket :prop_customs-shipping-item="customShippingToEdit" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { convertWithCommas } from 'src/helpers'
import { useMemberOrder } from 'src/modules/dashboard/composables/useMemberOrder'
import type {
  CustomShippingItemInterface,
  UpdateShippingItemFormInterface,
} from 'src/modules/dashboard/interfaces/memberOrder-interfaces'
import { computed, ref } from 'vue'
import CustomShippingBasket from '../../StepTwoCreateOrder/components/CustomShippingBasket/CustomShippingBasket.vue'

const { memberOrderState, deleteCustomShippingItem } = useMemberOrder()

const editCustomShippingDialogFlag = ref(false)

const customShippingToEdit = ref<CustomShippingItemInterface | undefined>(undefined)

const getShippingOption = (item: CustomShippingItemInterface) =>
  computed(() => {
    return memberOrderState.value.customShippingOptions.find(
      (csItem) => csItem.id === item.shippingOptionId,
    )
  })

const totalCustomization = (item: CustomShippingItemInterface) =>
  computed(() => item.attributes.reduce((pre, curr) => pre + curr.price, 0))
</script>

<style scoped lang="scss">
@import './CartBaskets.scss';
</style>
