import { useApiCall } from "src/services/apiCall";
import type { MemberCategoryInterface, ShulCategoryInterface } from "../interfaces/category-interfaces";
import type { ApiCallResponseInterface, ExtraOptionsInterface } from "src/services/api-interfaces";




export const useCategoryService = () => {

  const baseUrl = '/Categories'
  const { apiCall } = useApiCall()

  return {

    getShulCategories: async (extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<ShulCategoryInterface[]>> => {
      const nextUrl = `/get-all-categories-for-shul`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },
    getCategoriesByMemberId: async (memberId: number, extraOptions?: ExtraOptionsInterface): Promise<ApiCallResponseInterface<MemberCategoryInterface[]>> => {

      const nextUrl = `/get-categories-for-member/${memberId}`;
      const url = `${baseUrl}${nextUrl}`;
      return await apiCall({
        url,
        extraOptions
      })
    },


  }













}
