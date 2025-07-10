import { useLabelsAndOrdersheetService } from "../services/labelsAndOrdersheet.service";

export const useLabelsAndOrdersheet = () => {

  const { getLabelOption } = useLabelsAndOrdersheetService()


  return {
    async getLabelOption() {
      const resp = await getLabelOption({
        loading: {
          message: 'loading'
        }
      })
      return resp.ok ? resp.data : []
    },
  }
};
