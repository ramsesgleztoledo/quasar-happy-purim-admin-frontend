/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed } from "vue";
import { useMemberStore } from "../store/memberStore/memberStore";
import { useMemberService } from "../services/member.service";
import { useQuasar } from "quasar";
import { useCategoryService } from "../services/category.service";
import type { AlternativeMemberAddress, DoorManStatusInterface, EmailLoginCodeInfoInterface, MemberAddFormInterface, MemberDonateBasketOptionInterface, MemberHiddenInterface, MemberProfileQuestionInterface, MembershipStatusInterface, MemberTransactionInterface, MemberUpdateAllDataForm, PendingDeletionInterface } from "../interfaces/member-interfaces";
import type { MemberReciprocityInterface } from '../interfaces/member-interfaces';
import type { MemberCategoryInterface } from "../interfaces/category-interfaces";
import type { ApiCallResponseInterface, } from "src/services/api-interfaces";
import { useUI } from "src/modules/UI/composables";



export const useMember = () => {


  const $mStore = useMemberStore()
  const $q = useQuasar()
  const { downloadFile, showToast } = useUI()


  const {
    getMembersList,
    getMemberById,
    deleteMemberById,
    getHiddenByMemberId,
    getReciprocityByMemberId,
    getIsPendingDeletionByMemberId,
    getAlternativeAddressByMemberId,
    getTransactionsByMemberId,
    updateReciprocityByMemberId,
    clearCartByMemberId,
    getMemberDonateBasketOptionByMemberId,
    getEmailLoginCodeInfo,
    downloadMembersLogged,
    getBasketReceived,
    downloadBasketReceived,
    getMemberPersonalBasket,
    downloadMemberPersonalBasketCSV,
    updateMemberByMemberId,
    updateHiddenByMemberId,
    updateMemberDonateBasketOptionByMemberId,
    getProfileQuestions,
    updateAlternativeAddressByMemberId,
    addMember,
    resetMemberLoginCode,
    emailReceiptByTransactionId,
    getDisplayChildren,
    updateProfileQuestions,
    getKJSettings,
    updateKJSettings,
    getMemberShipStatus,
    updateMemberShipStatus,
    getShowRecordPaymentBtn,
    getShowClearCart,
    searchMembers,
    getAllMemberInfo,
  } = useMemberService()



  const { getCategoriesByMemberId } = useCategoryService()

  // to return

  const memberState = computed(() => $mStore.$state);

  const getMembers_Co = async (filters: {
    search: string;
    categories: string | number;
  }) => {
    const members = await getMembersList(filters, {
      loading: {
        message: 'Loading...'
      }
    })

    if (members.ok)
      $mStore.$patch({
        members: members.data,
      });
  };
  const getMemberDataById_Co2 = async (memberId: number) => {

    $q.loading.show({
      message: `Loading...`,
      spinnerColor: '#f36b09',
      messageColor: '#f36b09',
    })

    const member = await getMemberById(memberId, {
      goBackIn400Error: true,
      toastByErrorCode: {
        404: 'Member Not Found'
      }
    })

    if (!member.ok)
      return

    const [
      hidden,
      reciprocity,
      categories,
      isPendingDeletion,
      alternativeAddress,
      memberTransactions,
      memberDonateBasketOption,
      profileQuestions,
      displayChildren,
      doorManSettings,
      membershipSettings,
      showRecordPaymentBtn,
      showClearCart,

    ]: [
        ApiCallResponseInterface<MemberHiddenInterface>,
        ApiCallResponseInterface<MemberReciprocityInterface>,
        ApiCallResponseInterface<MemberCategoryInterface[]>,
        ApiCallResponseInterface<PendingDeletionInterface>,
        ApiCallResponseInterface<AlternativeMemberAddress>,
        ApiCallResponseInterface<MemberTransactionInterface[]>,
        ApiCallResponseInterface<MemberDonateBasketOptionInterface>,
        ApiCallResponseInterface<MemberProfileQuestionInterface[]>,
        ApiCallResponseInterface<boolean>,
        ApiCallResponseInterface<DoorManStatusInterface>,
        ApiCallResponseInterface<MembershipStatusInterface>,
        ApiCallResponseInterface<{
          showRecordPaymentButton: boolean
        }>,
        ApiCallResponseInterface<boolean>,

      ] = await Promise.all([

        getHiddenByMemberId(memberId),
        getReciprocityByMemberId(memberId),
        getCategoriesByMemberId(memberId),
        getIsPendingDeletionByMemberId(memberId),
        getAlternativeAddressByMemberId(memberId),
        getTransactionsByMemberId(memberId),
        getMemberDonateBasketOptionByMemberId(memberId),
        getProfileQuestions(memberId),
        getDisplayChildren(memberId),
        getKJSettings(memberId),
        getMemberShipStatus(memberId),
        getShowRecordPaymentBtn(memberId),
        getShowClearCart(memberId)
      ]
      )


    $mStore.setDoorManSettings(doorManSettings.ok ? {
      show: !!doorManSettings.data.showKJRow,
      value: doorManSettings.data.rbl24HourSelectedIndex === 1
    } : {
      show: false,
      value: false
    })
    $mStore.setMembershipSettings(membershipSettings.ok ? membershipSettings.data : {
      checkedStatus: false,
      visible: false,
    })
    $mStore.setSelectedMember(member.ok ? member.data : undefined)
    $mStore.setDisplayChildren(displayChildren.ok ? displayChildren.data : false)
    $mStore.setShowRecordPaymentBtn(showRecordPaymentBtn.ok ? showRecordPaymentBtn.data.showRecordPaymentButton : false)
    $mStore.setMemberCategories(categories.ok ? categories.data : [])
    $mStore.setProfileQuestions(profileQuestions.ok ? profileQuestions.data : [])
    $mStore.setMemberAlternativeAddress(alternativeAddress.ok ? alternativeAddress.data : undefined)
    $mStore.setMemberTransactions(memberTransactions.ok ? memberTransactions.data : [])
    $mStore.setMemberDonateBasketOption(memberDonateBasketOption.ok ? memberDonateBasketOption.data : undefined)
    $mStore.setShowClearCart(showClearCart.ok ? showClearCart.data : false)

    if (isPendingDeletion.ok)
      $mStore.setIsPendingDeletion(!!isPendingDeletion.data?.isPendingDeletion)

    if (hidden.ok &&
      reciprocity.ok)
      $mStore.setMemberOptions({
        hidden: !!hidden.data?.m_hidden,
        reciprocity: {
          ...reciprocity?.data
        }
      })


    $q.loading.hide()
  };

  const getMemberDataById_Co = async (memberId: number) => {

    const { ok, data } = await getAllMemberInfo(memberId, {
      loading: {
        message: 'Loading...',
      },
      goBackIn400Error: true
    })


    if (!ok) return



    $mStore.$patch({
      doorManSettings: {
        show: !!data.doorman.showKJRow,
        value: !!data.doorman.rbl24HourSelectedIndex,
      },
      selectedMember: data.info,
      membershipSettings: {
        checkedStatus: !!data.membershipStatus.checkedStatus,
        visible: !!data.membershipStatus.visible
      },
      displayChildren: !!data.displayChildren,
      showRecordPaymentBtn: !!data.showRecordPayment,
      memberCategories: data.categories || [],
      profileQuestions: data.profileQuestions || [],
      memberAlternativeAddress: data.alternateDelivery,
      memberTransactions: data.transactions || [],
      memberDonateBasketOption: {
        checked: !!data.donateBasketChecked,
        text: data.donateBasketText || '',
        visible: !!data.donateBasketVisible
      },
      showClearCart: !!data.showClearCart,
      isPendingDeletion: !!data.pendingDeletion,
      memberOptions: {
        hidden: !!data.isHidden,
        reciprocity: {
          isReciprocal: !!data.reciprocity?.isReciprocal,
          showReciprocity: !!data.reciprocity?.showReciprocity,
        }
      }



    })


  };


  const deleteMemberById_Co = async (memberId: number) => {

    const isPending = $mStore.isPendingDeletion

    const response = await deleteMemberById(memberId, {
      loading: {
        // message: `${isPending ? 'restoring' : 'deleting'} member${memberId}...`
        message: 'Loading...'
      },
      dontRedirect: true,
      dontShowToast: true,
    })

    if (response.ok) {
      $q.notify({
        color: 'blue',
        textColor: 'black',
        icon: 'error',
        message: !isPending ? `Member flagged for deletion` : 'Member is no longer flagged for deletion',
      })
      $mStore.setIsPendingDeletion(!isPending)
    }
    else {
      $q.notify({
        color: 'red',
        textColor: 'black',
        icon: 'error',
        message: `${response.data}`,
      })
    }


  };

  const updateReciprocityByMemberId_Co = async (memberId: number, value: boolean) => {
    const resp = await updateReciprocityByMemberId(memberId, value, {
      dontRedirect: true
    })
    return resp.ok
  };


  const updateMember_Co = async (memberId: number, data: MemberUpdateAllDataForm) => {

    $q.loading.show({
      message: `Loading...`,
      spinnerColor: '#f36b09',
      messageColor: '#f36b09',
    })

    const [resp1, resp2, resp3,
      resp4,
    ]: [
        ApiCallResponseInterface<unknown>,
        ApiCallResponseInterface<unknown>,
        ApiCallResponseInterface<unknown>,
        ApiCallResponseInterface<unknown>,

      ] =

      await Promise.all([
        updateReciprocityByMemberId(memberId, data.reciprocity, {
          dontRedirect: true
        }),
        updateMemberByMemberId(memberId, data.memberData, {
          dontRedirect: true
        }),
        updateHiddenByMemberId(memberId, data.hidden, {
          dontRedirect: true
        }),
        updateAlternativeAddressByMemberId(memberId, data.altAddressData, {
          dontRedirect: true
        }),


      ])

    let resp6 = undefined;

    if (data.profileQuestions?.length)
      resp6 = await updateProfileQuestions(memberId, data.profileQuestions, {
        dontRedirect: true
      })


    let resp5 = undefined
    if (data.donate !== undefined)
      resp5 = await updateMemberDonateBasketOptionByMemberId(memberId, !!data.donate, {
        dontRedirect: true
      });

    let resp7 = undefined
    if ($mStore.$state.doorManSettings.show)
      resp7 = await updateKJSettings(memberId, data.doorManValue, {
        dontRedirect: true
      });

    let resp8 = undefined
    if ($mStore.$state.membershipSettings.visible)
      resp8 = await updateMemberShipStatus(memberId, data.membershipValue, {
        dontRedirect: true
      });


    let ok = true
    if (
      !resp1.ok
      || !resp2.ok
      || !resp3.ok
      || !resp4.ok
      || (resp5 !== undefined && !resp5.ok)
      || (resp7 !== undefined && !resp7.ok)
      || (resp8 !== undefined && !resp8.ok)
      || (resp6 !== undefined && !resp6.ok)) {
      ok = false
      $q.notify({
        color: 'red',
        textColor: 'black',
        icon: 'error',
        message: 'Oops! Something went wrong while updating this member, please try again shortly.',
      })
    }
    else
      $q.notify({
        color: 'green',
        textColor: 'black',
        icon: 'error',
        message: 'Member Updated',
      })

    if (resp3.ok)
      $mStore.setHidden(data.hidden)

    $q.loading.hide()

    if (!ok) return ok
    await getMemberDataById_Co(memberId)
    return ok


  };
  const clearMemberCart_Co = async (memberId: number) => {
    try {
      $q.loading.show({
        message: `Loading...`,
        spinnerColor: '#f36b09',
        messageColor: '#f36b09',
      })
      await clearCartByMemberId(memberId)

      $mStore.setShowClearCart(false)

      $q.notify({
        color: 'blue',
        textColor: 'black',
        icon: 'error',
        message: `Member’s Cart Cleared`,
      })

    } catch (error) {
      console.error(error);
    }
    $q.loading.hide()
  };
  const getEmailLoginCodeInfo_Co = async (memberId: number): Promise<EmailLoginCodeInfoInterface> => {
    const emailCodeInfo = await getEmailLoginCodeInfo(memberId, {
      loading: {
        message: `Loading...`
      },
    })

    return {
      toEmail: emailCodeInfo.ok ? emailCodeInfo.data.toEmail : "",
      fromEmail: emailCodeInfo.ok ? emailCodeInfo.data.fromEmail : "",
      fromName: emailCodeInfo.ok ? emailCodeInfo.data.fromName : "",
      subject: emailCodeInfo.ok ? emailCodeInfo.data.subject : "",
      body: emailCodeInfo.ok ? emailCodeInfo.data.body : "",
    }
  };
  const downloadMembersLogged_Co = async (): Promise<any> => {
    await downloadFile(downloadMembersLogged, {
      fileType: 'csv',
      fileName: 'members-logged'
    })
  };
  const getBasketReceived_Co = async () => {
    const resp = await getBasketReceived({
      loading: {
        message: 'Loading...'
      }
    })

    return resp.ok ? resp.data : []
  };
  const downloadBasketReceived_Co = async (): Promise<any> => {
    await downloadFile(downloadBasketReceived, {
      fileType: 'csv',
      fileName: 'baskets-to-deliver'
    })
  };
  const getMemberPersonalBasket_Co = async () => {
    const resp = await getMemberPersonalBasket({
      loading: {
        message: 'Loading...'
      }
    })

    return resp.ok ? resp.data : []
  };
  const downloadMemberPersonalBasketCSV_Co = async (): Promise<any> => {
    await downloadFile(downloadMemberPersonalBasketCSV, {
      fileType: 'csv',
      fileName: 'personal-baskets'
    })
  };
  const addMember_Co = async (data: MemberAddFormInterface) => {
    const resp = await addMember(data, {
      loading: {
        message: 'Loading...'
      }
    })

    showToast(resp.ok, 'Member Added', `Something went wrong adding a new member`)

    let id: number | string | undefined = undefined
    if (resp.ok || resp.data?.member?.length) {

      const member = resp.data.member[0]!
      id = member.m_id
      $mStore.$state.members.members.push(member)
    }

    return {
      ok: resp.ok,
      id
    }
  };
  const resetMemberLoginCode_Co = async (memberId: number) => {
    const resp = await resetMemberLoginCode(memberId, {
      loading: {
        message: 'Loading...'
      }
    })

    showToast(resp.ok, `The Login Code for this member has been reset
`, `Something went wrong resetting the login code for this member, please try again`)

    if (!resp.ok || !$mStore.selectedMember) return

    $mStore.selectedMember.loginCode = resp.data.loginCode || ""
    $mStore.selectedMember.signOnLink = resp.data.signOnLink || ""
  };

  const emailReceiptByTransactionId_Co = async (transactionId: number) => {
    const resp = await emailReceiptByTransactionId(transactionId, {
      dontRedirect: true,
      loading: {
        message: 'Loading...'
      }
    })

    showToast(resp.ok, resp.data ? resp.data : `Receipt email sent successfully`, resp.data ? resp.data : `Something went wrong sending the email, please try again`)


  };


  const getTransactionsByMemberSelected_co = async () => {
    if ($mStore.selectedMember?.memberId == null) return

    const transactions = await getTransactionsByMemberId($mStore.selectedMember.memberId);
    if (transactions.ok)
      $mStore.setMemberTransactions(transactions.data)

  };
  const getShowCart_co = async () => {
    if ($mStore.selectedMember?.memberId == null) return

    const resp = await getShowClearCart($mStore.selectedMember.memberId);
    if (resp.ok)
      $mStore.setShowClearCart(resp.data)

  };
  const searchMembers_co = async (query: string) => {
    const resp = await searchMembers(query, {
      dontRedirect: true,
      dontShowToast: true,

    });
    return resp.ok ? resp.data : []
  };

  const showRecordPaymentBtn_co = async (memberId: number) => {
    const resp = await getShowRecordPaymentBtn(memberId, {
      dontRedirect: true,
      dontShowToast: true,
    });
    $mStore.setShowRecordPaymentBtn(resp.ok ? resp.data.showRecordPaymentButton : false)
  };



  return {
    memberState,
    getMembers_Co,
    searchMembers_co,
    getMemberDataById_Co,
    getMemberDataById_Co2,
    deleteMemberById_Co,
    updateMember_Co,
    clearMemberCart_Co,
    getEmailLoginCodeInfo_Co,
    downloadMembersLogged_Co,
    getBasketReceived_Co,
    downloadBasketReceived_Co,
    getMemberPersonalBasket_Co,
    downloadMemberPersonalBasketCSV_Co,
    addMember_Co,
    resetMemberLoginCode_Co,
    emailReceiptByTransactionId_Co,
    getTransactionsByMemberSelected_co,
    getShowCart_co,
    showRecordPaymentBtn_co,
    updateReciprocityByMemberId_Co
  };
}
