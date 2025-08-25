import { computed } from "vue";
import { useCalculateService } from "../services/Calculate.service";
import { useMemberOrderStore } from "../store/memberOrderStore/memberOrderStore";
import { useMember } from "./useMember";


export const useCalculate = () => {
  const { CalculateTotal } = useCalculateService()
  const { memberState } = useMember()


  const $moStore = useMemberOrderStore()

  const mGuid = computed(() => memberState.value.selectedMember?.memberGuid || '')

  const memberId = computed(() => memberState.value.selectedMember?.memberId || 0)


  return {
    async setBackendTotal() {
      const resp = await CalculateTotal(mGuid.value, memberId.value, {
        dontRedirect: true,
        dontShowToast: true,
        dontUseErrorAction: true,
      })
      $moStore.setTotalFromBackend(resp.ok ? resp.data : 0);

    },


  }
};
