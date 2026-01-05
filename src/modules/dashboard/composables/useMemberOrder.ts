
import { computed } from "vue";
import { useMemberOrderStore } from "../store/memberOrderStore/memberOrderStore";
import { usePromotionService } from "../services/promotion.service";
import { useMemberListService } from "../services/memberList.service";
import { useOrderItemService } from "../services/orderItems.service";
import type { CharityType, CustomShippingItemFormInterface, CustomShippingItemResponseInterface, CustomShippingOptionAttributeType, MemberCreateOrderFormInterface, MemberOrderItemsInterface, OrderMemberListInterface, OrderPromotionInterface, PaymentFormInterface, UpdateGreetingsRecipientType, UpdateShippingItemFormInterface } from "../interfaces/memberOrder-interfaces";
import { useQuasar } from "quasar";
import { useAuth } from "src/modules/auth/composables/useAuth";
import { useMember } from "./useMember";
import { useShaliachService } from "../services/shaliach.service";
import { useOrgSettingsService } from "../services/orgSettings.service";
import { useCharityService } from "../services/charity.service";
import { useUI } from "src/modules/UI/composables";
import { useCustomShippingOptionsService } from '../services/customShippingOptions.service';
import { useShippingItemsService } from "../services/shippingItems.service";
import { useAdvancedSettingsService } from "../services/advanced-settings.service";
import { useOrderOptionsService } from "../services/OrderOptions.service";
import { useDiscountsService } from "../services/Discounts.service";
import { usePaymentMethodsService } from "../services/paymentMethods.service";
import type { FormComposition } from "src/composables/useForm/interfaces";
import { useRouter } from "vue-router";
import { useProcessOrderService } from "../services/processOrder.service";
import { useShulService } from "../services/Shul.service";
import { useMemberStore } from "../store/memberStore/memberStore";
import { useMemberService } from "../services/member.service";
import { useLocalDeliveryService } from "../services/LocalDelivery.service";
import { useBasicSettingsService } from "../services/basic-settings.service";
import { useDashboardService } from "../services/dashboard.service";
import { useDashboardStore } from "../store/dashboardStore/dashboardStore";
import { useMemberShipService } from "../services/MemberShip.service";
import { useGreetingsService } from "../services/Greetings.service";
import { getMembersByPromotion } from "../helpers/getMembersByPromotion";






