import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ButtonBox from '../components/ButtonBox';
import { createSubject, findSubjectByName } from '../utill/api';

const Page = styled.div`
  position: relative;
  min-height: 100vh; /* fallback */
  min-height: 100dvh; /* 모바일 주소창 높이 변화 대응 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 56px 20px 56px; /* 불필요한 하단 여백 제거 */
  box-sizing: border-box;
  /* 배경은 별도의 고정 레이어로 분리 */
  background: transparent;
`;

const Bg = styled.div`
  position: fixed;
  inset: 0; /* top:0; right:0; bottom:0; left:0 */
  z-index: -1; /* 콘텐츠 뒤에서 표시 */
  pointer-events: none;
  background-image: url('/home.svg');
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: cover; /* 항상 화면을 가득 채우고 필요 시 잘라냄 */
`;

const GoAskLink = styled(Link)`
  position: absolute;
  top: 24px;
  right: clamp(
    16px,
    6vw,
    64px
  ); /* 넓을수록 왼쪽으로 더 떨어졌다가 작아질수록 오른쪽으로 접근 */
  padding: 12px 18px;
  border: 1px solid #bdb0a7;
  border-radius: 10px;
  color: #5b4536;
  font-weight: 600;
  text-decoration: none;
  background: var(--Brown-10, #f5f1ee);
  transition:
    background 0.2s,
    color 0.2s,
    right 0.2s;

  &:hover {
    background: #faf7f5;
  }

  &:active {
    background: var(--Brown-20, #e4d5c9);
  }

  /* 모바일에서는 로고와 입력창 사이로 내려오며 고정 너비 110px */
  @media (max-width: 640px) {
    position: static;
    display: inline-block;
    width: 110px;
    align-self: center;
    text-align: center;
    margin: 8px 0; /* 로고와 카드 사이 간격 */
  }
`;

const Hero = styled.section`
  margin-top: 40px;
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px; /* 버튼이 이 영역에 들어오므로 간격 조정 */
`;

const Logo = styled.img`
  width: 360px;
  max-width: 90vw;
  height: auto;
`;

const Card = styled.form`
  width: 100%;
  max-width: 560px;
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.04);
  border: 1px solid #eee7e2;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputWrap = styled.div`
  position: relative;
`;

const SearchIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  color: #bdbdbd;
  font-size: 18px;
  pointer-events: none;
`;

const NameInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px 0 40px; /* space for icon */
  border: 1px solid #818181;
  border-radius: 12px;
  background: #fff;
  font-size: 16px;
  color: #222;
  outline: none;
  box-sizing: border-box;
  transition:
    border 0.2s,
    background 0.2s;

  &::placeholder {
    color: #bdbdbd;
    font-size: 16px;
  }

  &:focus {
    border: 2px solid #bdb0a7;
    background: #fff;
  }
`;

function Home() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed || loading) return;

    try {
      setLoading(true);

      // 1) 기존 피드가 있는지 확인
      const existing = await findSubjectByName(trimmed);
      if (existing?.id) {
        navigate(`/post/${existing.id}/answer`);
        return;
      }

      // 2) 없으면 새로 생성
      const created = await createSubject(trimmed);
      navigate(`/post/${created.id}/answer`);
    } catch (err) {
      console.error(err);
      alert('피드 생성/조회에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Bg />
      <Hero>
        <Logo src="/big_logo.png" alt="OPENMIND" />
        <GoAskLink to="/list">질문하러 가기 →</GoAskLink>

        <Card onSubmit={handleSubmit}>
          <InputWrap>
            <SearchIcon>
              <img src="/Person.svg" alt="Person" />
            </SearchIcon>
            <NameInput
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputWrap>
          <ButtonBox type="submit" disabled={!name.trim() || loading}>
            {loading ? '생성 중...' : '질문 받기'}
          </ButtonBox>
        </Card>
      </Hero>
    </Page>
  );
}

export default Home;
