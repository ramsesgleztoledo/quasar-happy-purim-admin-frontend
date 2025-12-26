/* eslint-disable @typescript-eslint/no-unused-vars */


import { useReportStore } from "src/modules/dashboard/store/ReportStore/reportStore";
import type { LinksDataInterface, routeDataInterface, routeParamInterface } from "./breadcrumbs.interfaces";
import { useMemberStore } from "src/modules/dashboard/store/memberStore/memberStore";
import { computed } from "vue";
import { cutName } from "src/helpers/cutName";
import { useRoute } from "vue-router";
import { useDashboardStore } from "src/modules/dashboard/store/dashboardStore/dashboardStore";

export const useBreadcrumb = () => {


  const $rStore = useReportStore()
  const $dStore = useDashboardStore()
  const $mStore = useMemberStore()
  const $route = useRoute()


  const memberDname = computed(() => `${$mStore.selectedMember?.lastName}, ${$mStore.selectedMember?.firstName}`)


  const linksDataDev: LinksDataInterface[] = [];

  if (process.env.NODE_ENV === 'development')
    linksDataDev.push({
      title: 'go to Accounts (dev)',
      icon: 'person',
      name: 'accountPage',
    })


  const linksData: LinksDataInterface[] = [

    {
      title: 'Dashboard',
      icon: 'home',
      name: 'dashboard-DashboardPage',
      routeClass: [
        'dashboard-DashboardPage',
        'dashboard-itemDetailsPage',
        'dashboard-memberLoggedPage',
        'dashboard-donationPage',
        'dashboard-receivedBasketPage',
        'dashboard-BasketsToBeShipPage',
        'dashboard-personalBasketPage',
        'dashboard-transactionDetailsPage',
        'dashboard-reciprocityChargePage',

      ],
    },
    // {
    //   title: 'Member List',
    //   icon: 'group',
    //   name: 'MembersSettingsPage',
    //   routeClass: ['MembersSettingsPage', 'MembersSettingsPage-home'],
    // },
    {

      title: 'Transactions History',
      icon: 'receipt',
      name: 'dashboard-transactionPage',
      routeClass: ['dashboard-transactionPage',]
    },
    {
      title: 'Members',
      icon: 'groups',
      name: 'MembersSettingsPage',
      children: [
        {
          title: 'Member List',
          icon: 'group',
          name: 'MembersSettingsPage',
          routeClass: ['MembersSettingsPage', 'MembersSettingsPage-home'],
        },
        {

          title: 'Add Member',
          icon: 'person_add',
          name: 'MembersSettingsPage-AddMemberPage',

        },
        {

          title: 'Manage Member List',
          icon: 'upload',
          name: 'MembersSettingsPage-MemberListLayout',
          force: true,
        },
      ],


    },
    {
      title: 'Site Settings',
      icon: 'display_settings',
      name: 'dashboard-SiteManagerPage',

      children: [
        {

          title: 'Basic Settings',
          icon: 'settings',
          name: 'dashboard-SiteManagerPage-BasicSettingsPage',

        },
        {

          title: 'Advanced Settings',
          icon: 'settings_suggest',
          name: 'dashboard-SiteManagerPage-AdvanceSettingsPage',
        },
      ],

    },
    {

      title: 'Order Archive',
      icon: 'archive',
      name: 'dashboard-OrderArchivePage',
      routeClass: ['dashboard-OrderArchivePage', 'OrderArchivePage-orders']
    },
    // {

    //   title: 'Mail Merge & Reports',
    //   icon: 'email',
    //   name: 'dashboard-MailMergeReportsPage',
    //   routeClass: ['dashboard-MailMergeReportsPage', 'MailMergeReportsPage-MailMergeReportsPage']
    // },

    {

      title: 'Mail Merge & Reports',
      icon: 'receipt_long',
      name: 'dashboard-MailMergeReportsPage',
      routeClass: [
        'dashboard-MailMergeReportsPage',
        'MailMergeReportsPage-MailMergeReportsPage'

      ]
    },
    {

      title: 'Scheduled Emails',
      icon: 'forward_to_inbox',
      name: 'dashboard-ScheduledEmailsPage',
      routeClass: ['MailMergeReportsPage-ScheduleEmail',]
    },
    // {
    //   title: 'Reports & Mails',
    //   icon: 'email',
    //   name: 'dashboard-MailMergeReportsPage',

    //   children: [
    //     {

    //       title: 'Mail Merge & Reports',
    //       icon: 'receipt_long',
    //       name: 'dashboard-MailMergeReportsPage',
    //       routeClass: ['dashboard-MailMergeReportsPage', 'MailMergeReportsPage-MailMergeReportsPage']
    //     },
    //     {

    //       title: 'Scheduled Emails',
    //       icon: 'forward_to_inbox',
    //       name: 'MailMergeReportsPage-ScheduleEmail',
    //     },
    //   ],

    // },

    {

      title: 'Print & Labels',
      icon: 'print',
      name: 'dashboard-PrintLabelsPage',
    },
    {
      title: 'Email Stats',
      icon: 'query_stats',
      name: 'dashboard-EmailStatsPage',
      routeClass: ['dashboard-EmailStatsPage', 'EmailStatsPage-Email'],
    },
    {
      title: 'User Management',
      icon: 'person',
      name: 'dashboard-UserManagement',
      // routeClass: ['dashboard-EmailStatsPage', 'EmailStatsPage-Email'],
    },
    ...linksDataDev
  ]

  const routeInfo: routeDataInterface[] = [
    {
      title: 'Home',
      icon: 'home',
      name: 'DashboardLayout',
    },
    {
      title: 'Dashboard',
      icon: 'home',
      name: 'dashboard-DashboardPage',
    },
    {

      title: 'Item Details',
      icon: 'inventory',
      name: 'dashboard-itemDetailsPage',
      params: ['itemId'],
      queryParams: ['description'],
      titleParam: (
        // value?: routeParamInterface
      ) => `${$route.query.description || "Items"}`
      // `Items`
      //  - ${value?.itemId}`
    },
    {

      title: 'Members Logged In',
      icon: 'person',
      name: 'dashboard-memberLoggedPage',

    },
    {

      title: 'Required Baskets for Delivery',
      icon: 'shopping_basket',
      name: 'dashboard-receivedBasketPage',

    },
    {

      title: 'Baskets to be shipped',
      icon: 'shopping_basket',
      name: 'dashboard-BasketsToBeShipPage',

    },
    {

      title: 'Reciprocity Charges',
      icon: 'shopping_basket',
      name: 'dashboard-reciprocityChargePage',

    },
    {

      title: 'Transaction Details',
      icon: 'receipt',
      name: 'dashboard-transactionDetailsPage',
      params: ['transactionID'],
      titleParam: (
        // value?: routeParamInterface
      ) => `Transaction`
      // - ${value?.transactionID}`
    },
    {

      title: 'Personal Baskets',
      icon: 'shopping_basket',
      name: 'dashboard-personalBasketPage',

    },
    {

      title: 'Charity Breakdown',
      icon: 'volunteer_activism',
      name: 'dashboard-donationPage',

    },
    {

      title: 'Transactions History',
      icon: 'receipt',
      name: 'dashboard-transactionPage',

    },

    {

      title: 'Member List',
      icon: 'group',
      name: 'MembersSettingsPage',

    },
    {

      title: 'Members',
      icon: 'group',
      name: 'MembersSettingsPage-home',
      dontShow: true,
    },
    {

      title: 'Member',
      icon: 'group',
      name: 'MembersSettingsPage-MemberPage',

    },
    {

      title: 'Create Order',
      icon: 'add',
      name: 'MemberPage-CreateOrderPage',

    },

    {

      title: 'Site Settings',
      icon: 'display_settings',
      name: 'dashboard-SiteManagerPage',

    },
    {

      title: 'Basic Settings',
      icon: 'settings',
      name: 'dashboard-SiteManagerPage-BasicSettingsPage',

    },
    {

      title: 'Advanced Settings',
      icon: 'settings_suggest',
      name: 'dashboard-SiteManagerPage-AdvanceSettingsPage',

    },

    {

      title: 'Order Archive',
      icon: 'archive',
      name: 'dashboard-OrderArchivePage',

    },
    {

      title: 'Order Archive',
      icon: 'archive',
      name: 'OrderArchivePage-orders',
      dontShow: true,
    },
    {

      title: 'Order Details',
      icon: 'archive',
      name: 'OrderArchivePage-orderDetails',
      params: ['orderId'],
      titleParam: (
        // value?: routeParamInterface
      ) => `order`
      // - ${value?.orderId}`
    },
    {

      title: 'Reports',
      icon: 'email',
      name: 'dashboard-MailMergeReportsPage',
    },
    {

      title: 'Scheduled Emails',
      icon: 'forward_to_inbox',
      name: 'dashboard-ScheduledEmailsPage',
    },
    {

      title: 'View Emails',
      icon: 'email',
      name: 'MailMergeReportsPage-ScheduleEmailDetails',
    },
    {

      title: 'Mail Merge & Reports',
      icon: 'email',
      name: 'MailMergeReportsPage-MailMergeReportsPage',
      dontShow: true,
    },
    {

      title: 'Report',
      icon: 'report',
      name: 'MailMergeReportsPage-MailMergePageLayout',
      params: ['reportId'],
      titleParam: (
        // value?: routeParamInterface
      ) => cutName($rStore.getReportSelectedReportData?.name || 'Report', 44)
      // - ${value?.reportId}`
    },
    {

      title: 'Mail Merge & Reports',
      icon: 'email',
      name: 'MailMergeReportsPage-MailMergePage',
      params: ['reportId'],
      titleParam: (
        // value?: routeParamInterface
      ) => `Email & Print`
      // - ${value?.reportId}`
    },
    {

      title: 'Mail Merge & Reports',
      icon: 'email',
      name: 'MailMergeReportsPage-ViewReport',
      params: ['reportId'],
      titleParam: (
        // value?: routeParamInterface
      ) => `View`
      // - ${value?.reportId}`
    },
    {

      title: 'Print & Labels',
      icon: 'print',
      name: 'dashboard-PrintLabelsPage',

    },
    {

      title: 'Email Stats',
      icon: 'query_stats',
      name: 'dashboard-EmailStatsPage',

    },
    {

      title: 'Email Stats',
      icon: 'query_stats',
      name: 'EmailStatsPage-Email',
      dontShow: true,

    },
    {

      title: 'Campaign',
      icon: 'query_stats',
      name: 'EmailStatsPage-campaign',
      params: ['campaignId'],
      titleParam: (
        // value?: routeParamInterface
      ) => `Campaign`
      //  - ${value?.campaignId}`
    },
    {
      title: 'Member',
      icon: 'person',
      name: 'MemberLayout',
      params: ['memberId'],
      titleParam: (
        // value?: routeParamInterface
      ) => `${memberDname.value}`

      ,

    },
    // {
    //   title: 'Member Data',
    //   icon: 'data_object',
    //   name: 'MemberLayout-MemberPage',
    // },
    {
      title: 'Create Order',
      icon: 'add',
      name: 'MemberLayout-CreateOrderPage',
    },
    {
      title: 'Create Order By Code',
      icon: 'add',
      name: 'MemberLayout-CreateOrderPageByCode',
    },
    {
      title: 'Add Member',
      icon: 'add',
      name: 'MembersSettingsPage-AddMemberPage',
    },
    {
      title: 'Manage Member List',
      icon: 'upload',
      name: 'MembersSettingsPage-MemberListLayout',
    },
    {
      title: 'User Management',
      icon: 'person',
      name: 'dashboard-UserManagement',
    },

  ]

  return {
    linksData,
    routeInfo,
  }

};
