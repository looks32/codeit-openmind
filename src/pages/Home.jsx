import styled from 'styled-components';
import Button from '../components/Button';
import Input from '../components/Input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainWrap = styled.div``;

const MainHeader = styled.div``;

const MainBody = styled.div``;

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
