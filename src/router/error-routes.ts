import type { RouteRecordRaw } from "vue-router";

export const errorRoutes: RouteRecordRaw[] = [
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
]
