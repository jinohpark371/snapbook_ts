import { http, HttpResponse } from 'msw';
import type { KakaoLoginResponse } from '../domain/auth/auth.types';
import type { ShopInfoResponse, SignupApiResponse } from '../domain/signup/signup.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const mockSignupResponse = (userType: 'CUSTOMER' | 'OWNER'): SignupApiResponse => ({
  userType,
  userId: 1,
  name: '테스트유저',
  phoneNumber: '01012345678',
  tokens: {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
  },
});

export const handlers = [
  // 카카오 로그인 (로컬) - SIGNUP_REQUIRED로 설정해 회원가입 플로우 진입
  http.post(`${BASE_URL}/oauth/login/kakao/local`, () => {
    return HttpResponse.json<KakaoLoginResponse>({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      userId: 1,
      role: 'CUSTOMER',
      message: '성공',
      authStatus: 'SIGNUP_REQUIRED',
      userType: 'CUSTOMER',
    });
  }),

  // 카카오 로그인 (배포)
  http.post(`${BASE_URL}/oauth/login/kakao`, () => {
    return HttpResponse.json<KakaoLoginResponse>({
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      userId: 1,
      role: 'CUSTOMER',
      message: '성공',
      authStatus: 'SIGNUP_REQUIRED',
      userType: 'CUSTOMER',
    });
  }),

  // 고객 회원가입
  http.post(`${BASE_URL}/user/customer/signup`, () => {
    return HttpResponse.json<SignupApiResponse>(mockSignupResponse('CUSTOMER'));
  }),

  // 점주 회원가입
  http.post(`${BASE_URL}/user/owner/signup`, () => {
    return HttpResponse.json<SignupApiResponse>(mockSignupResponse('OWNER'));
  }),

  // 점주 가게 정보 등록
  http.post(`${BASE_URL}/shop`, () => {
    return HttpResponse.json<ShopInfoResponse>({
      ownerId: 1,
      shopId: 1,
      businessName: '테스트가게',
      address: '서울시 강남구',
      businessNumber: '0212345678',
    });
  }),

  // 회원탈퇴
  http.delete(`${BASE_URL}/user`, () => {
    return HttpResponse.json({ message: '탈퇴 성공' });
  }),
];
