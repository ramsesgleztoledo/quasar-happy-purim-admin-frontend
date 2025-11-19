import { useUI } from "src/modules/UI/composables";
import type { AddUserFormInterface, EditUserFormType } from "../interfaces/admin-user.interface";
import { useAdminUserService } from "../services/adminUser.service";
import { useUserAdminStore } from "../store/adminUserStore/adminUserStore";

export const useUserAdmin = () => {
  const { getAllAdmins, addAdmin, editAdmin, setNewPassword, deleteUser } = useAdminUserService()
  const $uaStore = useUserAdminStore()
  const { showToast } = useUI()

  const getUsers = async () => {
    const resp = await getAllAdmins({
      loading: {
        message: 'Loading...'
      }
    })
    $uaStore.$patch({
      users: resp.ok ? resp.data : []
    })
  }

  return {
    getUsers,

    async addUser(data: AddUserFormInterface) {
      const resp = await addAdmin(data, {
        dontRedirect: true,
        loading: {
          message: 'Loading...'
        }

      })
      if (resp.ok) {
        await getUsers()
        return {
          ok: true,
          msg: ""
        }
      }
      else
        return {
          ok: false,
          msg: `${resp.data}`,
        }

    },
    async editAdmin(data: EditUserFormType) {
      const resp = await editAdmin(data, {
        dontRedirect: true,
        loading: {
          message: 'Loading...'
        }
      })
      showToast(resp.ok, 'Admin Updated Successfully', 'Something went wrong updating the admin')

      if (resp.ok)
        await getUsers()

      return resp.ok

    },
    async setNewPassword(data: {
      userId: number;
      password: string;
    }) {
      const resp = await setNewPassword(data, {
        dontRedirect: true,
        loading: {
          message: 'Loading...'
        }
      })
      showToast(resp.ok, 'Password Updated', 'Something went wrong updating the password')

    },

    async deleteUser(userId: number) {
      const resp = await deleteUser(userId, {
        dontRedirect: true,
        loading: {
          message: 'Loading...'
        }
      })
      showToast(resp.ok, 'Admin Deleted', 'Something went wrong deleting the user')
      if (resp.ok)
        $uaStore.setUsers($uaStore.users.filter(item => item.uId !== userId))


    },

  }
};
