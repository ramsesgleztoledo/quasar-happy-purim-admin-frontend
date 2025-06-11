import { computed } from "vue";
import { useMemberStore } from "../store/memberStore/memberStore";
import { useMemberService } from "../services/member.service";
import { useQuasar } from "quasar";


export const useMember = () => {


  const $mStore = useMemberStore()
  const $q = useQuasar()

  const {
    getMembersList,
    getMemberById,
    deleteMemberById,
    getHiddenByMemberId,
    getReciprocityByMemberId,
  } = useMemberService()


  const getMembers = async () => {
    const members = await getMembersList({
      loading: {
        message: 'loading members...'
      }
    })
    $mStore.$patch({
      members,
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


      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const promises: any = [
        getMemberById(memberId),
        getHiddenByMemberId(memberId),
        getReciprocityByMemberId(memberId),
      ]

      try {
        const [member, hidden, reciprocity] = await Promise.all(promises)


        $mStore.setSelectedMember(member)
        $mStore.setMemberOptions({
          hidden: !!hidden?.m_hidden,
          reciprocity: {
            isReciprocal: !!reciprocity?.isReciprocal,
            showReciprocity: !!reciprocity?.showReciprocity
          }
        })

      } catch (error) {
        console.error(error);

      }

      $q.loading.hide()

    },
    async deleteMemberById(memberId: number) {
      await deleteMemberById(memberId, {
        loading: {
          message: `deleting member${memberId}...`
        }
      })
      $mStore.setSelectedMember(undefined)
      await getMembers()
      $q.notify({
        color: 'blue',
        textColor: 'white',
        icon: 'error',
        message: `Member deleted`,
      })
    },
  };
}
