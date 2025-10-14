import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImg from '../assets/Logo.svg';
import MainImage from '../assets/MainImage.svg';

const mobileQuery = '@ media (max-width: 375px) and (max-height: 611px)';

const MainWrap = styled.div`
  position: relative;
  min-height: 100vh;
  background: var(--gray10);
  overflow: hidden;
`;

const AnswerButtonWrapper = styled.div`
  position: absolute;
  top: 45px;
  right: 130px;
  z-index: 30;

  ${mobileQuery} {
    top: 202px;
    right: 125.5px;
  }
`;

const CenterWrap = styled.div`
  position: relative;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;

  ${mobileQuery} {
    padding-top: 260px;
  }
`;


const Logo = styled.img`
  width: 100%;
  height: 180px;
  display: block;

  ${mobileQuery} {
    height: 98px;
  }
`;

const Card = styled.div`
  margin-top: 24px;
  background: var(--gray10);
  border-radius: 16px;
  width: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px; /* 인풋과 버튼 사이 16px */
  align-items: flex-start;

  ${mobileQuery} {
    width: 100%;
    padding: 24px;
    margin-top: 24px;
  }
`;
const InputField = styled.div`
  width: 100%;
`;

const QustionButtonWrapper = styled.div`
  width: 100%;

  ${mobileQuery} {
    width: 100%;
  }
`;

const BottomImage = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 627px;
  object-fit: cover;
  z-index: 10;

  ${mobileQuery} {
   height: 239px; 
  }
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MainHeader = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mobileQuery} {
    padding: 12px 16px;
  }
`;

const MainBody = styled.div`
  width: 100%;
  box-sizing: border-box;
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
        <h1>로고</h1>

        {/* 링크 기능 상윤님이 만들어 주시면 링크걸기 (질문하러 가기 버튼으로도 번경) */}
        {/* 아마도 링크는 ('/list' ) */}
        <Button type="answer" to='/list'/>
      </MainHeader>
      <MainBody>
        <form onSubmit={onSubmit}>
          <Input value="" placeholder="이름을 입력해주세요." name="username" />

          {/* 질문 받기 버튼에 크기 100% 버튼으로 변경 */}
          <Button type="question" NoIcon />
        </form>
      </MainBody>
    </MainWrap>
  );
}

export default Home;
