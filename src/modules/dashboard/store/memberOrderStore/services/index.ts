import type { CharityType, PaymentFormInterface } from "src/modules/dashboard/interfaces/memberOrder-interfaces"
import type { MemberOrderStateInterface } from "../memberOrder-store-interfaces"
import { getCustomShippingItemsTotalHelper, getMembersSelectedHelper } from "src/modules/dashboard/pages/MemberSettingsPage/pages/MemberPage/pages/CreateOrder/helpers/member-order-helpers"
import type { FormComposition } from "src/composables/useForm/interfaces"

export const s_orderTotal = (state: MemberOrderStateInterface) => {
  const memberSel = getMembersSelectedHelper({
    membersList: state.memberList.original,
    membersSelected: state.membersSelected,
    orderItems: state.orderItems,
    promotions: state.promotions,
  })

  const totalMembers = memberSel.reduce((pre, cur) =>
    pre + (cur.price || 0)
    , 0)

  const totalItems = state.orderItems.reduce((pre, cur) =>
    pre + ((cur.price || 0) * (cur.quantity || 1))
    , 0)

  const totalCustomShippingOptions = getCustomShippingItemsTotalHelper(state.customShippingItems, state.customShippingOptions)

  return totalMembers + totalItems + totalCustomShippingOptions
}

export const s_fee = (state: MemberOrderStateInterface) => {
  return state.orgSettings?.feeActive && state.orgSettings?.feeRequired ? {
    description: state.orgSettings?.feeDesc || "",
    perTransactionFee: state.orgSettings?.perTransactionFee || 0,
    creditCardFee: state.orgSettings.creditCardPercent || 0
  } : undefined
}

export const s_isPaymentFormInvalid = (state: MemberOrderStateInterface) => {
  if (!state.paymentForm.email) return true
  if (state.paymentForm.paymentType == 3) return false
  if (!state.paymentForm.form) return true
  const form: FormComposition<PaymentFormInterface> = state.paymentForm.form;

  return !form.isValidForm()
}

export const s_customShippingItemsTotal = (state: MemberOrderStateInterface) => { return getCustomShippingItemsTotalHelper(state.customShippingItems, state.customShippingOptions) }

export const s_donations = (state: MemberOrderStateInterface) => {
  const charitiesState = state.charityOptions
  const orderItems = state.orderItems
  const resp: CharityType[] = []

  for (let i = 0; i < charitiesState.length; i++) {
    const found = orderItems.find((item) => item.itemId === charitiesState[i]!.id)
    if (found)
      resp.push({
        ...charitiesState[i]!,
        value: found.price,
      })
  }


  const donationUse = state.orderItems.find((item) => item.itemId === 0)

  return {
    charities: resp,
    donationUse
  }
}

export const s_cartData = (state: MemberOrderStateInterface) => {

  const totalBefore = s_orderTotal(state)
  const fees = s_fee(state)

  /**============================================
   *               discounts
   *=============================================**/
  const disc = state.discounts.find((dis) => !dis.couponCodeRequired)


  let discount = undefined
  if (disc) {
    let totalCharities = 0

    const charities = s_donations(state)
    if (charities.charities && disc.discountPercent)
      totalCharities += charities.charities.reduce((pre, cur) => pre + cur.value, 0)
    if (charities.donationUse && disc.discountPercent)
      totalCharities += charities.donationUse.price

    const total = totalBefore - totalCharities || 0
    const value = (total * (disc.discountPercent || 0)) / 100
    discount = {
      ...disc,
      value,
    }

  }
  const discountValue = discount?.value || 0
  /**============================================
   *               fees
   *=============================================**/
  const percent = fees?.creditCardFee || 0
  const fee = ((totalBefore - discountValue) * percent) / 100
  /**============================================
   *               Total
   *=============================================**/
  const perTransactionFee = fees?.perTransactionFee || 0
  const finalTotal = totalBefore - discountValue + fee + perTransactionFee;

  return {
    totalBefore,
    discount,
    fee,
    finalTotal,
  }
}
