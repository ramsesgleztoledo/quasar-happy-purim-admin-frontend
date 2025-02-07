

export interface LinksDataInterface {
  title: string
  name: string;
  routeClass?: string[];
  icon?: string;
  caption?: string;
  children?: LinksDataInterface[];
  disabled?: boolean
}

export const linksData: LinksDataInterface[] = [

  {
    title: 'Dashboard',
    icon: 'home',
    name: 'dashboard-DashboardPage',

  },
  {
    title: 'Members Settings',
    icon: 'group',
    name: 'MembersSettingsPage',
    routeClass: ['MembersSettingsPage', 'MembersSettingsPage-home'],
  },
  {
    title: 'Site Manager',
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
  },
  {

    title: 'Mail Merge & Reports',
    icon: 'email',
    name: 'dashboard-MailMergeReportsPage',
    routeClass: ['dashboard-MailMergeReportsPage', 'MailMergeReportsPage-MailMergeReportsPage']
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
    routeClass: ['dashboard-EmailStatsPage', 'EmailStatsPage-Email'],
  },
]


export interface routeParamInterface {
  [x: string]: string | string[] | undefined
}
export interface routeDataInterface {
  name: string
  icon: string
  title: string
  params?: string[]
  titleParam?: ((value?: routeParamInterface) => string);
}




export const routeInfo: routeDataInterface[] = [
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

    title: 'Members Settings',
    icon: 'group',
    name: 'MembersSettingsPage',

  },
  {

    title: 'Members List',
    icon: 'group',
    name: 'MembersSettingsPage-home',

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

    title: 'Site Manager',
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

    title: 'Mail Merge & Reports',
    icon: 'email',
    name: 'dashboard-MailMergeReportsPage',
  },
  {

    title: 'Mail Merge & Reports',
    icon: 'email',
    name: 'MailMergeReportsPage-MailMergeReportsPage',

  },
  {

    title: 'Mail Merge & Reports',
    icon: 'email',
    name: 'MailMergeReportsPage-MailMergePage',
    params: ['reportId'],
    titleParam: (value?: routeParamInterface) => `Campaign - ${value?.reportId}`
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

  },
  {

    title: 'Campaign',
    icon: 'query_stats',
    name: 'EmailStatsPage-campaign',
    params: ['campaignId'],
    titleParam: (value?: routeParamInterface) => `Campaign - ${value?.campaignId}`
  },
  {
    title: 'Member',
    icon: 'person',
    name: 'MemberLayout',
    params: ['memberId'],
    titleParam: (value?: routeParamInterface) => `Member - ${value?.memberId}`
  },
  {
    title: 'Member Data',
    icon: 'data_object',
    name: 'MemberLayout-MemberPage',
  },
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
    title: 'Upload Member List',
    icon: 'upload',
    name: 'MembersSettingsPage-MemberListLayout',
  },
]
