
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { adminUserStateInterface } from './adminUser-store-interfaces';
import type { AdminUserInterface } from '../../interfaces/admin-user.interface';


const initialState: adminUserStateInterface = {
  users: [],
}

export const useUserAdminStore = defineStore('userAdminStore', {
  state: (): adminUserStateInterface => ({
    ...initialState
  }),

  getters: {

  },

  actions: {
    setUsers(users: AdminUserInterface[]) {
      this.users = users.map(item => ({ ...item }));
    },


  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserAdminStore, import.meta.hot));
}
