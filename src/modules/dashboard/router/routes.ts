import type { RouteRecordRaw } from "vue-router";
import { memberRoutes } from "../pages/MemberSettingsPage/router/routes";
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
      },
      {
        path: 'item-details/:itemId',
        name: 'dashboard-itemDetailsPage',
        component: () =>
          import("../pages/ItemsPage/ItemsPage.vue"),
      },
      {
        path: 'member-logged',
        name: 'dashboard-memberLoggedPage',
        component: () =>
          import("../pages/MemberLoggedPage/MemberLoggedPage.vue"),
      },
      {
        path: 'transactions-history',
        name: 'dashboard-transactionPage',
        component: () =>
          import("../pages/TransactionPage/TransactionPage.vue"),
      },
      {
        path: 'donations-history',
        name: 'dashboard-donationPage',
        component: () =>
          import("../pages/DonationsPage/DonationsPage.vue"),
      },
      {
        path: 'received-baskets',
        name: 'dashboard-receivedBasketPage',
        component: () =>
          import("../pages/ReceivedBasketPage/ReceivedBasketPage.vue"),
      },
      {
        path: 'baskets-ship',
        name: 'dashboard-BasketsToBeShipPage',
        component: () =>
          import("../pages/BasketsToBeShipPage/BasketsToBeShipPage.vue"),
      },
      {
        path: 'personal-baskets',
        name: 'dashboard-personalBasketPage',
        component: () =>
          import("../pages/PersonalBasketPage/PersonalBasketPage.vue"),
      },
      {
        path: 'transaction-details/:transactionID',
        name: 'dashboard-transactionDetailsPage',
        component: () =>
          import("../pages/TransactionDetailsPage/TransactionDetailsPage.vue"),
      },
      {
        path: 'reciprocity-charge',
        name: 'dashboard-reciprocityChargePage',
        component: () =>
          import("../pages/ReciprocityChargePage/ReciprocityChargePage.vue"),
      },
      ...memberRoutes,
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
        redirect: { name: 'OrderArchivePage-orders' },
        children: [
          {
            path: '',
            name: 'OrderArchivePage-orders',
            component: () =>
              import(/* webpackChunkName: "dashboard-OrderArchivePage" */ "../pages/OrderArchivePage/pages/OrderArchivePage/OrderArchivePage.vue"),
          },
          {
            path: ':orderId',
            name: 'OrderArchivePage-orderDetails',
            component: () =>
              import(/* webpackChunkName: "dashboard-OrderArchivePage" */ "../pages/OrderArchivePage/pages/OrderDetailPage/OrderDetailPage.vue"),
          },
        ]
      },

      {
        path: 'scheduled-emails',
        name: 'dashboard-ScheduledEmailsPage',
        redirect: { name: 'MailMergeReportsPage-ScheduleEmail' },
        children: [
          {
            path: '',
            name: 'MailMergeReportsPage-ScheduleEmail',
            component: () =>
              import(/* webpackChunkName: "MailMergeReportsPage-MailMergeReportsPage" */ "../pages/ScheduleEmail/ScheduleEmail.vue"),
          },
          {
            path: '/:scheduledEmailId',
            name: 'MailMergeReportsPage-ScheduleEmailDetails',
            component: () =>
              import(/* webpackChunkName: "MailMergeReportsPage-MailMergeReportsPage" */ "../pages/ScheduleEmail/ViewScheduleEmail.vue"),
          },

        ]
      },




      {
        path: 'mail-merge-reports',
        name: 'dashboard-MailMergeReportsPage',
        redirect: { name: 'MailMergeReportsPage-MailMergeReportsPage' },
        component: () =>
          import(/* webpackChunkName: "MailMergeReportsPage-MailMergeReportsPage" */ "../pages/MailMergeReportsPage/layout/ReportsLayout.vue"),
        children: [
          {
            path: '',
            name: 'MailMergeReportsPage-MailMergeReportsPage',
            component: () =>
              import(/* webpackChunkName: "MailMergeReportsPage-MailMergeReportsPage" */ "../pages/MailMergeReportsPage/MailMergeReportsPage/MailMergeReportsPage.vue"),
          },



          {
            path: 'view/:reportId',
            name: 'MailMergeReportsPage-MailMergePageLayout',
            component: () =>
              import(/* webpackChunkName: "MailMergeReportsPage-MailMergePage" */ "../pages/MailMergeReportsPage/pages/layout/MailMergeLayout.vue"),
            redirect: {
              name: 'MailMergeReportsPage-ViewReport',
            },
            children: [
              {
                path: '',
                name: 'MailMergeReportsPage-ViewReport',
                component: () =>
                  import(/* webpackChunkName: "MailMergeReportsPage-MailMergePage" */ "../pages/MailMergeReportsPage/pages/ViewReport/ViewReport.vue"),
              },
              {
                path: 'email',
                name: 'MailMergeReportsPage-MailMergePage',
                component: () =>
                  import(/* webpackChunkName: "MailMergeReportsPage-MailMergePage" */ "../pages/MailMergeReportsPage/pages/MailMergePage/MailMergePage.vue"),
              },

            ]
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

      },
      {
        path: 'user-management',
        name: 'dashboard-UserManagement',
        component: () =>
          import(/* webpackChunkName: "dashboard-UserManagement" */ "../pages/UserManagementPage/layout/UserManagementLayout.vue"),

        // redirect: { name: 'OrderArchivePage-orders' },
        // children: [
        //   {
        //     path: '',
        //     name: 'OrderArchivePage-orders',
        //     component: () =>
        //       import(/* webpackChunkName: "dashboard-OrderArchivePage" */ "../pages/OrderArchivePage/pages/OrderArchivePage/OrderArchivePage.vue"),
        //   },
        //   {
        //     path: ':orderId',
        //     name: 'OrderArchivePage-orderDetails',
        //     component: () =>
        //       import(/* webpackChunkName: "dashboard-OrderArchivePage" */ "../pages/OrderArchivePage/pages/OrderDetailPage/OrderDetailPage.vue"),
        //   },
        // ]
      }

    ]
  }
]
