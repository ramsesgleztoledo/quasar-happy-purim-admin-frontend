import { computed } from "vue";
import { useCalculateService } from "../services/Calculate.service";
import { useMemberOrderStore } from "../store/memberOrderStore/memberOrderStore";
import { useMember } from "./useMember";
import { useMemberOrder } from "./useMemberOrder";
// import { useUI } from "src/modules/UI/composables";


export const useCalculate = () => {
  const { CalculateTotal } = useCalculateService()
  const { memberState } = useMember()
  const { getNewData } = useMemberOrder()
  // const { showLoading, stopLoading } = useUI()

  const $moStore = useMemberOrderStore()

  const mGuid = computed(() => memberState.value.selectedMember?.memberGuid || '')

  const memberId = computed(() => memberState.value.selectedMember?.memberId || 0)


  return {
    async setBackendTotal() {
      // showLoading()
      const resp = await CalculateTotal(mGuid.value, memberId.value, {
        dontRedirect: true,
        dontShowToast: true,
        dontUseErrorAction: true,
      })
      $moStore.setTotalFromBackend(resp.ok ? resp.data : 0);
      await getNewData()
      // stopLoading()
    },


  }
};
