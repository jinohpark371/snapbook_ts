import { useLocation } from 'react-router-dom';
import Container from '../components/common/Container';
import KakaoLoginButton from '../components/auth/KakaoLoginButton';
import logoImg from '../assets/icons/logo-icon.svg';
import type { JSX } from 'react';

export default function LoginPage(): JSX.Element {
  const location = useLocation();

  // 링크 접속 시 매장 식별 코드
  const rawSlug = new URLSearchParams(location.search).get('slug');
  const slug = rawSlug ?? undefined;

  return (
    <Container>
      <div className="flex flex-col">
        <div className="flex justify-center text-4x items-center gap-3">
          {/* 로고 이미지 */}
          <img src={logoImg} alt="SNAPBOOK 로고" />
        </div>
        <KakaoLoginButton slug={slug} /> {/*식별코드 전달*/}
      </div>
    </Container>
  );
}