export const useMemberOrder = () => {

  const $router = useRouter()
  const $moStore = useMemberOrderStore()
  const $mStore = useMemberStore()
  const $dStore = useDashboardStore()
  const $q = useQuasar()
  const { getTransactionsByMemberId } = useMemberService()
  const { getPromotionsByMemberGuid } = usePromotionService()
  const { getMemberListMemberGuid } = useMemberListService()
  const { getOrderItemsByMemberGuid, addOrRemoveOrderItemsByMemberGuid } = useOrderItemService()
  const { authState } = useAuth()
  const { memberState, showRecordPaymentBtn_co } = useMember()
  const { addMember, removeMember } = useShaliachService()
  const { getOrganizationSettings } = useOrgSettingsService()
  const { getAdditionalCharityOptions, getCharityOptions } = useCharityService()
  const { showToast, showLoading: showLoadingUI, stopLoading: stopLoadingUI } = useUI()
  const { getCustomShippingOptions, getAttributesByCustomShippingOptionId } = useCustomShippingOptionsService()
  const { getCustomShippingItem, addCustomShippingItem, updateCustomShippingItem, deleteCustomShippingItem } = useShippingItemsService()
  const { getAdditionalOrderOptions } = useOrderOptionsService()
  const { getSendOut, getAddon, getOrderItems } = useAdvancedSettingsService()
  const { getDiscounts } = useDiscountsService()
  const { getPaymentMethods } = usePaymentMethodsService()
  const { placeOrder } = useProcessOrderService()
  const { getShulSettings } = useShulService()
  const { getLocalDelivery } = useLocalDeliveryService()
  const { getSettings } = useBasicSettingsService()
  const { getTopTransactions } = useDashboardService()
  const { getPayMembershipByMemberId } = useMemberShipService()
  const { getRecipientsByMemberId, deleteRecipientsByMemberId, updateRecipientsByMemberId } = useGreetingsService()


  const mGuid = computed(() => memberState.value.selectedMember?.memberGuid || '')
  const memberId = computed(() => memberState.value.selectedMember?.memberId || 0)
  const tokenSession = computed(() => authState.value.token?.token || "")



  const getParse = (value: string) => {
    try {
      if (!value) return []
      return JSON.parse(value)
    } catch {
      return []
    }
  };


  /**========================================================================
   *                           methods
   *========================================================================**/

  const addOrRemoveItem = async (isAdd: boolean, data: MemberOrderItemsInterface, showLoading?: boolean) => {


    if (showLoading)
      $q.loading.show({
        message: 'Loading...',
        spinnerColor: '#f36b09',
        messageColor: '#f36b09',
      })

    const resp = await addOrRemoveOrderItemsByMemberGuid({
      data,
      isAdd,
      memberGuid: mGuid.value,
    },

    )

    if (!resp.ok)
      $q.notify({
        color: 'red',
        textColor: 'black',
        icon: 'error',
        message: 'Something went wrong adding an item to the cart, please refresh the page and try again',

      })

    if (showLoading) $q.loading.hide()


    $moStore.setOrderItems(resp.ok ? resp.data : [])

    return resp.ok

  };

  const setCustomShippingItems = (data: CustomShippingItemResponseInterface[]) => {

    $moStore.setCustomShippingItems(data.map(item => ({
      ...item,
      attributes: getParse(item.attributes)
    })) || [])
  };




  return {




    memberOrderState: computed(() => $moStore.$state),
    orderTotal: computed(() => $moStore.getTotalCost),


    async onAddOrRemovePromotion(value: boolean, item: OrderPromotionInterface) {
      showLoadingUI()
      const isAll = item.categories.toLowerCase().includes('all')

      let promotions = $moStore.$state.promotions.map((promotion) => ({ ...promotion }))

      if (isAll)
        promotions = promotions.map((pro) => {
          if (pro.id == item.id) return pro

          return {
            ...pro,
            selected: false,
          }
        })

      const members = $moStore.$state.memberList.copy

      const list = getMembersByPromotion(item, members, promotions)

      const selectedId = new Set($moStore.membersSelected.map((member) => member.id))

      if (value) {
        for (const item of list) {
          if (!selectedId.has(item.id)) {
            $moStore.membersSelected.push(item)
            selectedId.add(item.id)
          }
        }
      } else {
        $moStore.membersSelected = getMembersByPromotion(
          item,
          $moStore.membersSelected,
          promotions,
          true,
        )
      }
      stopLoadingUI()
    },

    async getNewData() {

      const resp = await Promise.all([
        getOrderItemsByMemberGuid(mGuid.value),
        getCustomShippingItem(mGuid.value),

      ])

      if (resp.find(resp => !resp.ok)) return

      $moStore.$patch({
        orderItems: resp[0].data,
        customShippingItems:
          resp[1].data.map(item => ({
            ...item,
            attributes: getParse(item.attributes)
          })),

      })
    },
    async getInitialData() {

      const resp = await Promise.all([
        getPromotionsByMemberGuid(mGuid.value),
        getMemberListMemberGuid(mGuid.value),
        getOrderItemsByMemberGuid(mGuid.value),
        getOrganizationSettings(mGuid.value),
        getAdditionalCharityOptions(),
        getCharityOptions(),
        getCustomShippingOptions(),
        getCustomShippingItem(mGuid.value),
        getSendOut(),
        getAddon(),
        getOrderItems(),
        getAdditionalOrderOptions(mGuid.value),
        getDiscounts(),
        getPaymentMethods(mGuid.value),
        getShulSettings(mGuid.value),
        getLocalDelivery(),
        getSettings(),
        getPayMembershipByMemberId(memberId.value),
      ])

      if (resp.find(resp => !resp.ok)) return

      const promotions = resp[0].data.map(pro => {
        const selected = resp[2].data.find(item => item.itemId == pro.itemId)

        const disabled = !!pro.orderItemID || !!pro.transactionID

        return {
          ...pro,
          selected: (!!selected || disabled),
          disabled
        }
      }
      ) || []

      const showFee = !!resp[3].data[0]?.feeActive && !!resp[3].data[0]?.feeRequired



      $moStore.$patch({
        memberList: {
          copy: resp[1].data,
          original: resp[1].data,
        },
        orderItems: resp[2].data,
        promotions,
        orgSettings: resp[3].data[0],
        additionalCharityOptions: resp[4].data,
        charityOptions: resp[5].data,
        customShippingOptions: resp[6].data,
        customShippingItems:
          resp[7].data.map(item => ({
            ...item,
            attributes: getParse(item.attributes)
          })),
        // resp[7].data
        sendOutSettings: resp[8].data,
        addonSettings: resp[9].data,
        additionalOrderItemsSettings: resp[10].data,
        additionalOrderOptions: resp[11].data,
        discounts: resp[12].data,
        paymentMethodTypes: resp[13].data,
        shulSetting: resp[14].data,
        localDeliveries: resp[15].data,
        settings: resp[16].data,
        showFee,
        membership: resp[17].data,

      })
      if (!resp[17].data.membershipRequired)
        $moStore.setMembershipType('none')
    },
    addOrRemoveItem,

    async addOrRemovePromotion(value: boolean, item: OrderPromotionInterface) {
      const data: MemberOrderItemsInterface = {
        description: item.displayText,
        itemId: item.itemId,
        message: "",
        price: item.price,
        quantity: item.quantity ? item.quantity : 1,
        sessionId: tokenSession.value,
        shipTo: ""
      }

      await addOrRemoveItem(value, data)

    },


    async updateMembersCart(
      membersAdd: OrderMemberListInterface[]
    ) {
      await addMember({
        memberGuid: mGuid.value,
        memberId: memberId.value
      },
        [...membersAdd.map(member => ({
          receiver: member.id,
          tempcode: `${mGuid.value}+${member.id}`,
          price: member.price || $moStore.shulSetting?.sPerperson || 0
        }))]
      )
    },

    async updateCart(data: {
      promotions: OrderPromotionInterface[];
      membersAdd: OrderMemberListInterface[];
      // membersDelete: OrderMemberListInterface[];
    }) {





      // let respDelete = undefined;
      // const respPromotions = undefined


      // const respAdd =
      await addMember({
        memberGuid: mGuid.value,
        memberId: memberId.value
      },
        [...data.membersAdd.map(member => ({
          receiver: member.id,
          tempcode: `${mGuid.value}+${member.id}`,
          price: member.price || $moStore.shulSetting?.sPerperson || 0
        }))]
      )

      // if (data.membersDelete.length)
      //   respDelete = await removeMember({
      //     memberGuid,
      //     memberId
      //   },
      //     [...data.membersDelete.map(member => ({
      //       receiver: member.id,
      //       tempcode: `${memberGuid}+${member.id}`
      //     }))]
      //   )

      if (data.promotions.length)
        // respPromotions =
        await Promise.all(
          data.promotions.map(item => addOrRemoveItem(!!item.selected, {
            description: item.displayText,
            itemId: item.itemId,
            message: "",
            price: item.price,
            quantity: item.quantity ? item.quantity : 1,
            sessionId: tokenSession.value,
            shipTo: ""
          })),

        )


      // if (
      //   respAdd !== undefined ||
      //   // respDelete !== undefined ||
      //   respPromotions !== undefined

      // ) {

      //   const validRespAdd = respAdd === undefined ? true : respAdd.ok
      //   // const validRespDelete = respDelete === undefined ? true : respDelete.ok
      //   const validRespPromotions = respPromotions === undefined ? true : respPromotions.every(resp => resp)





      //   showToast(
      //     validRespAdd &&
      //     // validRespDelete &&
      //     validRespPromotions,
      //     'Cart Updated',
      //     'Something went wrong updating the cart'
      //   )
      // }


    },

    async getOrderItemsByMemberGuid() {

      const resp = await getOrderItemsByMemberGuid(mGuid.value, {
        loading: {
          message: 'Loading...'
        }
      })
      $moStore.setOrderItems(resp.ok ? resp.data : [])
    },

    async addOrRemoveDonation(isAdd: boolean, charity: CharityType) {

      const data: MemberOrderItemsInterface = {
        description: charity.description,
        itemId: charity.id,
        message: "",
        price: charity.value,
        quantity: 1,
        shipTo: "",
        sessionId: tokenSession.value,
      }
      await addOrRemoveItem(isAdd, data)
    },

    setUpdatedPromotions(promotions: OrderPromotionInterface[]) {
      const oldPromotions = $moStore.promotions

      for (let i = 0; i < promotions.length; i++) {
        const pro = oldPromotions.find(p => p.itemId == promotions[i]!.itemId)
        if (pro)
          pro.selected = !!promotions[i]!.selected

      }
    },


    async removeMemberFromCart(member: OrderMemberListInterface) {
      await removeMember({
        memberGuid: mGuid.value,
        memberId: memberId.value
      },
        [{
          receiver: member.id,
          tempcode: `${mGuid.value}+${member.id}`,
          price: 0
        }],
        {
          loading: {
            message: 'Loading...'
          }
        }
      )

    },

    setMemberListCopy(members: OrderMemberListInterface[]) {
      $moStore.setMemberListCopy(members)
    },

    async getAttributesByCustomShippingOptionId(id: number): Promise<CustomShippingOptionAttributeType[]> {
      const attributes = await getAttributesByCustomShippingOptionId(id, mGuid.value, {
        loading: {
          message: `Loading...`
        }
      })

      return attributes.ok ? attributes.data.map(item => ({
        ...item,
        value: "",
        type: 'text',
        selected: false,
      })) : []
    },
    async addCustomShippingItem(data: CustomShippingItemFormInterface) {
      const resp = await addCustomShippingItem(mGuid.value, data, {
        loading: {
          message: `Loading...`
        }
      })
      if (resp.ok)
        setCustomShippingItems(resp.data)
    },
    async updateCustomShippingItem(data: UpdateShippingItemFormInterface,
      // newPrice: number, currentPrice: number

    ) {

      // addOrRemoveItem()
      const resp = await updateCustomShippingItem(mGuid.value, data, {
        loading: {
          message: `Loading...`
        }
      })
      if (resp.ok) {
        // const total = $moStore.$state.orderItems.find(item => item.itemId == 2)?.price || 0

        // console.log({ total, newPrice, currentPrice });


        // await addOrRemoveItem(true, {
        //   description: 'Shipping Gift Basket',
        //   itemId: 2,
        //   sessionId: authState.value?.token?.token || '',
        //   quantity: 1,
        //   message: '',
        //   shipTo: '',
        //   price: 34,
        // })

        setCustomShippingItems(resp.data)
      }
    },
    async deleteCustomShippingItem(data: UpdateShippingItemFormInterface) {
      const resp = await deleteCustomShippingItem(mGuid.value, data, {
        loading: {
          message: `Loading...`
        }
      })
      if (resp.ok)

        $moStore.setCustomShippingItems($moStore.customShippingItems.filter(item => item.shippingItemId !== data.shippingItemId))

    },

    async addMemberShipToCart() {
      const item: MemberOrderItemsInterface = {
        description: 'Membership',
        itemId: -120,
        message: 'Membership',
        quantity: 1,
        sessionId: tokenSession.value,
        shipTo: '',
        price: $moStore.$state.membership?.annualPrice || 0
      }

      if ($moStore.$state.membershipType == 'life')
        item.price = $moStore.$state.membership?.lifePrice || 0

      const memberShipItem = $moStore.$state.orderItems.find(item => item.itemId == -120)

      if (memberShipItem)
        await addOrRemoveItem(false, item)

      if ($moStore.$state.membershipType != 'none')
        await addOrRemoveItem(true, item)

    },


    async getGreetingsRecipientsByMemberId() {
      const resp = await getRecipientsByMemberId(memberId.value, {
        loading: {
          message: 'Loading...'
        }
      })
      $moStore.setGreetingsRecipients(resp.ok ? resp.data : [])
    },
    async deleteGreetingsRecipientsByMemberId(rowId: number | string) {
      const resp = await deleteRecipientsByMemberId(memberId.value, rowId, {
        loading: {
          message: 'Loading...'
        }
      })
      if (resp.ok)
        $moStore.$state.greetingsRecipients = $moStore.$state.greetingsRecipients.filter(rec => rec.rowId != rowId)
    },
    async updateGreetingsRecipientsByMemberId() {
      const updates: UpdateGreetingsRecipientType[] = $moStore.$state.greetingsRecipients.map(rec => ({
        greeting: rec.greeting,
        rowId: rec.rowId
      }))
      await updateRecipientsByMemberId(memberId.value, updates, {
        loading: {
          message: 'Loading...'
        }
      })

    },


    async placeOrder() {
      if ($moStore.IsPaymentFormInvalid) return


      const emailTo = $moStore.paymentForm.email || "";

      const paymentType = $moStore.paymentForm.paymentType


      const reciprocity = $mStore.$state.memberOptions.reciprocity.showReciprocity ? $mStore.$state.memberOptions.reciprocity.isReciprocal : false




      let data: MemberCreateOrderFormInterface = {
        phoneOrCheckDate: "",
        cardType: "",
        checkOrCCNumber: "",
        paymentMethod: "Invoice",
        paymentType: "Invoice",
        firstName: "",
        lastName: "",
        cardCode: "",
        cardExpirationMonth: "",
        cardExpirationYear: "",
        billAddress1: "",
        billAddress2: "",
        billCity: "",
        billState: "",
        billZip: "",
        specialInstructions: false,
        reciprocity,
        emailTo,
        tempCode: tokenSession.value,
        total: $moStore.getCartData?.totalNoFee || 0,
        SendEmail: $moStore.showEmailReceiptTo,
      }



      switch (paymentType) {

        case 1: {
          const form: FormComposition<PaymentFormInterface> | undefined = $moStore.paymentForm.form
          if (!form) return
          const formData = form.getFormValue()
          const date = formData.date?.split('/')

          data = {
            ...data,
            ...formData,
            cardExpirationMonth: date![0] || "",
            cardExpirationYear: date![1] || "",
            paymentType: "Credit Card",
            paymentMethod: "Credit Card",
          } as unknown as MemberCreateOrderFormInterface
          if ($moStore.showFee)
            data.total = $moStore.getCartData?.total || 0
          break;
        }
        case 2: {
          const form: FormComposition<PaymentFormInterface> | undefined = $moStore.paymentForm.checkForm
          if (!form) return
          const formData = form.getFormValue()

          data = {
            ...data,
            ...formData,
            paymentType: "Check",
            paymentMethod: "Check",
          } as unknown as MemberCreateOrderFormInterface
          break;
        }
        default: {
          data.paymentMethod = "Invoice";
          data.paymentType = "Invoice";
          break;
        }

      }


      const resp = await placeOrder({
        memberGuid: mGuid.value,
        memberId: memberId.value
      }, data, {
        dontRedirect: true,
        loading: {
          message: `Loading...`
        },
        useRespAsError: true,
        dontShowToast: true
      })


      // const isSuccess = resp.ok && resp.data.toLowerCase().includes('success')

      showToast(resp.ok,
        resp.data ? resp.data :
          `Order placed`, resp.data ? `${resp.data}` : 'Something went wrong placing the order, please try again later')

      if (resp.ok) {
        $moStore.resetPaymentForm()

        //TODO: remove this if transaction is returned
        const [transactions, topTransactions] = await Promise.all([
          getTransactionsByMemberId($mStore.selectedMember?.memberId || 0),
          getTopTransactions(),
          showRecordPaymentBtn_co(Number(memberId.value))
        ])



        if (topTransactions.ok)
          $dStore.setTopTransactions(topTransactions.data)

        if (transactions.ok)
          $mStore.setMemberTransactions(transactions.data)

        $router.push({
          name: 'MemberLayout',
          params: {
            memberId: memberId.value
          }
        })
      }


    },
  }
};
