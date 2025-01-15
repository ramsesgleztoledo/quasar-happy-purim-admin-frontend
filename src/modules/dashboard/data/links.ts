export interface LinksDataInterface {
  id: string;
  title: string;
  to: string;
  icon?: string;
  caption?: string;
  disabled?: boolean;
  children?: LinksDataInterface[];
}

export const linksData: LinksDataInterface[] = [
  {
    id: '1',
    title: 'Dashboard',
    icon: 'home',
    to: 'dashboard-DashboardPage',
    // caption: 'home'
  },
  {
    id: '2',
    title: 'Members Settings',
    icon: 'group',
    to: 'dashboard-MembersSettingsPage',
  },
  {
    id: '3',
    title: 'Site Manager',
    icon: 'display_settings',
    to: 'dashboard-SiteManagerPage',
    children: [
      {
        id: '3-1',
        title: 'Basic Settings',
        icon: 'settings',
        to: 'dashboard-SiteManagerPage-BasicSettingsPage',

      },
      {
        id: '3-2',
        title: 'Advanced Settings',
        icon: 'settings_suggest',
        to: 'dashboard-SiteManagerPage-AdvanceSettingsPage',
      },
    ],

  },
  {
    id: '4',
    title: 'Order Archive',
    icon: 'archive',
    to: 'dashboard-OrderArchivePage',
  },
  {
    id: '5',
    title: 'Mail Merge & Reports',
    icon: 'email',
    to: 'dashboard-MailMergeReportsPage',
  },
  {
    id: '6',
    title: 'Print & Labels',
    icon: 'print',
    to: 'dashboard-PrintLabelsPage',
  },
  {
    id: '7',
    title: 'Email Stats',
    icon: 'query_stats',
    to: 'dashboard-EmailStatsPage',
  },
]
