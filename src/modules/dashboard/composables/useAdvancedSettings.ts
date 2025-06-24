import { computed } from "vue";
import { useQuasar } from "quasar";
import type { ApiCallResponseInterface } from "src/services/api-interfaces";
import { useAdvancedSettingsStore } from "../store/advanceSettingsStore/advancedSettingsStore";
import { useAdvancedSettingsService } from "../services/advanced-settings.service";
import type { CharitySettingsInterface, Tab2AdditionalItemInterface, Tab2AddonFormInterface, Tab2AddonInterface, Tab2AddOrderItemFormInterface, Tab2AllowMembersFormInterface } from "../interfaces/advanced-settings.interfaces";
import { useUI } from "src/modules/UI/composables";


export const useAdvancedSettings = () => {


  const $asStore = useAdvancedSettingsStore()
  const $q = useQuasar()

  const { getDonationContent, updateDonationContent, getAddon, updateAddon, getSendOut, updateSendOut, getAdditionalOrderingItems, addAdditionalOrderingItems, deleteAdditionalOrderingItems,
    updateAdditionalOrderingItem
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
        donationContent,
        addonSettings,
        sendOut,
        orderingItems,
      ]:
        [
          ApiCallResponseInterface<CharitySettingsInterface>,
          ApiCallResponseInterface<Tab2AddonInterface>,
          ApiCallResponseInterface<Tab2AddonInterface>,
          ApiCallResponseInterface<Tab2AdditionalItemInterface[]>,
        ]
        = await Promise.all([
          getDonationContent(),
          getAddon(),
          getSendOut(),
          getAdditionalOrderingItems(),
        ])

      if (donationContent.ok)
        $asStore.setDonationContent(donationContent.data)
      if (addonSettings.ok)
        $asStore.setAddonSettings(addonSettings.data)
      if (sendOut.ok)
        $asStore.setSendOutSettings(sendOut.data)

      $asStore.setOrderingItem(orderingItems.ok ? orderingItems.data : [])



      $q.loading.hide()
    },

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
    async updateAdditionalOrderingItems(items: Tab2AdditionalItemInterface[]) {
      $q.loading.show({
        message: 'updating sell additional items...',
        spinnerColor: '#ef6982',
        messageColor: '#ef6982',
      })


      const resp
        = await Promise.all(items.map(item => updateAdditionalOrderingItem(item.id, {
          description: item.description,
          price: item.price,
          sortOrder: item.sortOrder
        })))

      $q.loading.hide()
      const error = resp.find(re => !re.ok)

      showToast(!error,
        'sell additional items updated',
        'something went wrong updating sell additional items'
      )


    },


  }
};
