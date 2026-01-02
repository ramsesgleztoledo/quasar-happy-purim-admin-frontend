import type { CharityType, PaymentCheckFormInterface, PaymentFormInterface } from "src/modules/dashboard/interfaces/memberOrder-interfaces"
import type { MemberOrderStateInterface } from "../memberOrder-store-interfaces"
import {
  getCustomShippingItemsTotalHelper,
  getMembersSelectedHelper,
} from "src/modules/dashboard/pages/MemberSettingsPage/pages/MemberPage/pages/CreateOrder/helpers/member-order-helpers"
import type { FormComposition } from "src/composables/useForm/interfaces"

export const s_orderTotal = (state: MemberOrderStateInterface) => {
  // const memberSel = getMembersSelectedHelper(state)

  // const totalMembers = memberSel.reduce((pre, cur) =>
  //   pre + (cur.price || 0)
  //   , 0)

  const totalItems = state.orderItems.reduce((pre, cur) =>
    pre + ((cur.price || 0) * (cur.quantity || 0))
    , 0)

  const totalCustomShippingOptions = 0
  // getCustomShippingItemsTotalHelper(state)

  // return totalMembers +
  return totalItems + totalCustomShippingOptions
}

export const s_fee = (state: MemberOrderStateInterface) => {
  return {
    active: state.orgSettings?.feeActive || false,
    required: state.orgSettings?.feeRequired || false,
    description: state.orgSettings?.feeDesc || "",
    perTransactionFee: state.orgSettings?.perTransactionFee || 0,
    creditCardFee: state.orgSettings?.creditCardPercent || 0
  }
}

export const s_isPaymentFormInvalid = (state: MemberOrderStateInterface) => {
  if (!state.paymentForm.paymentType) return true

  const carData = s_cartData(state)

  if (!carData.totalNoFee) return true

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (state.showEmailReceiptTo && !regex.test(state.paymentForm.email)) return true
  if (state.paymentForm.paymentType == 3) return false

  if (state.paymentForm.paymentType == 1) {
    if (!state.paymentForm.form) return true
    const form: FormComposition<PaymentFormInterface> = state.paymentForm.form;

    return !form.isValidForm()
  }
  if (state.paymentForm.paymentType == 2) {
    if (!state.paymentForm.checkForm) return true
    const form: FormComposition<PaymentCheckFormInterface> = state.paymentForm.checkForm;
    return !form.isValidForm()
  }
}

export const s_customShippingItemsTotal = (state: MemberOrderStateInterface) => { return getCustomShippingItemsTotalHelper(state) }

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

export const s_hasExtraOptions = (state: MemberOrderStateInterface) => {
  return !!(state.addonSettings.enabled || state.charityOptions.length || state.additionalCharityOptions.length || (state.additionalOrderItemsSettings.enabled && state.additionalOrderOptions.length) || state.sendOutSettings.enabled)
}

export const s_cartData = (state: MemberOrderStateInterface) => {

  const totalBefore = s_orderTotal(state)
  const fees = s_fee(state)





  // const discountValue = discount?.value || 0
  /**============================================
   *               fees
   *=============================================**/
  // const percent = fees?.creditCardFee || 0
  // const fee = ((totalBefore - discountValue) * percent) / 100
  // fee per person



  const feePerperson = 0
  // if (state.shulSetting?.sMembershipfee)
  //   feePerperson = state.membersSelected.length * state.shulSetting?.sMembershipfee

  /**============================================
   *               Total
   *========
   =====================================**/

  let totalPriceMembers = 0

  if (!state.settings?.hasCustomPricing) {
    const memberSel = getMembersSelectedHelper(state)
    const totalMembers = memberSel.reduce((pre) =>
      pre + (state.shulSetting?.sPerperson || 0)
      , 0)
    totalPriceMembers = totalMembers

  }

  if (state.shulSetting?.sMaximum && totalPriceMembers > state.shulSetting?.sMaximum)
    totalPriceMembers = state.shulSetting.sMaximum


  let totalAux = totalBefore + feePerperson + (!state.totalFromBackend ? totalPriceMembers : state.totalFromBackend)



  /**============================================
   *               total charities
   *=============================================**/
  const disc = state.discounts.find((dis) => !dis.couponCodeRequired)

  let totalCharities = 0
  const charities = s_donations(state)
  if (disc?.excludeCharity) {
    if (charities.charities)
      totalCharities += charities.charities.reduce((pre, cur) => pre + cur.value, 0)
    if (charities.donationUse)
      totalCharities += charities.donationUse.price
  }
  /*============================ END OF SECTION ============================*/
  const totalNoCharities = totalAux - totalCharities
  /**========================================================================
   *                           discounts
   *========================================================================**/

  let discount = 0
  if (disc && disc.discountPercent)
    discount = (totalNoCharities * disc.discountPercent) / 100

  totalAux -= discount
  /*============================ END OF SECTION ============================*/



  let fee = 0
  if (fees.active)
    fee = totalAux * fees.creditCardFee / 100





  const total = totalAux + fee + fees.perTransactionFee

  return {
    totalBefore,
    discount: {
      name: disc?.name || "",
      value: discount,
      excludeCharity: disc?.excludeCharity || false
    },
    totalCharities,
    totalPriceMembers,
    total,
    totalNoFee: total - fee - fees.perTransactionFee - feePerperson,
    fees: {
      fee,
      perTransactionFee: fees.perTransactionFee,
      description: fees.description,
      feePerperson,
    },
  }
}
// export const s_cartData2 = (state: MemberOrderStateInterface) => {

//   const totalBefore = s_orderTotal(state)
//   const fees = s_fee(state)

//   /**============================================
//    *               discounts
//    *=============================================**/
//   const disc = state.discounts.find((dis) => !dis.couponCodeRequired)


//   let discount = undefined
//   if (disc) {
//     let totalCharities = 0

//     const charities = s_donations(state)
//     if (charities.charities && disc.discountPercent)
//       totalCharities += charities.charities.reduce((pre, cur) => pre + cur.value, 0)
//     if (charities.donationUse && disc.discountPercent)
//       totalCharities += charities.donationUse.price

//     const total = totalBefore - totalCharities || 0
//     const value = (total * (disc.discountPercent || 0)) / 100
//     discount = {
//       ...disc,
//       value,
//     }

//   }
//   const discountValue = discount?.value || 0
//   /**============================================
//    *               fees
//    *=============================================**/
//   const percent = fees?.creditCardFee || 0
//   const fee = ((totalBefore - discountValue) * percent) / 100
//   // fee per person
//   let feePerperson = 0
//   if (state.shulSetting?.sMembershipfee)
//     feePerperson = state.membersSelected.length * state.shulSetting?.sMembershipfee

//   /**============================================
//    *               Total
//    *=============================================**/
//   const perTransactionFee = fees?.perTransactionFee || 0
//   const finalTotal = totalBefore - discountValue + fee + feePerperson + perTransactionFee;

//   return {
//     totalBefore,
//     discount,
//     fee,
//     feePerperson,
//     finalTotal,
//   }
// }
