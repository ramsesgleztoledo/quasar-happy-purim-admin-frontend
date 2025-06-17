/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed } from "vue";
import { useMemberStore } from "../store/memberStore/memberStore";
import { useMemberService } from "../services/member.service";
import { useQuasar } from "quasar";
import { useCategoryService } from "../services/category.service";
import type { AlternativeMemberAddress, EmailLoginCodeInfoInterface, MemberDataInterface, MemberDonateBasketOptionInterface, MemberHiddenInterface, MemberTransactionInterface, PendingDeletionInterface } from "../interfaces/member-interfaces";
import type { MemberReciprocityInterface } from '../interfaces/member-interfaces';
import type { MemberCategoryInterface } from "../interfaces/category-interfaces";
import type { ApiCallResponseInterface } from "src/services/api-interfaces";


export const useMember = () => {


  const $mStore = useMemberStore()
  const $q = useQuasar()

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
  } = useMemberService()

  const { getCategoriesByMemberId } = useCategoryService()


  const getMembers = async () => {
    const members = await getMembersList({
      loading: {
        message: 'loading members...'
      }
    })

    $mStore.$patch({
      members: members.ok ? members.data : [],
    });
  };



  return {
    memberState: computed(() => $mStore.$state),
    getMembers,



    async getMemberDataById(memberId: number) {

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
    },
    async deleteMemberById(memberId: number) {

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


    },
    async updateMember(memberId: number, data: any) {
      try {
        $q.loading.show({
          message: `Updating member data ${memberId}...`,
          spinnerColor: '#ef6982',
          messageColor: '#ef6982',
        })


        const promises: [
          any,
        ] = [
            updateReciprocityByMemberId(memberId, data.reciprocityValue),
          ]
        await Promise.all(promises)

        await this.getMemberDataById(memberId);

        $q.notify({
          color: 'blue',
          textColor: 'black',
          icon: 'error',
          message: 'Member update',
        })

      } catch (error) {
        console.error(error);
      }
      $q.loading.hide()
    },
    async clearMemberCart(memberId: number) {
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
    },
    async getEmailLoginCodeInfo(memberId: number): Promise<EmailLoginCodeInfoInterface> {
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
    }
  };
}
