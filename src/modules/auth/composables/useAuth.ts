import { computed } from "vue";
import { useAuthStore } from "../store/auth.store";
import { useQuasar } from "quasar";
import type { authStateInterface } from "../store/auth-store-interfaces";
import { useDashboardStore } from "src/modules/dashboard/store/dashboardStore";
import { useRouter } from "vue-router";
import { decodeJWT } from "src/helpers/JsonWebToken";

export const useAuth = () => {

  const $aStore = useAuthStore()
  const $dStore = useDashboardStore()
  const $q = useQuasar();
  const $router = useRouter()
  let tokenTimeOut: NodeJS.Timeout | undefined = undefined;

  const state = computed(() => $aStore.$state);

  const logOut = () => {
    $q.localStorage.clear()
    $aStore.$reset()
    $dStore.$reset()
    return $router.push({ name: '401' })
  }
  const prepareTokenTime = (exp: number) => {


    const triggerTime = (exp - 600) * 1000; // 600 secs = 10 mins
    const now = Date.now(); //  msecs

    const delay = triggerTime - now;



    // console.log('delay here ===>', { exp, triggerTime, now, delay });


    if (delay > 0) {
      clearTimeout(tokenTimeOut);
      tokenTimeOut = setTimeout(() => {
        console.log('======== token if going to expire, refreshing ========');
        $q.notify({
          color: 'green',
          textColor: 'black',
          icon: 'error',
          message: 'token if going to expire, refreshing',

        })
        return refreshToken()
      }, delay);

    } else {
      console.log('======== token expired, login out ========');
      $q.notify({
        color: 'red',
        textColor: 'white',
        icon: 'error',
        message: 'token expired, login out',

      })
      return logOut()
    }

  };

  const login = (token: string, dontRedirect?: boolean) => {
    const payload = decodeJWT(token)
    const authState: authStateInterface = {
      company: null,
      user: null,
      token,
      token_exp: payload?.exp,
      refresh_token: token
    }
    $aStore.$patch(authState)
    $q.localStorage.setItem('authState', $aStore.$state)
    prepareTokenTime(authState.token_exp!)
    if (!dontRedirect)
      return $router.push({ name: 'DashboardLayout' })
  }


  const refreshToken = () => {
    const token = state.value.refresh_token || ''
    login(token)
  }


  return {

    isAuthenticated: computed(() => $aStore.isAuthenticated),
    state,

    // methods
    login,
    refreshToken,
    logOut,

    checkLocalStoreAuth: () => {
      const authState: authStateInterface | null = $q.localStorage.getItem('authState')
      if (authState) {
        $aStore.$patch(authState)
        prepareTokenTime(authState.token_exp!)
      }
    }



  }

};
