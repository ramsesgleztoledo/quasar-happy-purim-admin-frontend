
export interface CharitySettingsInterface {
  active: boolean;
  message: string;
}
export interface OrderItemSettingsInterface {
  enabled: boolean;
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
  id: number;
  clientId: number;
  description: string;
  price: number;
  sortOrder: number;
}


export interface Tab2AddOrderItemFormInterface {
  description: string;
  price: number;
  sortOrder: number;
}



export interface Tab1DonateBasketInterface {
  donateBasketOption: boolean;
  donateBasketOptionText: string;
}


export interface Tab1AlternativeDeliveryAddressInterface {
  alternateDeliveryAddressEnabled: boolean;
  alternateDeliveryAddressPrompt: string;
}


export interface Tab3BasketSizeInterface {
  id: number;
  rangeStart: number;
  rangeEnd: number;
  basketSize: string;
  lastUpdated: Date;
}


export interface Tab3CreateBasketSizeResponseInterface {
  message: string;
  data: Tab3BasketSizeInterface[];
}


export interface Tab3BasketSizeFormInterface {
  rangeStart: number;
  rangeEnd: number;
  basketSize: string;
}


export interface Tab1AdditionalProfileQuestionInterface {
  optId: number;
  optionText: string;
  order: number;
  display: boolean;
  dontArchive: boolean;
}


export interface Tab1AdditionalProfileQuestionResponseInterface {
  success: boolean;
  message: string;
  data: {
    optId: number;
    optionText: string;
    order: number;
    display: boolean;
    dontArchive: boolean;
  };
}

