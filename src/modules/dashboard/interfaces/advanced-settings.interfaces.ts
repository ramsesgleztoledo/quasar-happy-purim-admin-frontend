
export interface CharitySettingsInterface {
  active: boolean;
  message: string;
}


export interface Tab2AddonInterface {
  enabled: boolean;
  price: number;
  message: string;
}


export interface Tab2AddonFormInterface {
  enabled: boolean;
  text: string;
  priceEach: number;
}

export interface Tab2AllowMembersFormInterface {
  enabled: boolean;
  message: string;
  priceEach: number;
}


export interface Tab2AdditionalItemInterface {
  id:          number;
  clientId:    number;
  description: string;
  price:       number;
  sortOrder:   number;
}


export interface Tab2AddOrderItemFormInterface {
  description: string;
  price:       number;
  sortOrder:   number;
}
