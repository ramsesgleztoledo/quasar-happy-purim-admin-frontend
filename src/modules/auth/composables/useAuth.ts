import { computed } from "vue";
import { useAuthStore } from "../store/auth.store";
import { useQuasar } from "quasar";
import type { authStateInterface } from "../store/auth-store-interfaces";
import { useDashboardStore } from "src/modules/dashboard/store/dashboardStore/dashboardStore";
import { useRouter } from "vue-router";
import { decodeJWT } from "src/helpers/JsonWebToken";
import { useEmailStore } from "src/modules/dashboard/store/emailStore/emailStore";
import { useAuthService } from "../service/auth.service";
import type { AuthJWTInterface } from "../interfaces/auth.interfaces";
import { useOrderArchiveStore } from "src/modules/dashboard/store/orderArchiveStore/orderArchiveStore";
import { useMemberStore } from "src/modules/dashboard/store/memberStore/memberStore";
import { useUserAdminStore } from "src/modules/dashboard/store/adminUserStore/adminUserStore";
import { useAdvancedSettingsStore } from "src/modules/dashboard/store/advanceSettingsStore/advancedSettingsStore";
import { useBasicSettingsStore } from "src/modules/dashboard/store/basicSettingsStore/basicSettingsStore";
import { useMemberOrderStore } from "src/modules/dashboard/store/memberOrderStore/memberOrderStore";
import { useReportStore } from "src/modules/dashboard/store/ReportStore/reportStore";

export const useAuth = () => {

  //* stores
  const $auStore = useUserAdminStore()
  const $asStore = useAdvancedSettingsStore()
  const $bsStore = useBasicSettingsStore()
  const $dStore = useDashboardStore()
  const $eStore = useEmailStore()
  const $moStore = useMemberOrderStore()
  const $mStore = useMemberStore()
  const $oStore = useOrderArchiveStore()
  const $rStore = useReportStore()
  const $aStore = useAuthStore()

  const { login: authLogin } = useAuthService()

  const $q = useQuasar();
  const $router = useRouter()
  let tokenTimeOut: NodeJS.Timeout | undefined = undefined;

  const authState = computed(() => $aStore.$state);

  const logOut = (goToLogin?: boolean) => {
    $q.localStorage.clear()
    $auStore.$reset()
    $asStore.$reset()
    $bsStore.$reset()
    $dStore.$reset()
    $eStore.$reset()
    $moStore.$reset()
    $mStore.$reset()
    $oStore.$reset()
    $rStore.$reset()
    $aStore.$reset()

    if (goToLogin)
      return $router.push({ name: 'authPage' })
    else
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

  const login = async (tokenUrl: string, dontRedirect?: boolean) => {
    try {

      const token = tokenUrl.split(' ').join('+')


      const result = await authLogin(token)

      if (!result || !result.ok)
        return logOut()
      const payload = decodeJWT<AuthJWTInterface>(result.data.accessToken)

      if (!payload)
        return logOut()


      const authState: authStateInterface = {
        shul: {
          shulId: payload.shulId,
          shulName: payload.shulName,
        },
        user: {
          id: payload.u_id,
          guid: payload.u_guid,
          firstName: payload.fname,
          lastName: payload.lname,
        },
        token: {
          token: result.data.accessToken,
          token_exp: payload.exp,
          refresh_token: token,

        },
        serverToken: {
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
          accessTokenExpires: result.data.accessTokenExpires,
        }
      }

      $aStore.$patch(authState)
      $q.localStorage.setItem('authState', $aStore.$state)
      prepareTokenTime(authState.token!.token_exp)

      if (!dontRedirect)
        return $router.push({ name: 'DashboardLayout' })

    } catch (error) {
      console.error(error);
      $q.notify({
        color: 'red',
        textColor: 'white',
        icon: 'error',
        message: 'Error authorizing the user',

      })
      return logOut()
    }
  }


  const refreshToken = () => {
    const token = authState.value.token?.refresh_token || ''
    login(token, true)
  }


  return {

    isAuthenticated: computed(() => $aStore.isAuthenticated),
    authState,
    // methods
    login,
    refreshToken,
    logOut,

    checkLocalStoreAuth: () => {
      const authState: authStateInterface | null = $q.localStorage.getItem('authState')
      if (authState) {
        $aStore.$patch(authState)
        prepareTokenTime(authState.token!.token_exp!)
      }
    }
  }

};
