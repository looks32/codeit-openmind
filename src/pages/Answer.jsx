import FeedCardGroup from '../components/FeedCard/FeedCardGroup';
import styled from 'styled-components';
import CircleImage from '../components/Profile';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getSubject,
  getQuestionsBySubject,
  deleteQuestionsBySubject,
  postQuestion,
} from '../utill/api';

// 상대시간 포맷터: ISO 시간을 받아 '방금/분/시간/일/주/개월/년 전'으로 변환
function formatRelativeTime(isoString) {
  if (!isoString) return '방금';
  const then = new Date(isoString).getTime();
  if (Number.isNaN(then)) return '방금';
  const diffSec = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (diffSec < 60) return '방금';
  const mins = Math.floor(diffSec / 60);
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}주 전`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}개월 전`;
  const years = Math.floor(days / 365);
  return `${years}년 전`;
}

function Answer() {
  const { id: subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [creating, setCreating] = useState(false);

  async function reload() {
    if (!subjectId) return;
    try {
      setLoading(true);
      setError(null);
      const [s, q] = await Promise.all([
        getSubject(subjectId),
        getQuestionsBySubject(subjectId),
      ]);
      setSubject(s);
      // console.log('s:', s, 'q:', q);
      const list = Array.isArray(q?.results)
        ? q.results
        : Array.isArray(q)
          ? q
          : [];
      // console.log('list:', list);
      const mappedQuestions = list.map((q) => {
        const questionTime = formatRelativeTime(q.createdAt);
        const answerTime = q.answer
          ? formatRelativeTime(q.answer.createdAt)
          : null;
        /* getSubject에서 가져온 정보: s
            getQuestionsBySubject에서 가져온 정보: q
            해당 값들을 FeedCardGroup의 각각 subject와 questions에 맞게 매핑
            이후 FeedCard에서 props로 받아 사용하기 위해 각각 questionProps, answerProps, reactionProps로 분리
          */
        return {
          id: q.id,
          questionProps: {
            id: q.id,
            question: q.content,
            timeAgo: questionTime,
          },
          answerProps: q.answer
            ? {
                answerId: q.answer.id,
                state: q.answer.isRejected ? 'rejected' : 'answered',
                userName: s?.name,
                userImage: s?.imageSource,
                timeAgo: answerTime,
                answer: q.answer.content,
              }
            : {
                state: 'pending',
                userName: s?.name,
                userImage: s?.imageSource,
                // pending일 때는 답변 시간이 없음
                timeAgo: null,
                answer: '',
              },
          reactionProps: {
            questionId: q.id,
            likeNumber: q.like ?? 0,
            deLikeNumber: q.dislike ?? 0,
          },
        };
      });
      // console.log('mappedQuestions:', mappedQuestions);
      setQuestions(mappedQuestions);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    reload();
  }, [subjectId]);

  if (loading) return <div style={{ padding: 16 }}>로딩 중…</div>;
  if (error) return <div style={{ padding: 16 }}>불러오기에 실패했습니다.</div>;

  return (
    <div>
      <TopRow>
        <Banner />
        <Logo src="/logo.png" alt="OpenMind" />
        <CircleImage src={subject?.imageSource} sizes="136px" />
        <UserName>{subject?.name}</UserName>
      </TopRow>

      <Content>
        <RightBar>
          <Button
            width="120px"
            height="35px"
            type="insert"
            disabled={deleting}
            onClick={async () => {
              if (deleting) return;
              try {
                setDeleting(true);
                await deleteQuestionsBySubject(subjectId); // 전체 삭제하기 API 호출
                setQuestions([]);
              } catch (e) {
                alert(`삭제 실패: ${e?.message || ''}`);
              } finally {
                setDeleting(false);
              }
            }}
          >
            전체 삭제하기
          </Button>
          {/* 질문 만들기 (테스트용 임시 버튼) */}
          <Button
            type="insert"
            disabled={creating}
            onClick={async () => {
              if (creating) return;
              try {
                setCreating(true);
                const created = await postQuestion(subjectId, '만들어진 질문d');
                const newQuestion = {
                  id: created.id,
                  questionProps: {
                    id: created.id,
                    question: created.content,
                    timeAgo: formatRelativeTime(created.createdAt),
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
                };
                setQuestions((prev) => [newQuestion, ...prev]);
              } catch (e) {
                alert(`질문 생성 실패: ${e?.message || ''}`);
              } finally {
                setCreating(false);
              }
            }}
          >
            질문 만들기
          </Button>
        </RightBar>
        <FeedCardGroup
          subject={subject}
          questions={questions}
          onChange={(next) => setQuestions(next)}
        />
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
  height: 67px; /* 필요 시 조절 */
  width: auto;
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
  margin: 16px 0 8px 0;
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
