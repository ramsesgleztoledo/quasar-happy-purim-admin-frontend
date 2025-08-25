import { computed } from "vue";
import { useQuasar } from "quasar";
import type { ApiCallResponseInterface } from "src/services/api-interfaces";
import { useAdvancedSettingsStore } from "../store/advanceSettingsStore/advancedSettingsStore";
import { useAdvancedSettingsService } from "../services/advanced-settings.service";
import type { CharitySettingsInterface, OrderItemSettingsInterface, Tab1AdditionalProfileQuestionInterface, Tab1AlternativeDeliveryAddressInterface, Tab1DonateBasketInterface, Tab2AdditionalItemInterface, Tab2AddonFormInterface, Tab2AddonInterface, Tab2AddOrderItemFormInterface, Tab2AllowMembersFormInterface, Tab3BasketSizeFormInterface, Tab3BasketSizeInterface } from "../interfaces/advanced-settings.interfaces";
import { useUI } from "src/modules/UI/composables";



export const useAdvancedSettings = () => {


  const $asStore = useAdvancedSettingsStore()
  const $q = useQuasar()

  const {
    getDonationContent,
    updateDonationContent,
    getAddon,
    updateAddon,
    getSendOut,
    updateSendOut,
    getAdditionalOrderingItems,
    addAdditionalOrderingItems,
    deleteAdditionalOrderingItems,
    updateAdditionalOrderingItem,
    getOrderItems,
    updateOrderItems,
    getTab1DonateBasket,
    updateTab1DonateBasketEnabled,
    updateTab1DonateBasketPrompt,
    getTab1AlternativeDeliveryAddress,
    updateTab1AlternativeDeliveryAddressEnabled,
    updateTab1AlternativeDeliveryAddressPrompt,
    getTab3BasketSize,
    createTab3BasketSize,
    deleteTab3BasketSize,
    getTab4AdditionalReceiptText,
    getTab4InvoiceText,
    updateTab4AdditionalReceiptText,
    updateTab4InvoiceText,
    getTab1AdditionalProfileQuestions,
    updateTab1AdditionalProfileQuestion, deleteTab1AdditionalProfileQuestion,
    createTab1AdditionalProfileQuestion,
  } = useAdvancedSettingsService()


  const { showToast } = useUI()


  return {
    advancedSettingsState: computed(() => $asStore.$state),

    async getAdvancedSettings() {

      $q.loading.show({
        message: 'Loading advanced settings...',
        spinnerColor: '#f36b09',
        messageColor: '#f36b09',
      })


      const [
        // tab 1
        tab1DonateBasket,
        alternativeDeliveryAddress,
        additionalProfileQuestions,
        // tab 2
        donationContent,
        addonSettings,
        sendOut,
        orderingItems,
        orderItemsSettings,
        // tab 3
        basketSize,
        // tab 4
        additionalReceiptText,
        invoiceText,

      ]:
        [
          // tab 1
          ApiCallResponseInterface<Tab1DonateBasketInterface>,
          ApiCallResponseInterface<Tab1AlternativeDeliveryAddressInterface>,
          ApiCallResponseInterface<Tab1AdditionalProfileQuestionInterface[]>,
          // tab2
          ApiCallResponseInterface<CharitySettingsInterface>,
          ApiCallResponseInterface<Tab2AddonInterface>,
          ApiCallResponseInterface<Tab2AddonInterface>,
          ApiCallResponseInterface<Tab2AdditionalItemInterface[]>,
          ApiCallResponseInterface<OrderItemSettingsInterface>,
          // tab 3
          ApiCallResponseInterface<Tab3BasketSizeInterface[]>,
          // tab 4
          ApiCallResponseInterface<{ receiptText: string }>,
          ApiCallResponseInterface<{ invoiceText: string }>,
        ]
        = await Promise.all([
          // tab 1
          getTab1DonateBasket(),
          getTab1AlternativeDeliveryAddress(),
          getTab1AdditionalProfileQuestions(),
          // tab 2
          getDonationContent(),
          getAddon(),
          getSendOut(),
          getAdditionalOrderingItems(),
          getOrderItems(),
          // tab 3
          getTab3BasketSize(),
          // tab 4
          getTab4AdditionalReceiptText(),
          getTab4InvoiceText(),
        ])


      // tab 1
      if (tab1DonateBasket.ok)
        $asStore.setDonateBasket(tab1DonateBasket.data)
      if (alternativeDeliveryAddress.ok)
        $asStore.setAlternativeAddress(alternativeDeliveryAddress.data)

      $asStore.setAdditionalProfileQuestions(additionalProfileQuestions.ok ? additionalProfileQuestions.data : [])

      // tab 2
      if (donationContent.ok)
        $asStore.setDonationContent(donationContent.data)
      if (addonSettings.ok)
        $asStore.setAddonSettings(addonSettings.data)
      if (sendOut.ok)
        $asStore.setSendOutSettings(sendOut.data)
      if (orderItemsSettings.ok)
        $asStore.setAdditionalOrderingItem(orderItemsSettings.data)
      if (orderItemsSettings.ok)
        $asStore.setAdditionalOrderingItem(orderItemsSettings.data)

      $asStore.setOrderingItem(orderingItems.ok ? orderingItems.data : [])
      $asStore.setBasketSize(basketSize.ok ? basketSize.data : [])

      $asStore.setReceiptText(additionalReceiptText.ok ? additionalReceiptText.data.receiptText : "");
      $asStore.setInvoiceText(invoiceText.ok ? invoiceText.data.invoiceText : "")



      $q.loading.hide()
    },


    /**========================================================================
     *                           tab 1
     *========================================================================**/
    async updateDonationBasketEnabled(enabled: boolean,) {

      const resp = await updateTab1DonateBasketEnabled(enabled, {
        loading: {
          message: `${enabled ? 'enabling' : 'disabling'} donate basket...`,
        }
      });

      showToast(resp.ok,
        `Donate Basket Option ${enabled ? 'Enabled' : 'Disabled'}`,
        `Something went wrong  ${enabled ? 'enabling' : 'disabling'} donate basket option`
      )


    },
    async updateDonationBasketPrompt(text: string) {
      const resp = await updateTab1DonateBasketPrompt(text, {
        loading: {
          message: 'updating donate basket...',
        }
      })
      showToast(resp.ok,
        `donate basket option updated`,
        'something went wrong updating donate basket'
      )


    },
    async updateTab1AlternativeDeliveryAddressEnabled(enabled: boolean,) {

      const resp = await updateTab1AlternativeDeliveryAddressEnabled(enabled, {
        loading: {
          message: `${enabled ? 'enabling' : 'disabling'} 2nd address...`,
        }
      });

      showToast(resp.ok,
        `Alternate Delivery Address Option  ${enabled ? 'Enabled' : 'Disabled'}`,
        `Something went wrong  ${enabled ? 'enabling' : 'disabling'} alternate delivery address option`
      )


    },
    async updateTab1AlternativeDeliveryAddressPrompt(text: string) {
      const resp = await updateTab1AlternativeDeliveryAddressPrompt(text, {
        loading: {
          message: 'Loading ...',
        }
      })
      showToast(resp.ok,
        `Alternate Delivery Address Option Updated`,
        'Something went wrong updating alternate delivery address option'
      )


    },
    async updateTab1AdditionalProfileQuestion(data: Tab1AdditionalProfileQuestionInterface) {
      const resp = await updateTab1AdditionalProfileQuestion(data, {
        loading: {
          message: `Loading ...`,
        }
      })
      showToast(resp.ok,
        `Additional Profile Question Updated`,
        `Something went wrong updating the additional profile question `
      )

      return resp.ok
    },
    async deleteTab1AdditionalProfileQuestion(id: number) {
      const resp = await deleteTab1AdditionalProfileQuestion(id, {
        loading: {
          message: `Loading ...`,
        }
      })
      showToast(resp.ok,
        `Additional Profile Question Deleted`,
        `Something went wrong deleting the profile question`
      )

      return resp.ok
    },
    async createTab1AdditionalProfileQuestion(data: Omit<Tab1AdditionalProfileQuestionInterface, "optId">) {
      const resp = await createTab1AdditionalProfileQuestion(data, {
        loading: {
          message: `Loading ...`,
        }
      })
      showToast(resp.ok,
        `New Additional Profile Question Added”`,
        `Something went wrong adding a new addition profile question`
      )

      return {
        ok: resp.ok,
        data: resp.ok ? resp.data.data : undefined
      }
    },

    /**========================================================================
     *                           tab 2
     *========================================================================**/
    async updateDonationContent(data: CharitySettingsInterface) {
      const resp = await updateDonationContent(data, {
        loading: {
          message: 'Loading ...'
        }
      })
      showToast(resp.ok,
        'Charity Settings Updated',
        'Something went wrong updating charity settings'
      )
    },
    async updateAddon(data: Tab2AddonFormInterface) {
      const resp = await updateAddon(data, {
        loading: {
          message: 'Loading ...'
        }
      })
      showToast(resp.ok,
        'Add-on Gift Baskets Settings Updated',
        'Something went wrong updating the add-on gift baskets settings'
      )
    },
    async updateSendOut(data: Tab2AllowMembersFormInterface) {
      const resp = await updateSendOut(data, {
        loading: {
          message: 'loading ...'
        }
      })
      showToast(resp.ok,
        'Send Out Settings Updated ',
        'Something went wrong updating the Send Out Settings'
      )
    },
    async addAdditionalOrderingItems(data: Tab2AddOrderItemFormInterface) {
      const resp = await addAdditionalOrderingItems(data, {
        loading: {
          message: 'adding new item'
        }
      })
      showToast(resp.ok,
        'New Order Item Added',
        'Something went wrong adding a New Order Item'
      )
      if (resp.ok)
        $asStore.addOrderingItem([resp.data])

      return resp.ok ? [resp.data] : []

    },
    async deleteAdditionalOrderingItems(optionId: number) {
      const resp = await deleteAdditionalOrderingItems({
        optionId
      }, {
        loading: {
          message: 'Loading ...'
        }
      })
      showToast(resp.ok,
        'Order Item deleted',
        'Something went wrong deleting the Order Item'
      )
      return resp.ok
    },
    async updateAdditionalOrderingItems(
      content: OrderItemSettingsInterface
    ) {
      const resp = await updateOrderItems(content, {
        loading: {
          message: 'Loading ...'
        }
      })
      showToast(resp.ok,
        'Sell Additional Items Settings Updated ',
        'Something went wrong updating the Sell Additional Items Settings'
      )
    },

    async updateAdditionalOrderingItem(item: Tab2AdditionalItemInterface) {
      const resp = await updateAdditionalOrderingItem(item.id, {
        description: item.description,
        price: item.price,
        sortOrder: item.sortOrder
      }, {
        loading: {
          message: 'Loading ...'
        }
      })
      showToast(resp.ok,
        'Order Item Updated',
        'Something went wrong updating the Order Item'
      )

    },


    /**========================================================================
     *                           tab 3
     *========================================================================**/
    async createTab3BasketSize(data: Tab3BasketSizeFormInterface) {
      const resp = await createTab3BasketSize(
        data
        , {
          loading: {
            message: 'Loading ...'
          }
        })
      showToast(resp.ok,
        'New Basket Size Added',
        'Something went wrong adding a new basket size'
      )
      if (resp.ok)
        $asStore.setBasketSize(
          resp.data.data || []
        )
    },
    async deleteTab3BasketSize(id: number) {
      const resp = await deleteTab3BasketSize(
        id, {
        loading: {
          message: 'Loading ...'
        }
      })
      showToast(resp.ok,
        'Basket Size Deleted',
        'Something went wrong deleting the basket size'
      )

      if (resp.ok) {
        const oldBasket = $asStore.$state.basketSize.filter(item => item.id !== id)
        $asStore.setBasketSize(oldBasket)

      }
    },

    /**========================================================================
     *                           tab 3
     *========================================================================**/
    async updateTab4AdditionalReceiptText(value: string) {

      const resp = await updateTab4AdditionalReceiptText(value, {
        loading: {
          message: 'updating the additional receipt text'
        }
      })
      showToast(resp.ok,
        'additional receipt text updated',
        'something went wrong updating the additional receipt text'
      )
    },
    async updateTab4InvoiceText(value: string) {

      const resp = await updateTab4InvoiceText(value, {
        loading: {
          message: 'updating the invoice text'
        }
      })
      showToast(resp.ok,
        'invoice text updated',
        'something went wrong updating the invoice text'
      )
    },

  }
};
