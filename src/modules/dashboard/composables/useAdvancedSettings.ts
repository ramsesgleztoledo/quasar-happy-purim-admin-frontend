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
        spinnerColor: '#ef6982',
        messageColor: '#ef6982',
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
        `donate basket ${enabled ? 'enabled' : 'disabled'}`,
        `something went wrong  ${enabled ? 'enabling' : 'disabling'} donate basket`
      )


    },
    async updateDonationBasketPrompt(text: string) {
      const resp = await updateTab1DonateBasketPrompt(text, {
        loading: {
          message: 'updating donate basket...',
        }
      })
      showToast(resp.ok,
        `donate basket question updated`,
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
        `2nd address ${enabled ? 'enabled' : 'disabled'}`,
        `something went wrong  ${enabled ? 'enabling' : 'disabling'} 2nd address`
      )


    },
    async updateTab1AlternativeDeliveryAddressPrompt(text: string) {
      const resp = await updateTab1AlternativeDeliveryAddressPrompt(text, {
        loading: {
          message: 'updating 2nd address...',
        }
      })
      showToast(resp.ok,
        `2nd address question updated`,
        'something went wrong updating 2nd address'
      )


    },
    async updateTab1AdditionalProfileQuestion(data: Tab1AdditionalProfileQuestionInterface) {
      const resp = await updateTab1AdditionalProfileQuestion(data, {
        loading: {
          message: `updating question ${data.optId}...`,
        }
      })
      showToast(resp.ok,
        `question ${data.optId} updated`,
        `something went wrong updating the question ${data.optId}`
      )

      return resp.ok
    },
    async deleteTab1AdditionalProfileQuestion(id: number) {
      const resp = await deleteTab1AdditionalProfileQuestion(id, {
        loading: {
          message: `deleting question ${id}...`,
        }
      })
      showToast(resp.ok,
        `question ${id} deleted`,
        `something went wrong deleting the question ${id}`
      )

      return resp.ok
    },
    async createTab1AdditionalProfileQuestion(data: Omit<Tab1AdditionalProfileQuestionInterface, "optId">) {
      const resp = await createTab1AdditionalProfileQuestion(data, {
        loading: {
          message: `adding new question...`,
        }
      })
      showToast(resp.ok,
        `new question added`,
        `something went wrong adding a new question`
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
          message: 'updating charity settings'
        }
      })
      showToast(resp.ok,
        'charity settings updated',
        'something went wrong updating charity settings'
      )
    },
    async updateAddon(data: Tab2AddonFormInterface) {
      const resp = await updateAddon(data, {
        loading: {
          message: 'updating addon'
        }
      })
      showToast(resp.ok,
        'addon settings updated',
        'something went wrong updating addon settings'
      )
    },
    async updateSendOut(data: Tab2AllowMembersFormInterface) {
      const resp = await updateSendOut(data, {
        loading: {
          message: 'updating allow members settings'
        }
      })
      showToast(resp.ok,
        'allow members settings updated',
        'something went wrong updating allow members settings'
      )
    },
    async addAdditionalOrderingItems(data: Tab2AddOrderItemFormInterface) {
      const resp = await addAdditionalOrderingItems(data, {
        loading: {
          message: 'adding new item'
        }
      })
      showToast(resp.ok,
        'new item added',
        'something went wrong adding a new item'
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
          message: 'deleting item'
        }
      })
      showToast(resp.ok,
        'new item deleted',
        'something went wrong deleting a new item'
      )
      return resp.ok
    },
    async updateAdditionalOrderingItems(data: {
      items: Tab2AdditionalItemInterface[],
      content: OrderItemSettingsInterface
    }) {
      $q.loading.show({
        message: 'updating sell additional items...',
        spinnerColor: '#ef6982',
        messageColor: '#ef6982',
      })

      const resp
        = await Promise.all(
          [updateOrderItems(data.content), ...data.items.map(item => updateAdditionalOrderingItem(item.id, {
            description: item.description,
            price: item.price,
            sortOrder: item.sortOrder
          }))]
        )

      $q.loading.hide()
      const error = resp.find(re => !re.ok)

      showToast(!error,
        'sell additional items updated',
        'something went wrong updating sell additional items'
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
            message: 'adding new basket size'
          }
        })
      showToast(resp.ok,
        'new basket size added',
        'something went wrong adding a new basket size'
      )
      if (resp.ok) {
        const oldBasket = $asStore.$state.basketSize || []
        const newBasket = resp.data.data || []

        $asStore.setBasketSize(
          [newBasket[newBasket.length - 1] as Tab3BasketSizeInterface, ...oldBasket]

        )

      }
    },
    async deleteTab3BasketSize(id: number) {
      const resp = await deleteTab3BasketSize(
        id, {
        loading: {
          message: 'deleting basket size'
        }
      })
      showToast(resp.ok,
        'basket size deleted',
        'something went wrong deleting the basket size'
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
