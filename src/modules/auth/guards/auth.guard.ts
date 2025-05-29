import type { RouteLocation, NavigationGuardNext } from 'vue-router';
import { useAuthStore } from '../store/auth.store';




const isAuth = async (to: RouteLocation, from: RouteLocation, next: NavigationGuardNext) => {

  const $aStore = useAuthStore()

  const homePath = !!to.fullPath.includes('dashboard');
  const authPath = !!to.fullPath.includes('auth');


  const isLogged: boolean = $aStore.isAuthenticated

  if (homePath && !isLogged) {
    return next({
      name: '401'
    })
  }
  if (authPath && isLogged) {

    if (from.name)
      return next({
        name: from.name
      })


    else
      return next({
        name: 'DashboardLayout'
      })

  }

  return next();

};

export default isAuth;
