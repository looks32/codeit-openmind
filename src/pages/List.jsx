import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchSubjects } from '../utill/api';
import Dropdown from '../components/Dropdown/Dropdown';
import CustomMenu from '../components/Dropdown/Custommenu';
import Button from '../components/Button';
import Pagination from '../components/Pagination';
import QList from '../components/List/QList';

const ListWrap = styled.div`
  width: 100%;
  max-width: 950px;
  margin: 40px auto 0;

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

    button {
      width: 127px;
      height: 34px;
      padding-left: 0;
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

const PagenationWrap = styled.div`
  margin-top: 40px;
  text-align: center;

  /* 모바일 */
  @media (max-width: 667px) {
    margin-top: 30px;
  }
`;

const LIMIT = 8;

function List() {
  const [user, setUser] = useState(null);

  const [label, setLabel] = useState('최신순');
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');

  // 페이지네이션 페이지번호
  useEffect(() => {
    if (!searchParams.get('page')) {
      setSearchParams({ page: '1' });
    }
  }, []);

  // 로컬 스토리지 유저 확인
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } else {
      setUser(null);
    }
  }, []);

  // 리스트 데이터 패칭
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchSubjects(currentPage, LIMIT);
        setData(data.results);
        setCount(data.count);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage]);

  const totalPages = Math.ceil(count / LIMIT);

  // 정렬 state
  const sortList =
    label === '이름순'
      ? [...data].sort((a, b) => a.name.localeCompare(b.name, 'ko'))
      : [...data].sort((a, b) => b.id - a.id);

  // 정렬 변경 이벤트
  const handleLabelChange = (newLabel) => {
    setLabel(newLabel);
    setSearchParams({ page: '1' });
  };

  // 페이지 변경 이벤트
  const handlePageChange = (page) => {
    setSearchParams({ page });
  };

  return (
    <ListWrap>
      <ListHeader>
        <h1>
          <Link to="/">
            <img src="/logo.png" alt="로고" />
          </Link>
        </h1>
        <Button
          type="answer"
          width="161px"
          height="46px"
          to={user ? `/post/${user}/answer` : '/'}
        />
      </ListHeader>

      <ListBody>
        <div className="title">
          <h2>누구에게 질문할까요?</h2>
          <Dropdown label={label}>
            <CustomMenu onSelect={handleLabelChange} />
          </Dropdown>
        </div>

        <QList sortList={sortList} loading={loading} />

        <PagenationWrap>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </PagenationWrap>
      </ListBody>
    </ListWrap>
  );
}

export default List;
