import type { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw[] = [

  {
    path: '/authenticate',
    component: () => import(/* webpackChunkName: "auth-page" */ '../pages/AuthPage.vue'),
    name: 'authPage',
  },
  {
    path: '/logout',
    component: () => import(/* webpackChunkName: "LogOut-page" */ '../pages/LogOutPage.vue'),
    name: 'LogOutPage',
  },
];
