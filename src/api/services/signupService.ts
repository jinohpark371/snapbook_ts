import axiosClient from '../axiosClient';
import type {
  CustomerSignupPayload,
  OwnerSignupPayload,
  ShopInfoPayload,
  ShopInfoResponse,
  SignupApiResponse,
} from '../../domain/signup/signup.types';

type SignupService = {
  signupCustomer: (payload: CustomerSignupPayload) => Promise<SignupApiResponse>;
  signupOwner: (payload: OwnerSignupPayload) => Promise<SignupApiResponse>;
  registerShopInfo: (payload: ShopInfoPayload) => Promise<ShopInfoResponse>;
};

export const signupService: SignupService = {
  signupCustomer: async (payload) => {
    const res = await axiosClient.post('/user/customer/signup', payload);
    return res.data as SignupApiResponse;
  },

  signupOwner: async (payload) => {
    const res = await axiosClient.post('/user/owner/signup', payload);
    return res.data as SignupApiResponse;
  },

  // 점주 가게정보 추가 회원가입 요청
  registerShopInfo: async (payload) => {
    const res = await axiosClient.post('/shop', payload);
    return res.data as unknown;
  },
};
