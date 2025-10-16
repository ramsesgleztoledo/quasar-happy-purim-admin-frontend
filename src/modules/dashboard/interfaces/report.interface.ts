export interface ReportResponseInterface {
  basicReports: ReportDataInterface[];
  advancedReports: ReportDataInterface[];
}

export interface ReportDataInterface {
  reportID: string;
  name: string;
  summary: string;
  isCustom?: boolean;
  viewOnly?: boolean;
  downloadOnly?: boolean;
}

export interface CustomReportInterface {
  reportId: number;
  reportName: string;
  displayOrder: number;

}




export interface RecipientDataFormInterface {
  id: number | string;
  searchTerm?: string;
  categories?: string[];
  zipCode?: string[];
  basketSize?: string[];
  routeCode?: string[];
  donateBasket?: string;
}


export interface RecipientDataInterface {
  totalCount: number;
  filteredCount?: number;
  yesCount?: number;
  noCount?: number;
  nlCount?: number;
  members: RecipientMemberInterface[];
}

export interface RecipientMemberInterface {
  ID: number;
  "Last Name": string;
  "First Name": string;
  Spouse: string;
  "Last Name Spouse": string;
  Title: string;
  "Display As": string;
  Salutation: string;
  "Greeting Line": string;
  "Informal Greeting": string;
  Address: string;
  Address2: string;
  City: string;
  State: string;
  Zip: string;
  Phone: string;
  Email: string;
  "Alternate Email": string;
  Categories: string;
  "Login Code": string;
  Misc: string;
  Route: string;
  "Sending To": string;
  "Total Sending": number;
  "Receiving From Count": number;
  Reciprocity: ReciprocityDataInterface;
  "Sign On Link": string;
  selected?: boolean;
}



export enum ReciprocityDataInterface {
  No = "No",
  Yes = "Yes",
}

export interface SpecialReportInterface {
  name: string;
  description: string;
  url: string
}
