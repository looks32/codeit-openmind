import styled from 'styled-components';
import { useState } from 'react';
import Qcard from '../components/Qcard';
import Dropdown from '../components/Dropdown/Dropdown';
import CustomMenu from '../components/Dropdown/Custommenu';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const ListWrap = styled.div`
  width: 100%;
  max-width: 950px;
  margin: 40px auto 0;
  background-color: pink;

  /* 테블릿 */
  @media (max-width: 1199px) {
    max-width: 100%;
    padding: 0 32px;
  }

  /* 모바일 */
  @media (max-width: 667px) {
    padding: 0 24px;
  }
`;

const ListHeader = styled.div`
  background-color: lightblue;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    a {
      display: block;
    }

    img {
      width: 146px;
    }
  }

  /* 테블릿 */
  @media (max-width: 1199px) {
    padding: 0 18px;
  }

  /* 모바일 */
  @media (max-width: 667px) {
    display: block;
    padding: 0;

    > h1 a {
      text-align: center;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }
  }
`;

const ListBody = styled.div`
  > .title {
    margin: 40px 0 30px;
    text-align: center;

    h2 {
      font-size: 40px;
      width: 100%;
      margin-bottom: 12px;
    }
  }

  /* 모바일 */
  @media (max-width: 667px) {
    > .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      margin: 52px 0 16px;

      h2 {
        width: auto;
        font-size: 24px;
        margin-bottom: 0;
      }
    }
  }
`;

const QList = styled.ol`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;

  li {
    width: calc((100% / 4) - 15px);
  }

  // 유저카드 186px이하 시 3단으로 변경
  @media (max-width: 878px) {
    li {
      width: calc((100% / 3) - 14px);
    }
  }

  /* 모바일 */
  @media (max-width: 667px) {
    li {
      width: calc((100% / 2) - 10px);
    }
  }
`;

const PagenationWrap = styled.div`
  background-color: green;
  margin-top: 40px;

  /* 모바일 */
  @media (max-width: 667px) {
    margin-top: 30px;
  }
`;

function List() {
  const [label, setLabel] = useState('이름순');

  return (
    <ListWrap>
      <ListHeader>
        <h1>
          <Link to="/">
            <img src="/logo.png" alt="로고" />
          </Link>
        </h1>
        <Button type="answer" width="answerSmall" />
      </ListHeader>

      <ListBody>
        <div className="title">
          <h2>누구에게 질문할까요?</h2>
          <Dropdown label={label}>
            <CustomMenu onSelect={(v) => setLabel(v)} />
          </Dropdown>
        </div>

        <QList>
          <li>
            <Qcard />
          </li>
          <li>
            <Qcard />
          </li>
          <li>
            <Qcard />
          </li>
          <li>
            <Qcard />
          </li>
          <li>
            <Qcard />
          </li>
        </QList>

        <PagenationWrap>페이지네이션</PagenationWrap>
      </ListBody>
    </ListWrap>
  );
}

export default List;
