import { computed } from "vue";
import { useMemberStore } from "../store/memberStore/memberStore";
import { useUI } from "src/modules/UI/composables";
import { useCreateOrderByCodeService } from "../services/createOrderByCode.service";

export const useCreateOrderByCode = () => {

  const { getOrdersByCode, addOrdersByCode, deleteOrdersByCode } = useCreateOrderByCodeService()
  const $mStore = useMemberStore()

  const memberId = computed(() => $mStore.selectedMember?.memberId || 0)
  const { showToast } = useUI()

  return {

    async getOrdersByCode() {
      const resp = await getOrdersByCode(memberId.value, {
        loading: {
          message: 'Loading ...'
        }
      })
      return resp.ok ? resp.data.receivers : []
    },
    async addOrdersByCode(receiverMisc: number | string) {
      const resp = await addOrdersByCode(memberId.value, { receiverMisc }, {
        dontRedirect: true,
        loading: {
          message: 'Loading ...'
        }
      })
      showToast(resp.ok, 'success ...', `${resp.data}`)
      return resp.ok
    },
    async deleteOrdersByCode(receiverId: number) {
      const resp = await deleteOrdersByCode(memberId.value, receiverId, {
        dontRedirect: true,
        loading: {
          message: 'Loading ...'
        }
      })
      showToast(resp.ok, 'deleted ...', 'something went wrong ...')
      return resp.ok
    },

  }
};
