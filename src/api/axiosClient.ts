import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import { authStorage } from '../utils/auth/authStorage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 포함
});

// 요청 인터셉터
axiosClient.interceptors.request.use(
  (config) => {
    // 액세스 토큰이 있으면 헤더에 추가
    const accessToken = authStorage.getAccessToken();
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // 401 Unauthorized - 토큰 만료 또는 유효하지 않음
    if (error.response?.status === 401) {
      // 인증 데이터 초기화
      authStorage.clear();

      // 로그인 페이지로 리다이렉트
      window.location.href = '/login';
    }

    // 403 Forbidden
    if (error.response?.status === 403) {
      console.error('접근 권한이 없습니다.');
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
