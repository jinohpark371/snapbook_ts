export type UserType = 'CUSTOMER' | 'OWNER';

export interface KakaoLoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  role: string;
  message: string;
  authStatus: 'LOGIN_SUCCESS' | 'SIGNUP_REQUIRED';
  userType: string;
  name?: string;
  phoneNumber?: string;
}
