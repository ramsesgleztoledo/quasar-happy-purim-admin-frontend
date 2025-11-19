import { useUI } from "src/modules/UI/composables";
import type { AddDraftFormInterface, DraftInterface } from "../interfaces/draft.interfaces";
import { useDraftsService } from "../services/drafts.service";

export const useDraft = () => {

  const { getDrafts, deleteDrafts, addDrafts } = useDraftsService()
  const { showToast } = useUI()


  return {
    async getDrafts() {
      const resp = await getDrafts(0, 999999, {

      })
      return resp.ok ? resp.data : []

    },

    async deleteDraft(draft: DraftInterface) {
      const resp = await deleteDrafts(draft.draftId, {
        loading: {
          message: 'Loading...',
        },
      })
      showToast(resp.ok, 'Draft Deleted',
        'Something went wrong deleting the draft')

      return resp.ok
    },

    async addDrafts(data: AddDraftFormInterface) {
      const resp = await addDrafts(data,
        {
          dontRedirect: true,
          loading: {
            message: 'Loading...',
          },
        },
      )
      showToast(resp.ok, 'Draft Saved',
        'Something went wrong adding the draft')

    },

  }
};
