import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '../components/common/Container';
import { SignupTitle } from '../components/title/SignupTitle';
import { SignupButton } from '../components/auth/SignupButton';
import { SubmitButton } from '../components/submit/SubmitButton';
import type { SignupRole } from '../domain/signup/signup.types';

export default function SignupGatePage(): JSX.Element {
  const [selectedRole, setSelectedRole] = useState<SignupRole | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isSignupRequired = location.state?.isSignupRequired as boolean | undefined;
  const slug = new URLSearchParams(location.search).get('slug');

  // 비인가된 접근 시 홈으로
  useEffect(() => {
    if (!isSignupRequired) navigate('/');
  }, [navigate]);

  const handleNext = () => {
    if (!selectedRole) {
      alert('회원 유형을 선택해주세요');
      return;
    }

    // slug 값이 있을 땐 고객만 허용
    if (slug && selectedRole !== 'customer') {
      alert('링크를 통한 회원가입은 고객만 가능합니다.');
      return;
    }

    // 선택한 유형에 따라 분기, slug 값을 다음 페이지로 그대로 전달
    navigate(`/signup/${selectedRole}?slug=${slug || ''}`, {
      state: { isSignupRequired: true },
    });
  };

  return (
    <Container>
      <div className="w-[305px] h-[530px] flex flex-col items-center">
        <SignupTitle>회원가입</SignupTitle>
        <div className="w-full flex justify-between mb-[300px]">
          <SignupButton.Customer
            $isSelected={selectedRole === 'customer'}
            onClick={() => setSelectedRole('customer')}
          >
            고객
          </SignupButton.Customer>
          <SignupButton.Owner
            $isSelected={selectedRole === 'owner'}
            onClick={() => setSelectedRole('owner')}
          >
            점주
          </SignupButton.Owner>
        </div>
        <SubmitButton onClick={handleNext}>다음</SubmitButton>
      </div>
    </Container>
  );
}
