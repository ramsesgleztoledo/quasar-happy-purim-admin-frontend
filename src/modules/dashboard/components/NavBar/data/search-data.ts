export interface PagesForSearchInterface {
  routeName: string;
  title: string;
  phrases: string[];
  icon: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
}


export const pagesForSearch: PagesForSearchInterface[] = [
  {
    routeName: 'MembersSettingsPage',
    title: 'Member List',
    icon: 'group',
    phrases: [
      'member list',
      'list',
      'member',
      'members',
      'show member list',
      'people',
      'see members'
    ]
  },
  {
    routeName: 'MembersSettingsPage-AddMemberPage',
    title: 'Add Member',
    icon: 'person',
    phrases: [
      'member',
      'add',
      'add member',
      'new member',
    ]
  },
  {
    routeName: 'MembersSettingsPage-MemberListLayout',
    title: 'Upload Member List',
    icon: 'upload',
    phrases: [
      'member',
      'upload member list',
      'list',
      'upload file',
      'update member list',
    ]
  },
  {
    routeName: 'dashboard-SiteManagerPage-BasicSettingsPage',
    title: 'Basic Settings',
    icon: 'settings',
    phrases: [
      'settings',
      'basic settings',
      'welcome page',
      'upload gift basket program',
      'organization info',
      'fundraiser coordinator',
      'payment processing'
    ]
  },
  {
    routeName: 'dashboard-SiteManagerPage-AdvanceSettingsPage',
    title: 'Advance Settings',
    icon: 'settings_suggest',
    phrases: [
      'profile options and question',
      'additional ordering options',
      'basket sizes',
      'additional receipt text',
      'Enable Donate basket to Charity/Card Only Option',
      'Enable Alternate Delivery Address',
      'Additional Profile Questions/Options',
      'Solicit Donations for Charity',
      'Sell Gift Baskets for Personal Use',
      'Allow Members to Send to Others Outside the List',
      'Sell Additional Items',
      'Invoice Text'
    ]
  },
  {
    routeName: 'dashboard-OrderArchivePage',
    title: 'Order Archive',
    icon: 'archive',
    phrases: [
      'order archive',
      'order archive list'
    ]
  },
  {
    routeName: 'dashboard-MailMergeReportsPage',
    title: 'Mail Merge & Reports',
    icon: 'mail',
    phrases: [
      'Mail Merge & Reports',
      'reports',
      'mail',
      'merge',
      'basic reports',
      'advanced reports',
      'custom reports',
    ]
  },
  {
    routeName: 'dashboard-PrintLabelsPage',
    title: 'Print & Labels',
    icon: 'print',
    phrases: [
      'print',
      'labels',
      'print labels',
      'print and labels',
      'print & labels',
    ]
  },
  {
    routeName: 'dashboard-EmailStatsPage',
    title: 'Email Stats',
    icon: 'query_stats',
    phrases: [
      'email',
      'stats',
      'email stats',
      'campaigns',
      'campaigns details',
    ]
  },
  {
    routeName: 'dashboard-UserManagement',
    title: 'User Management',
    icon: 'person',
    phrases: [
      'add user',
      'user management',
      'edit user',
      'create user',
      'manage user',
      'add admin',
      'admin',
      'create admin',
    ]
  },



]
