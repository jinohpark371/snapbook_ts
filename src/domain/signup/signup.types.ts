export type CustomerSignupPayload = {
  name: string;
  phoneNumber: string;
  [key: string]: unknown;
};

export type OwnerSignupPayload = {
  name: string;
  phoneNumber: string;
  [key: string]: unknown;
};

export type ShopInfoPayload = {
  shopName: string;
  [key: string]: unknown;
};
