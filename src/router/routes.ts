import { dashboardRoutes } from 'src/modules/dashboard/router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [

  //?  Root route
  {
    path: '/',
    redirect: { name: 'dashboard-DashboardPage' },
  },

  //* dashboard routes
  ...dashboardRoutes,

  //* auth routes
  {
    path: '/authenticate',
    component: () => import(/* webpackChunkName: "auth-page" */ '../modules/auth/pages/AuthPage.vue'),
    name: 'authPage',
  },

  //! Error routes

  {
    path: '/500',
    component: () => import(/* webpackChunkName: "500-page" */ 'pages/ErrorInternal.vue'),
    name: '500',
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "401-page" */ 'pages/ErrorUnauthorized.vue'),
    name: '401',
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import(/* webpackChunkName: "404-page" */ 'pages/ErrorNotFound.vue'),
    name: '404',
  },
];

export default routes;
