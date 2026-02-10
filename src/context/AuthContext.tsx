import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode, FC } from 'react';
import { authStorage } from '../utils/auth/authStorage';
import type { User } from '@/domain/auth/user';
import type { AuthResponse } from '@/domain/auth/auth.types';

// Context value 타입
interface AuthContextType {
  auth: User | null;
  login: (response: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // 회원 정보 전역 상태
  const [auth, setAuth] = useState<User | null>(null);

  useEffect(() => {
    const stored = authStorage.get();
    if (stored) {
      // 토큰을 제외한 사용자 정보만 관리
      const { name, phoneNumber, userType, userId } = stored;
      setAuth({ name, phoneNumber, userType, userId });
    }
  }, []);

  // 로그인 후 받은 응답으로 토큰을 제외한 나머지 사용자 정보 상태만 관리
  const login = (response: AuthResponse): void => {
    if (!response) return;

    // 화면에서 관리할 사용자 정보만 설정 (토큰 제외)
    setAuth({
      name: response.name,
      phoneNumber: response.phoneNumber,
      userType: response.userType,
      userId: response.userId,
    });

    // 토큰 포함해서 모두 저장
    authStorage.save(response);
  };

  // 사용자 정보, 로그인 상태 초기화(로그아웃)
  const logout = (): void => {
    setAuth(null);
    authStorage.clear();
  };

  const value: AuthContextType = { auth, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
