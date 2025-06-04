import { dashboardRoutes } from 'src/modules/dashboard/router/routes';
import type { RouteRecordRaw } from 'vue-router';
import { errorRoutes } from './error-routes';
import { authRoutes } from 'src/modules/auth/router/routes';

const routes: RouteRecordRaw[] = [

  //?  Root route
  {
    path: '/',
    redirect: { name: 'dashboard-DashboardPage' },
  },

  //* dashboard routes
  ...dashboardRoutes,

  //* auth routes
  ...authRoutes,

  //! Error routes
  ...errorRoutes,

];

export default routes;
