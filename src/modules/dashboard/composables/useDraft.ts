import { useUI } from "src/modules/UI/composables";
import type { AddDraftFormInterface, DraftInterface } from "../interfaces/draft.interfaces";
import { useDraftsService } from "../services/drafts.service";

export const useDraft = () => {

  const { getDrafts, deleteDrafts, addDrafts } = useDraftsService()
  const { showToast } = useUI()


  return {
    async getDrafts() {
      const resp = await getDrafts(0, 999999, {
        loading: {
          message: 'Loading ...',
        },
      })
      return resp.ok ? resp.data : []

    },

    async deleteDraft(draft: DraftInterface) {
      const resp = await deleteDrafts(draft.draftId, {
        loading: {
          message: 'Deleting draft ...',
        },
      })
      showToast(resp.ok, 'Draft deleted successfully',
        'something went wrong deleting the draft')

      return resp.ok
    },

    async addDrafts(data: AddDraftFormInterface) {
      const resp = await addDrafts(data,
        {
          dontRedirect: true,
          loading: {
            message: 'Adding Draft',
          },
        },
      )
      showToast(resp.ok, 'Draft added successfully',
        'something went wrong adding the draft')

    },

  }
};
