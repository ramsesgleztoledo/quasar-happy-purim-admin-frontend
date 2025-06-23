/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed } from "vue";
import { useMemberStore } from "../store/memberStore/memberStore";
import { useMemberService } from "../services/member.service";
import { useQuasar } from "quasar";
import { useCategoryService } from "../services/category.service";
import type { AlternativeMemberAddress, EmailLoginCodeInfoInterface, MemberAddFormInterface, MemberDataInterface, MemberDonateBasketOptionInterface, MemberHiddenInterface, MemberTransactionInterface, MemberUpdateAllDataForm, PendingDeletionInterface } from "../interfaces/member-interfaces";
import type { MemberReciprocityInterface } from '../interfaces/member-interfaces';
import type { MemberCategoryInterface } from "../interfaces/category-interfaces";
import type { ApiCallResponseInterface } from "src/services/api-interfaces";
import { useUI } from "src/modules/UI/composables";
import { useRouter } from "vue-router";


export const useMember = () => {


  const $mStore = useMemberStore()
  const $q = useQuasar()
  const { downloadFile } = useUI()
  const $router = useRouter()

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
    updateAlternativeAddressByMemberId,
    addMember,

  } = useMemberService()

  const { getCategoriesByMemberId } = useCategoryService()

  // to return

  const memberState = computed(() => $mStore.$state);

  const getMembers_Co = async () => {
    const members = await getMembersList({
      loading: {
        message: 'loading members...'
      }
    })

    $mStore.$patch({
      members: members.ok ? members.data : [],
    });
  };
  const getMemberDataById_Co = async (memberId: number) => {

    $q.loading.show({
      message: `loading member data ${memberId}...`,
      spinnerColor: '#ef6982',
      messageColor: '#ef6982',
    })



    const promises: [
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
    ] = [
        getMemberById(memberId),
        getHiddenByMemberId(memberId),
        getReciprocityByMemberId(memberId),
        getCategoriesByMemberId(memberId),
        getIsPendingDeletionByMemberId(memberId),
        getAlternativeAddressByMemberId(memberId),
        getTransactionsByMemberId(memberId),
        getMemberDonateBasketOptionByMemberId(memberId),
      ]

    try {

      const [
        member,
        hidden,
        reciprocity,
        categories,
        isPendingDeletion,
        alternativeAddress,
        memberTransactions,
        memberDonateBasketOption,
      ]: [
          ApiCallResponseInterface<MemberDataInterface>,
          ApiCallResponseInterface<MemberHiddenInterface>,
          ApiCallResponseInterface<MemberReciprocityInterface>,
          ApiCallResponseInterface<MemberCategoryInterface[]>,
          ApiCallResponseInterface<PendingDeletionInterface>,
          ApiCallResponseInterface<AlternativeMemberAddress>,
          ApiCallResponseInterface<MemberTransactionInterface[]>,
          ApiCallResponseInterface<MemberDonateBasketOptionInterface>
        ] = await Promise.all(promises)


      $mStore.setSelectedMember(member.ok ? member.data : undefined)
      $mStore.setMemberCategories(categories.ok ? categories.data : [])
      $mStore.setMemberAlternativeAddress(alternativeAddress.ok ? alternativeAddress.data : undefined)
      $mStore.setMemberTransactions(memberTransactions.ok ? memberTransactions.data : [])
      $mStore.setMemberDonateBasketOption(memberDonateBasketOption.ok ? memberDonateBasketOption.data : undefined)

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

    } catch (error) {
      console.error(error);
    }
    $q.loading.hide()
  };
  const deleteMemberById_Co = async (memberId: number) => {

    const isPending = $mStore.isPendingDeletion

    const response = await deleteMemberById(memberId, {
      loading: {
        message: `${isPending ? 'restoring' : 'deleting'} member${memberId}...`
      },
      dontRedirect: true
    })

    if (response.ok) {
      $q.notify({
        color: 'blue',
        textColor: 'white',
        icon: 'error',
        message: !isPending ? `Member set to delete` : 'Member restore',
      })
      $mStore.setIsPendingDeletion(!isPending)
    }
    else {
      $q.notify({
        color: 'red',
        textColor: 'white',
        icon: 'error',
        message: `${response.data}`,
      })
    }


  };

  const updateMember_Co = async (memberId: number, data: MemberUpdateAllDataForm) => {

    $q.loading.show({
      message: `Updating member data ${memberId}...`,
      spinnerColor: '#ef6982',
      messageColor: '#ef6982',
    })

    const [resp1, resp2, resp3, resp4]: [
      ApiCallResponseInterface<unknown>,
      ApiCallResponseInterface<unknown>,
      ApiCallResponseInterface<unknown>,
      ApiCallResponseInterface<unknown>,
    ] =

      await Promise.all([updateReciprocityByMemberId(memberId, data.reciprocity, {
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
      })

      ])

    let resp5 = undefined
    if (data.donate !== undefined)
      resp5 = await updateMemberDonateBasketOptionByMemberId(memberId, !!data.donate, {
        dontRedirect: true
      });



    if (!resp1.ok || !resp2.ok || !resp3.ok || !resp4.ok || (resp5 !== undefined && !resp5.ok))

      $q.notify({
        color: 'red',
        textColor: 'black',
        icon: 'error',
        message: 'Something went wrong updating part of this member, please try again later',
      })
    else
      $q.notify({
        color: 'blue',
        textColor: 'black',
        icon: 'error',
        message: 'Member updated',
      })

    if (resp3.ok)
      $mStore.setHidden(data.hidden)

    $q.loading.hide()
  };
  const clearMemberCart_Co = async (memberId: number) => {
    try {
      $q.loading.show({
        message: `Clearing member's cart ${memberId}...`,
        spinnerColor: '#ef6982',
        messageColor: '#ef6982',
      })
      await clearCartByMemberId(memberId)

      $q.notify({
        color: 'blue',
        textColor: 'black',
        icon: 'error',
        message: `Member's cart cleared`,
      })

    } catch (error) {
      console.error(error);
    }
    $q.loading.hide()
  };
  const getEmailLoginCodeInfo_Co = async (memberId: number): Promise<EmailLoginCodeInfoInterface> => {
    const emailCodeInfo = await getEmailLoginCodeInfo(memberId, {
      loading: {
        message: `Loading ...`
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
    await downloadFile(downloadMembersLogged, 'csv', 'members-logged')
  };
  const getBasketReceived_Co = async () => {
    const resp = await getBasketReceived({
      loading: {
        message: 'Loading received baskets ...'
      }
    })

    return resp.ok ? resp.data : []
  };
  const downloadBasketReceived_Co = async (): Promise<any> => {
    await downloadFile(downloadBasketReceived, 'csv', 'baskets-to-delivery')
  };
  const getMemberPersonalBasket_Co = async () => {
    const resp = await getMemberPersonalBasket({
      loading: {
        message: 'Loading personal baskets ...'
      }
    })

    return resp.ok ? resp.data : []
  };
  const downloadMemberPersonalBasketCSV_Co = async (): Promise<any> => {
    await downloadFile(downloadMemberPersonalBasketCSV, 'csv', 'personal-baskets')
  };
  const addMember_Co = async (data: MemberAddFormInterface) => {
    const resp = await addMember(data, {
      loading: {
        message: 'Adding member...'
      }
    })

    if (resp.ok) {
      $q.notify({
        color: 'green',
        textColor: 'black',
        icon: 'error',
        message: 'Member added',
      })

      $router.push({
        name: 'MemberLayout',
        params: {
          memberId: resp.data.memberId
        }
      })
    }
    else {
      $q.notify({
        color: 'red',
        textColor: 'black',
        icon: 'error',
        message: `something went wrong adding a new member`,
      })
    }
  };





  return {
    memberState,
    getMembers_Co,
    getMemberDataById_Co,
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
  };
}
