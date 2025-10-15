import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import MainImage from '../assets/MainImage.svg';
import MainImageMobile from '../assets/MainImageMobile.png';
import logo from '../assets/logo.svg';

const MainWrap = styled.div`
  position: relative;
  min-height: calc(100vh - 45px);
  background: url('${MainImage}') no-repeat center bottom;
  background-size: contain;

  @media (max-width: 767px) {
    min-height: calc(100vh - 90px);
    background-image: url('${MainImageMobile}');
    background-size: contain;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MainHeader = styled.div`
  position: relative;
  width: 100%;
  margin-top: 45px;
  padding-top: 115px;
  text-align: center;
  button {
    position: absolute;
    right: 130px;
    top: 0;
    padding-left: 0;
  }

  @media (max-width: 767px) {
    margin-top: 80px;
    padding-top: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    h1 {
      width: 100%;
      margin-bottom: 24px;
      img {
        width: 248px;
      }
    }

    button {
      width: 123px;
      height: 34px;
      position: static;
      font-size: 14px;
    }
  }
`;

const MainBody = styled.div`
  width: 400px;
  margin: 24px auto 0;
  padding: 32px;
  border-radius: 16px;
  background-color: var(--Gray10);

  button {
    padding-left: 0;
  }

  @media (max-width: 767px) {
    width: calc(100% - 70px);
    margin: 24px 35px 0;
    box-sizing: border-box;
  }
`;

function Home() {
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;

    try {
      // console.log('로딩on');
      const res = await fetch(
        `https://openmind-api.vercel.app/19-9/subjects/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name }),
        }
      );

      if (!res.ok) {
        throw new Error('서버 요청 실패');
      }
      const data = await res.json();
      localStorage.setItem('user', data.id);
      nav(`/post/${data.id}/answer`);
    } catch (error) {
      console.error('에러 발생:', error);
    } finally {
      // console.log('로딩 off');
    }
  };

  return (
    <MainWrap>
      <MainHeader>
        <h1>
          <img src={logo} alt="오픈 마인드 로고" />
        </h1>
        <Button
          type="answer"
          to="/list"
          children="질문하러 가기"
          width="161px"
        />
      </MainHeader>
      <MainBody>
        <Form onSubmit={onSubmit}>
          <Input value="" placeholder="이름을 입력해주세요." name="username" />

          <Button type="question" NoIcon width="100%" />
        </Form>
      </MainBody>
    </MainWrap>
  );
}

export default Home;
