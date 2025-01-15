import type { RouteRecordRaw } from "vue-router";

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'DashboardLayout',
    component: () =>
      import(/* webpackChunkName: "DashboardLayout" */ "../layout/DashboardLayout.vue"),
    children: [
      {
        path: '',
        name: 'dashboard-DashboardPage',
        component: () =>
          import(/* webpackChunkName: "dashboard-DashboardPage" */ "../pages/DashboardPage/DashboardPage.vue"),
      }
      ,
      {
        path: 'members-settings',
        name: 'dashboard-MembersSettingsPage',
        component: () =>
          import(/* webpackChunkName: "dashboard-MembersSettingsPage" */ "../pages/MemberSettingsPage.vue"),
      }
      ,
      {
        path: 'site-manager',
        name: 'dashboard-SiteManagerPage',
        children: [
          {
            path: '',
            redirect: 'basic-settings'
          },
          {
            path: 'advance-settings',
            name: 'dashboard-SiteManagerPage-AdvanceSettingsPage',
            component: () =>
              import(/* webpackChunkName: "dashboard-SiteManagerPage-AdvanceSettingsPage" */ "../pages/SiteManager/AdvancedSettingsPage/AdvancedSettingsPage.vue"),
          },
          {
            path: 'basic-settings',
            name: 'dashboard-SiteManagerPage-BasicSettingsPage',
            component: () =>
              import(/* webpackChunkName: "dashboard-SiteManagerPage-BasicSettingsPage" */ "../pages/SiteManager/BasicSettingsPage/BasicSettingsPage.vue"),
          }
        ]
      }
      ,
      {
        path: 'order-archive',
        name: 'dashboard-OrderArchivePage',
        component: () =>
          import(/* webpackChunkName: "dashboard-OrderArchivePage" */ "../pages/OrderArchivePage.vue"),
      }
      ,
      {
        path: 'mail-merge-reports',
        name: 'dashboard-MailMergeReportsPage',
        component: () =>
          import(/* webpackChunkName: "dashboard-MailMergeReportsPage" */ "../pages/MailMergeReportsPage.vue"),
      }
      ,
      {
        path: 'print-labels',
        name: 'dashboard-PrintLabelsPage',
        component: () =>
          import(/* webpackChunkName: "dashboard-PrintLabelsPage" */ "../pages/PrintLabelsPage.vue"),
      }
      ,
      {
        path: 'email-stats',
        name: 'dashboard-EmailStatsPage',
        component: () =>
          import(/* webpackChunkName: "dashboard-EmailStatsPage" */ "../pages/EmailStatsPage.vue"),
      }
    ]
  }
]
