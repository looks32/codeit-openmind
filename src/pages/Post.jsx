import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import {
  loadQuestionsBySubject as loadData,
  loadMoreQuestionsByUrl,
} from '../utill/load';
import { postQuestion } from '../utill/api';
import { formatRelativeTime } from '../utill/time';
import styled, { keyframes } from 'styled-components';
import CircleImage from '../components/Profile';
import InputTextArea from '../components/InputTextArea';
import ButtonBox from '../components/ButtonBox';
import Button from '../components/Button';
import FeedCardGroup from '../components/FeedCard/FeedCardGroup';
import OutBound from '../components/OutBound';
import Loading from '../components/Loading';

function Post() {
  const { id: subjectId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

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
        // post 페이지에선 항상 답변 숨김 상태로 시작
        setQuestions(q.map((question) => ({ ...question, hideAnswer: true })));
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
      // Post 페이지에선 추가 로드된 질문들도 항상 hideAnswer: true 상태로 유지
      const moreWithHide = more.map((q) => ({ ...q, hideAnswer: true }));
      setQuestions((prev) => {
        const seen = new Set(prev.map((q) => q.id));
        const filtered = moreWithHide.filter((q) => !seen.has(q.id));
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

  if (loading) return <Loading />;
  if (error) return <div style={{ padding: 16 }}>불러오기에 실패했습니다.</div>;

  return (
    <>
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
      <FloatingButton type="insert" onClick={() => setIsModalOpen(true)}>
        <span className="full">질문 작성하기</span>
        <span className="short">질문 작성</span>
      </FloatingButton>
      <Modal isOpen={isModalOpen}>
        <ModalHeader>
          <img src="/question.svg" alt="질문" />
          <ModalLabel>질문을 작성하세요</ModalLabel>
          <CloseButton onClick={() => setIsModalOpen(false)}>✕</CloseButton>
        </ModalHeader>

        <ModalBody>
          <ProfileSection>
            <span>To.</span>
            <CircleImage src={subject?.imageSource} sizes="32px" />
            <Name>{subject?.name}</Name>
          </ProfileSection>

          <InputTextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="질문을 입력해주세요"
            height="50%"
          />

          <ButtonBox
            disabled={sending || !input.trim()}
            onClick={async () => {
              if (sending) return;
              const content = input.trim();
              setSending(true);
              try {
                const created = await postQuestion(subject?.id, content);
                // API returns the created question; map it like load.js does
                // and optimistically add it to the top. Keep hideAnswer: true on Post page.
                if (created && created.id) {
                  const questionTime = formatRelativeTime(created.createdAt);
                  const newItem = {
                    id: created.id,
                    questionProps: {
                      id: created.id,
                      question: created.content,
                      timeAgo: questionTime,
                    },
                    answerProps: {
                      state: 'pending',
                      userName: subject?.name,
                      userImage: subject?.imageSource,
                      timeAgo: null,
                      answer: '',
                    },
                    reactionProps: {
                      questionId: created.id,
                      likeNumber: created.like ?? 0,
                      deLikeNumber: created.dislike ?? 0,
                    },
                    // post 페이지에선 항상 답변 숨김
                    hideAnswer: true,
                  };
                  setQuestions((prev) => [newItem, ...prev]);
                  setTotalCount((prev) =>
                    typeof prev === 'number' ? prev + 1 : 1
                  );
                }
              } catch (e) {
                alert(`처리 실패: ${e?.message || ''}`);
              } finally {
                setSending(false);
                setIsModalOpen(false);
                setInput('');
              }
            }}
          >
            {sending ? '전송 중...' : '질문 보내기'}
          </ButtonBox>
        </ModalBody>
      </Modal>
    </>
  );
}

export default Post;

const FloatingButton = styled(Button)`
  position: fixed;
  bottom: 24px;
  right: 24px;

  width: 208px;
  height: 54px;

  font-size: 20px;

  .short {
    display: none;
  }

  @media (max-width: 768px) {
    width: 123px;
    .full {
      display: none;
    }
    .short {
      display: inline;
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`;

const ModalLabel = styled.h2`
  font-size: 24px;
  line-height: 30px;

  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 25px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: -4px;
  right: 0;
  background: none;
  border: none;
  font-size: 16px;
  color: #999;
  cursor: pointer;
  padding: 4px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  font-size: 14px;
`;

const Name = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: #333;
`;

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
  margin: 38px auto 0; // answer와 차이
  padding: 16px;
  box-sizing: border-box;
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
