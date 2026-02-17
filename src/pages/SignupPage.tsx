import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent, JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../components/common/Container';
import { SignupTitle } from '../components/title/SignupTitle';
import { AuthInput } from '../components/auth/AuthInput';
import { SubmitButton } from '../components/submit/SubmitButton';
import { useSignupCustomer, useSignupOwner } from '../query/signupQueries';
import { validateMobile010 } from '../utils/phoneNumber';
import type { UserType } from '../domain/auth/auth.types';
import type { CustomerSignupPayload, OwnerSignupPayload } from '../domain/signup/signup.types';

interface SignupPageProps {
  userType: UserType;
}

export default function SignupPage({ userType }: SignupPageProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignupRequired = location.state?.isSignupRequired as boolean | undefined;

  // slug 쿼리값 추출
  const slug = new URLSearchParams(location.search).get('slug');

  // slug 있으면 무조건 CUSTOMER로 고정, 없다면 그대로 진행
  const effectiveUserType: UserType = slug ? 'CUSTOMER' : userType;

  // 타입별 고객, 점주 회원가입 훅 선택
  const signupCustomer = useSignupCustomer();
  const signupOwner = useSignupOwner();
  const signup = effectiveUserType === 'CUSTOMER' ? signupCustomer : signupOwner;

  // 입력폼 상태
  const [formData, setFormData] = useState<CustomerSignupPayload | OwnerSignupPayload>({
    name: '',
    phoneNumber: '',
  });

  // 비인가된 접근 시 홈으로
  useEffect(() => {
    if (!isSignupRequired) navigate('/');
  }, [navigate]);

  // 회원가입 입력 폼 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 회원가입 입력폼 제출 핸들러
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, phoneNumber } = formData;
    if (!name || !phoneNumber) {
      alert('이름과 전화번호를 모두 입력해주세요.');
      return;
    }

    // 전화번호 유효성 검사
    const result = validateMobile010(phoneNumber as string);
    if (!result.valid) {
      if (result.reason === 'length') {
        alert('전화번호는 숫자만 11자리여야 합니다.');
      } else if (result.reason === 'format') {
        alert('정확한 휴대폰 번호(010으로 시작)를 입력해주세요.');
      }
      return;
    }

    // slug 존재 + 점주 회원가입 시도 방지
    if (slug && userType !== 'CUSTOMER') {
      alert('링크를 통한 회원가입은 고객만 가능합니다.');
      navigate('/');
      return;
    }

    signup.mutate(formData);
  };

  return (
    <Container>
      <div className="w-[305px] h-[530px] flex flex-col items-center">
        <SignupTitle>{userType === 'CUSTOMER' ? '고객 회원가입' : '점주 회원가입'}</SignupTitle>

        <form onSubmit={onSubmit} className="w-full flex flex-col items-center">
          <label className="w-full block mb-[15px]">
            <AuthInput
              name="name"
              value={formData.name as string}
              placeholder="이름"
              maxLength={5}
              onChange={handleChange}
            />
          </label>

          <label className="w-full block mb-[15px]">
            <AuthInput
              name="phoneNumber"
              value={formData.phoneNumber as string}
              placeholder="전화번호"
              onChange={handleChange}
            />
          </label>

          <SubmitButton type="submit" disabled={signup.isPending} className="mt-[30px]">
            {signup.isPending ? '가입중...' : '가입하기'}
          </SubmitButton>

          {signup.isError && (
            <p style={{ color: 'red' }}>가입 실패: {(signup.error as Error)?.message}</p>
          )}
        </form>
      </div>
    </Container>
  );
}
