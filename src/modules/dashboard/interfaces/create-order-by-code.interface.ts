export interface BasketsInCartResponseInterface {
  totalBaskets: number;
  receivers: ReceiverBasketsInCartInterface[];
}

export interface ReceiverBasketsInCartInterface {
  id: number;
  fullName: string;
}
