export type SignupRole = 'customer' | 'owner';

export type SignupApiResponse = {
  userType: 'CUSTOMER' | 'OWNER';
  userId: number;
  name: string;
  phoneNumber: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

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
  businessName: string;
  address: string;
  businessNumber: string;
};

export type ShopInfoResponse = {
  ownerId: number;
  shopId: number;
  businessName: string;
  address: string;
  businessNumber: string;
};
