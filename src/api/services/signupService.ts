import axiosClient from '../axiosClient';
import type {
  CustomerSignupPayload,
  OwnerSignupPayload,
  ShopInfoPayload,
} from '../../domain/signup/signup.types';
import type { KakaoLoginResponse } from '../../domain/auth/auth.types';

type SignupService = {
  signupCustomer: (payload: CustomerSignupPayload) => Promise<KakaoLoginResponse>;
  signupOwner: (payload: OwnerSignupPayload) => Promise<KakaoLoginResponse>;
  registerShopInfo: (payload: ShopInfoPayload) => Promise<unknown>;
};

export const signupService: SignupService = {
  signupCustomer: async (payload) => {
    const res = await axiosClient.post('/user/customer/signup', payload);
    return res.data as KakaoLoginResponse;
  },

  signupOwner: async (payload) => {
    const res = await axiosClient.post('/user/owner/signup', payload);
    return res.data as KakaoLoginResponse;
  },

  // 점주 가게정보 추가 회원가입 요청
  registerShopInfo: async (payload) => {
    const res = await axiosClient.post('/shop', payload);
    return res.data as unknown;
  },
};
