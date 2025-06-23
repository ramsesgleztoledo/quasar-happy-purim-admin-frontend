export interface OrganizationSettingsInterface {
  contactName:            string;
  contactEmail:           string;
  contactPhone:           string;
  address:                string;
  address2:               string;
  city:                   string;
  state:                  string;
  zip:                    string;
  costPerPerson:          number;
  maximumCharge:          number;
  reciprocityCharge:      number;
  endDateTime:            Date;
  reciprocityEnabled:     boolean;
  selectAllByDefault:     boolean;
  displayLastYears:       boolean;
  hasCustomPricing:       boolean;
  hasCategoryPricing:     boolean;
  hideCostPerPerson:      boolean;
  hideMax:                boolean;
  hideReciprocity:        boolean;
  showCustomPricingLabel: boolean;
  bccReceiptsTo:          string;
  replyTo:                string;
}

export interface OrganizationInformationFormInterface {
  address:  string;
  address2: string;
  city:     string;
  state:    string;
  zip:      string;
}


export interface FundraiserCoordinatorFormInterface {
  contact:       string;
  contactPhone:  string;
  contactEmail:  string;
  bccReceiptsTo: string;
  replyTo:       string;
}


export interface GiftBasketProgramFormInterface {
  costPerPerson:          number;
  maximumCharge:          number;
  endDateTime:            Date;
  reciprocityCharge:      number;
  reciprocityEnabled:     boolean;
  selectAllByDefault:     boolean;
  displayLastYearsOrders: boolean;
}
