import type { RouteRecordRaw } from "vue-router";
import { memberRoutes } from "../pages/MemberSettingsPage/router";
import isAuth from "src/modules/auth/guards/auth.guard";

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'DashboardLayout',
    beforeEnter: [isAuth],
    component: () =>
      import(/* webpackChunkName: "DashboardLayout" */ "../layout/DashboardLayout.vue"),
    redirect: { name: 'dashboard-DashboardPage', },
    children: [
      {
        path: '',
        name: 'dashboard-DashboardPage',
        component: () =>
          import(/* webpackChunkName: "dashboard-DashboardPage" */ "../pages/DashboardPage/DashboardPage.vue"),
      }
      ,
      ...memberRoutes
      ,
      {
        path: 'site-manager',
        name: 'dashboard-SiteManagerPage',
        redirect: { name: 'dashboard-SiteManagerPage-BasicSettingsPage', },
        children: [
          {
            path: '',
            redirect: { name: 'dashboard-SiteManagerPage-BasicSettingsPage' },
            name: 'site-manager-root'
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
          import(/* webpackChunkName: "dashboard-OrderArchivePage" */ "../pages/OrderArchivePage/OrderArchivePage.vue"),
      }
      ,
      {
        path: 'mail-merge-reports',
        name: 'dashboard-MailMergeReportsPage',
        redirect: { name: 'MailMergeReportsPage-MailMergeReportsPage' },
        children: [
          {
            path: '',
            name: 'MailMergeReportsPage-MailMergeReportsPage',
            component: () =>
              import(/* webpackChunkName: "MailMergeReportsPage-MailMergeReportsPage" */ "../pages/MailMergeReportsPage/pages/MailMergeReportsPage/MailMergeReportsPage.vue"),
          },
          {
            path: ':reportId',
            name: 'MailMergeReportsPage-MailMergePage',
            component: () =>
              import(/* webpackChunkName: "MailMergeReportsPage-MailMergePage" */ "../pages/MailMergeReportsPage/pages/MailMergePage/MailMergePage.vue"),
          },
        ]
      }
      ,
      {
        path: 'print-labels',
        name: 'dashboard-PrintLabelsPage',
        component: () =>
          import(/* webpackChunkName: "dashboard-PrintLabelsPage" */ "../pages/PrintLabelsPage/PrintLabelsPage.vue"),
      }
      ,
      {
        path: 'email-stats',
        name: 'dashboard-EmailStatsPage',
        redirect: { name: 'EmailStatsPage-Email' },

        children: [
          {
            path: '',
            name: 'EmailStatsPage-Email',
            component: () =>
              import(/* webpackChunkName: "EmailStatsPage-Email" */ "../pages/EmailStatsPage/pages/EmailStatsPage/EmailStatsPage.vue"),
          },
          {
            path: ':campaignId',
            name: 'EmailStatsPage-campaign',
            component: () =>
              import(/* webpackChunkName: "EmailStatsPage-campaign" */ "../pages/EmailStatsPage/pages/EmailStatsCampaignPage/EmailStatsCampaignPage.vue"),
          },
        ]

      }

    ]
  }
]
