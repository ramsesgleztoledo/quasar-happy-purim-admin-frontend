import type { RouteRecordRaw } from "vue-router";

export const memberRoutes: RouteRecordRaw[] = [
  {
    path: 'members-settings',
    name: 'MembersSettingsPage',
    redirect: { name: 'MembersSettingsPage-home', },
    component: () =>
      import(/* webpackChunkName: "members-settings" */ "../layout/MemberLayout.vue"),
    children: [

      {
        path: '',
        name: 'MembersSettingsPage-home',
        component: () =>
          import(/* webpackChunkName: "MembersSettingsPage-home" */ "../MemberSettingsPage.vue"),
      },
      {
        path: 'add-member',
        name: 'MembersSettingsPage-AddMemberPage',
        component: () =>
          import(/* webpackChunkName: "MembersSettingsPage-AddMemberPage" */ "../pages/AddMemberPage/AddMemberPage.vue"),
      },
      {
        path: 'member/:memberId',
        name: 'MemberLayout',
        component: () =>
          import(/* webpackChunkName: "MemberLayout" */ "../pages/MemberPage/layout/MemberLayout.vue"),
        redirect: { name: 'MemberLayout-MemberPage' },
        children: [

          {
            path: '',
            name: 'MemberLayout-MemberPage',
            component: () =>
              import(/* webpackChunkName: "MemberLayout-MemberPage" */ "../pages/MemberPage/pages/MemberPage/MemberPage.vue"),
          },
          {
            path: 'create-order',
            name: 'MemberLayout-CreateOrderPage',
            component: () =>
              import(/* webpackChunkName: "MemberLayout-CreateOrderPage" */ "../pages/MemberPage/pages/CreateOrder/CreateOrderPage.vue"),
          },
          {
            path: 'create-order-by-code',
            name: 'MemberLayout-CreateOrderPageByCode',
            component: () =>
              import(/* webpackChunkName: "MemberLayout-CreateOrderPageByCode" */ "../pages/MemberPage/pages/CreateOrderByCode/CreateOrderByCode.vue"),
          },
        ]

      },
      {
        path: 'member-list-upload',
        name: 'MembersSettingsPage-MemberListLayout',
        component: () =>
          import(/* webpackChunkName: "MembersSettingsPage-MemberListLayout" */ "../pages/MemberListPage/layout/MemberListLayout.vue"),
      }



    ]
  }
]
// CreateOrder
