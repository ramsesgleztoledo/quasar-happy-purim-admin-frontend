import type { RouteRecordRaw } from 'vue-router';


const accountPage: RouteRecordRaw[] = []

if (process.env.NODE_ENV === 'development')
  accountPage.push({
    path: '/accounts',
    component: () => import(/* webpackChunkName: "account-page" */ '../pages/AccountsPage.vue'),
    name: 'accountPage',
  })



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
  ...accountPage
];
