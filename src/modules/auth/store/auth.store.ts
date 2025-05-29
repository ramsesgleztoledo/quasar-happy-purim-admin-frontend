
import { defineStore, acceptHMRUpdate } from 'pinia';
import type { authStateInterface } from './auth-store-interfaces';

const initialState: authStateInterface = {
  user: null,
  company: null,
  token: null,
  token_exp: null,
  refresh_token: null
}

export const useAuthStore = defineStore('authStore', {

  state: (): authStateInterface => ({
    ...initialState
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
    },

  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
