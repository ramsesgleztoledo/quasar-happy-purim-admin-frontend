import { useApiCall } from "src/services/apiCall";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";
import type { CharitySettingsInterface, OrderItemSettingsInterface, Tab1AdditionalProfileQuestionInterface, Tab1AdditionalProfileQuestionResponseInterface, Tab1AlternativeDeliveryAddressInterface, Tab1DonateBasketInterface, Tab2AdditionalItemInterface, Tab2AddonFormInterface, Tab2AddonInterface, Tab2AddOrderItemFormInterface, Tab2AllowMembersFormInterface, Tab3BasketSizeFormInterface, Tab3BasketSizeInterface, Tab3CreateBasketSizeResponseInterface } from "../interfaces/advanced-settings.interfaces";





export const useAdvancedSettingsService = () => {

  const baseUrl = '/OrgInfo'
  const { apiCall } = useApiCall()

  return {


    /**========================================================================
     *                           tab 1
     *========================================================================**/
    getTab1DonateBasket: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<Tab1DonateBasketInterface>> => {
      const nextUrl = `/tab-1-donate-basket`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },

    updateTab1DonateBasketEnabled: async (value: boolean, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/update-admin-donate-basket-option`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: "PUT",
        data: {
          enabled: value
        }
      })
    },
    updateTab1DonateBasketPrompt: async (value: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/admin-update-donate-basket-option-prompt`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: "PUT",
        data: {
          donateBasketOptionText: value
        }
      })
    },
    getTab1AlternativeDeliveryAddress: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<Tab1AlternativeDeliveryAddressInterface>> => {
      const nextUrl = `/tab-1-alternate-delivery`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },

    updateTab1AlternativeDeliveryAddressEnabled: async (value: boolean, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/update-admin-alternate-delivery-option`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: "PUT",
        data: {
          enabled: value
        }
      })
    },
    updateTab1AlternativeDeliveryAddressPrompt: async (value: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/admin-update-alternate-delivery-address-prompt`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: "PUT",
        data: {
          alternateDeliveryAddressPrompt: value
        }
      })
    },
    getTab1AdditionalProfileQuestions: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<Tab1AdditionalProfileQuestionInterface[]>> => {
      const nextUrl = `/get-additional-profile-questions`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    updateTab1AdditionalProfileQuestion: async (data: Tab1AdditionalProfileQuestionInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/update-additional-profile-questions/${data.optId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',
        data
      })
    },
    deleteTab1AdditionalProfileQuestion: async (id: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/delete-additional-profile-questions/${id}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'DELETE',
      })
    },
    createTab1AdditionalProfileQuestion: async (data: Omit<Tab1AdditionalProfileQuestionInterface, "optId">, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<Tab1AdditionalProfileQuestionResponseInterface>> => {
      const nextUrl = `/tab-1-add-additional-profile-question`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'POST',
        data
      })
    },

    /**========================================================================
     *                           tab 2
     *========================================================================**/
    getDonationContent: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<CharitySettingsInterface>> => {
      const nextUrl = `/charity`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    updateDonationContent: async (data: CharitySettingsInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/admin-charity-settings`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        data,
        method: 'PUT'
      })
    },
    getAddon: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<Tab2AddonInterface>> => {
      const nextUrl = `/addon`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    updateAddon: async (data: Tab2AddonFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/admin-addon-settings`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        data,
        method: 'PUT'
      })
    },
    getSendOut: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<Tab2AddonInterface>> => {
      const nextUrl = `/sendout`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    updateSendOut: async (data: Tab2AllowMembersFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/admin-sendout-settings`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        data,
        method: 'PUT'
      })
    },
    getAdditionalOrderingItems: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<Tab2AdditionalItemInterface[]>> => {
      const nextUrl = `/admin-additional-ordering-options-extra-order-options`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    addAdditionalOrderingItems: async (data: Tab2AddOrderItemFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<Tab2AdditionalItemInterface>> => {
      const nextUrl = `/add-order-options`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: "POST",
        data
      })
    },
    deleteAdditionalOrderingItems: async (data: { optionId: number }, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/orderoptions/delete`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: "PUT",
        data
      })
    },
    updateAdditionalOrderingItem: async (id: number, data: Tab2AddOrderItemFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/admin-update-cards-and-and-additional-order-options-info/${id}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: "PUT",
        data
      })
    },
    getOrderItems: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<OrderItemSettingsInterface>> => {
      const nextUrl = `/cards-and-other-additional-order-items`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    updateOrderItems: async (data: OrderItemSettingsInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/tab-2-update-cards`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: "PUT",
        data
      })
    },

    /**========================================================================
     *                           tab 3
     *========================================================================**/

    getTab3BasketSize: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<Tab3BasketSizeInterface[]>> => {
      const nextUrl = `/get-basket-sizes`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },

    createTab3BasketSize: async (data: Tab3BasketSizeFormInterface, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<Tab3CreateBasketSizeResponseInterface>> => {
      const nextUrl = `/admin-add-basket-size`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',
        data
      })
    },
    deleteTab3BasketSize: async (id: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/delete-basket-size/${id}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'DELETE',

      })
    },

    /**========================================================================
     *                           tab 4
     *========================================================================**/
    getTab4AdditionalReceiptText: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<{ receiptText: string }>> => {
      const nextUrl = `/receipt-text`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    updateTab4AdditionalReceiptText: async (value: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/receipt-text`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',
        data: {
          receiptText: value
        }
      })
    },
    getTab4InvoiceText: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<{ invoiceText: string }>> => {
      const nextUrl = `/get-invoice-text`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    updateTab4InvoiceText: async (value: string, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<unknown>> => {
      const nextUrl = `/invoice-text`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions,
        method: 'PUT',
        data: {
          invoiceText: value
        }
      })
    },


  }

}
