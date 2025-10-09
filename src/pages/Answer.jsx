import FeedCardGroup from '../components/FeedCard/FeedCardGroup';
import styled from 'styled-components';
import CircleImage from '../components/Profile';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { deleteQuestionsBySubject, postQuestion } from '../utill/api';
import { loadQuestionsBySubject as loadData } from '../utill/load';

function Answer() {
  const { id: subjectId } = useParams(); // URL에서 subjectId 추출 (예: /post/:id/answer)
  const [deleting, setDeleting] = useState(false); // 전체 삭제하기 버튼 상태
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!subjectId) return;
      try {
        setLoading(true);
        setError(null);
        const { subject: s, questions: q } = await loadData(subjectId);
        if (!mounted) return;
        setSubject(s);
        setQuestions(q);
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

  if (loading) return <div style={{ padding: 16 }}>로딩 중…</div>;
  if (error) return <div style={{ padding: 16 }}>불러오기에 실패했습니다.</div>;

  return (
    <div>
      <TopRow>
        <Banner />
        <Logo src="/logo.png" alt="OpenMind" />

        <CircleImage src={subject?.imageSource} sizes="136px" />
        <UserName>{subject?.name}</UserName>
        {/* Button/share 컴포넌트 위치 */}
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
        </RightBar>
        <FeedCardGroup
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
