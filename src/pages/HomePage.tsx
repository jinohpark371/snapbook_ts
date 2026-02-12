import Container from '../components/common/Container';
import { useAuth } from '../context/AuthContext';
import type { JSX } from 'react';

export default function HomePage(): JSX.Element {
  const { auth, logout } = useAuth();

  return (
    <Container>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl">환영합니다, {auth?.name ?? '사용자'}</h1>
        <p>회원 유형: {auth?.userType ?? '알 수 없음'}</p>
        <button
          onClick={logout}
          className="px-4 py-2 bg-gray-800 text-white rounded"
          type="button"
        >
          로그아웃
        </button>
      </div>
    </Container>
  );
}
