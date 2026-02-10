// 저장된 전체 응답 데이터 타입
export interface AuthResponse {
  userType: string | null;
  tokens: {
    accessToken: string | null;
    refreshToken: string | null;
  };
  role: string | null;
  message: string | null;
  name: string | null;
  phoneNumber: string | null;
  userId: string | null;
}
