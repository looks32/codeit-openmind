import FeedCardGroup from '../components/FeedCard/FeedCardGroup';
import styled, { keyframes } from 'styled-components';
import CircleImage from '../components/Profile';
import Button from '../components/Button';
import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { deleteQuestionsBySubject } from '../utill/api';
import {
  loadQuestionsBySubject as loadData,
  loadMoreQuestionsByUrl,
} from '../utill/load';
import OutBound from '../components/OutBound';

function Answer() {
  const { id: subjectId } = useParams(); // URL에서 subjectId 추출 (예: /post/:id/answer)
  const [deleting, setDeleting] = useState(false); // 전체 삭제하기 버튼 상태
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const [size, setSize] = useState(
    window.innerWidth <= 768 ? '104px' : '136px'
  );

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth <= 768 ? '104px' : '136px');
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!subjectId) return;
      try {
        setLoading(true);
        setError(null);
        const {
          subject: s,
          questions: q,
          next,
          total,
        } = await loadData(subjectId);
        if (!mounted) return;
        setSubject(s);
        setQuestions(q);
        setNextUrl(next || null);
        setTotalCount(typeof total === 'number' ? total : q?.length || 0);
      } catch (e) {
        if (!mounted) return;
        setError(e);
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [subjectId]);

  const loadMore = useCallback(async () => {
    if (!nextUrl || loadingMore || !subject) return;
    setLoadingMore(true);
    try {
      const {
        questions: more,
        next,
        total,
      } = await loadMoreQuestionsByUrl(nextUrl, subject);
      setQuestions((prev) => {
        const seen = new Set(prev.map((q) => q.id));
        const filtered = more.filter((q) => !seen.has(q.id));
        return [...prev, ...filtered];
      });
      setNextUrl(next || null);
      if (typeof total === 'number') setTotalCount(total);
    } catch (e) {
      console.error('추가 로딩 실패:', e);
    } finally {
      setLoadingMore(false);
    }
  }, [nextUrl, loadingMore, subject]);

  useEffect(() => {
    function onScroll() {
      if (loading || loadingMore || !nextUrl) return;
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200;
      if (nearBottom) {
        loadMore();
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading, loadingMore, nextUrl, loadMore]);

  if (loading) return <div style={{ padding: 16 }}>로딩 중…</div>;
  if (error) return <div style={{ padding: 16 }}>불러오기에 실패했습니다.</div>;

  return (
    <div>
      <TopRow>
        <Banner />
        <Link to="/">
          <Logo src="/logo.png" alt="OpenMind" />
        </Link>
        <CircleImage src={subject?.imageSource} sizes={size} />
        <UserName>{subject?.name}</UserName>
        <OutBound />
      </TopRow>

      <Content>
        <RightBar>
          <EraseButton
            type="insert"
            disabled={deleting || questions.length === 0}
            onClick={async () => {
              if (deleting) return;
              try {
                setDeleting(true);
                await deleteQuestionsBySubject(subjectId); // 전체 삭제하기 API 호출
                // 모든 페이지의 질문이 삭제되었으므로 로컬 상태도 즉시 반영
                setQuestions([]);
                setTotalCount(0);
                setNextUrl(null);
              } catch (e) {
                alert(`삭제 실패: ${e?.message || ''}`);
              } finally {
                setDeleting(false);
              }
            }}
          >
            {deleting ? '삭제 중...' : '전체 삭제하기'}
          </EraseButton>
        </RightBar>
        <FeedCardGroup
          questions={questions}
          totalCount={totalCount}
          onChange={(next) => setQuestions(next)}
        />
        {loadingMore && (
          <LoadingMore>
            <Spinner aria-label="loading" />
          </LoadingMore>
        )}
      </Content>
    </div>
  );
}

export default Answer;

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 배너 이미지를 배경으로 사용하고, 내부에 로고를 배치
const Banner = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  max-width: 1200px;
  height: 234px;
  margin: 0 auto;
  background: url('/banner.png') center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  margin-top: 50px;
  margin-bottom: 12px;
  width: 170px;
  height: 67px;

  @media (max-width: 768px) {
    width: 124px;
    height: 49px;
  }
`;

const UserName = styled.div`
  color: var(--Grayscale-60, #000);
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: Actor;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 40px; /* 125% */
  margin: 16px 0 12px 0;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 30px;
  }
`;

// FeedCardGroup과 동일한 폭에 맞춘 컨테이너와 우측 정렬 바
const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  box-sizing: border-box;
`;

const RightBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  color: #818181;
`;

const Spinner = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid #e5ded9;
  border-top-color: #bdb0a7;
  animation: ${spin} 0.8s linear infinite;
`;

const EraseButton = styled(Button)`
  width: 100px;
  height: 35px;
  font-size: 15px;
  @media (max-width: 768px) {
    width: 70px;
    height: 25px;
    font-size: 10px;
  }

  &:disabled {
    pointer-events: none;
    background: var(--Brown30, #c7bbb5);
  }
`;
