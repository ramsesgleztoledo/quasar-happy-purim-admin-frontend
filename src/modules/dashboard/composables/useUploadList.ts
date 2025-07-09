import { useUploadListService } from "../services/uploadList.service";
import type { UpdateAndValidateFormInterface } from "../interfaces/upload-list.interfaces";

export const useUploadList = () => {

  const { uploadMemberList, processAndMatch, getFieldOptions, updateAndValidate, checkMatchSrcDestKey, saveSelectionOptions, compareDataGetSummary } = useUploadListService()


  return {
    async uploadMemberList(file: File) {
      const resp = await uploadMemberList(file, {
        dontRedirect: true
      })

      return resp.ok ? resp.data : undefined
    },

    async processAndMatch(data: { filePath: string; sheetName: string; }) {
      const resp = await processAndMatch(data, {
        dontRedirect: true
      })

      return resp.ok ? resp.data : undefined
    },

    async getFieldOptions() {
      const resp = await getFieldOptions({
        loading: {
          message: 'loading'
        }
      })
      return resp.ok ? resp.data : []
    },
    async updateAndValidate(data: UpdateAndValidateFormInterface[]) {
      await updateAndValidate(data)
    },
    async checkMatchSrcDestKey(data: {
      sourceKey: string;
      destinationKey: string;
    }) {

      await checkMatchSrcDestKey({
        destinationKey: data.destinationKey,
        sourceKey: data.sourceKey
      })
    },
    async saveSelectionOptions(data: { add: boolean, update: boolean, delete: boolean }) {
      await saveSelectionOptions({
        add: data.add,
        update: data.update,
        delete: data.delete
      })
    },

    async compareDataGetSummary() {
      const resp = await compareDataGetSummary()
      return resp.ok ? resp.data : undefined
    }

  }
};
