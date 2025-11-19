import { useUploadListService } from "../services/uploadList.service";
import type { BackupUploadFormInterface, UpdateAndValidateFormInterface } from "../interfaces/upload-list.interfaces";
import { useUI } from "src/modules/UI/composables";


export const useUploadList = () => {

  const { uploadMemberList, processAndMatch, getFieldOptions, updateAndValidate, checkMatchSrcDestKey, saveSelectionOptions, compareDataGetSummary, getDestinationKeys, backupAndUpload, getDetailedChanges, revertChanges } = useUploadListService()
  const { showToast } = useUI()


  const getDetailedChanges_co = async (key: string, showLoading?: boolean) => {
    let data = {}
    if (showLoading)
      data = {
        loading: {
          message: 'loading'
        }
      }
    const resp = await getDetailedChanges(key, {
      ...data
    })
    return resp.ok ? resp.data : []
  };


  return {
    async getDestinationKeys() {
      const resp = await getDestinationKeys()

      return resp.ok ? resp.data : []
    },
    async uploadMemberList(file: File) {
      const resp = await uploadMemberList(file, {
        dontRedirect: true
      })

      return resp.ok ? resp.data : undefined
    },

    async processAndMatch(data: { filePath: string; sheetName: string; }) {
      const resp = await processAndMatch(data, {
        dontRedirect: true,
        dontShowToast: true,
      })

      return resp.ok ? resp.data : resp.data
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
      const resp = await updateAndValidate(data, {
        dontRedirect: true,
        dontShowToast: true,
      })

      return {
        ok: resp.ok,
        data: resp.data
      }
    },
    async checkMatchSrcDestKey(data: {
      sourceKey: string;
      destinationKey: string;
    }) {

      const resp = await checkMatchSrcDestKey({
        destinationKey: data.destinationKey,
        sourceKey: data.sourceKey
      },
        {
          dontRedirect: true,
          dontShowToast: true,
        })

      return resp

    },
    async saveSelectionOptions(data: { add: boolean, update: boolean, delete: boolean }) {
      await saveSelectionOptions({
        add: data.add,
        update: data.update,
        delete: data.delete
      })
    },

    async compareDataGetSummary() {
      const resp = await compareDataGetSummary({
        loading: {
          message: 'Loading.... This may take a few moments'
        }
      })
      return resp.ok ? resp.data : undefined
    },

    async backupAndUpload(data: BackupUploadFormInterface) {

      const resp = await backupAndUpload(data, {
        loading: {
          message: 'Loading...'
        }
      })

      showToast(resp.ok, 'Data Uploaded', 'Something went wrong uploading the data, please try again')
      return resp.ok

    },
    async revertChanges() {

      const resp = await revertChanges({
        loading: {
          message: 'Loading...'
        }
      })
      showToast(resp.ok, 'Data Reverted', 'Something went wrong reverting the data, please try again')
      return resp.ok

    },

    getDetailedChanges_co

  }
};
