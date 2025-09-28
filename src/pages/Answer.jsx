import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FeedCard from '../components/FeedCard/FeedCard';
import FeedCardGroup from '../components/FeedCard/FeedCardGroup';
import { getSubject } from '../utill/api';

function Answer() {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const s = await getSubject(id);
        if (!cancelled) setSubject(s);
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (id) load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <div style={{ padding: 16 }}>로딩 중…</div>;
  if (error) return <div style={{ padding: 16 }}>불러오기에 실패했습니다.</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ margin: '8px 0 16px' }}>{subject?.name || '이름 없음'}</h2>
      <FeedCardGroup>
        {/* 실제 데이터 연동 전까지는 데모 카드. subject id에 따라 분기할 수 있도록 key/id 부여 */}
        <FeedCard
          key={`${id}-pending-1`}
          questionProps={{
            question: '좋아하는 동물은?',
            timeAgo: '2주전',
            state: 'pending',
          }}
          answerProps={{
            state: 'pending',
            userName: subject?.name || '사용자',
          }}
          likes={'좋아요'}
          dislikes={'싫어요'}
        />
        <FeedCard
          key={`${id}-answered-1`}
          questionProps={{
            question: '가장 좋아하는 음식은?',
            timeAgo: '1주전',
            state: 'answered',
          }}
          answerProps={{
            state: 'answered',
            userName: subject?.name || '사용자',
            timeAgo: '3일전',
            answer: '파스타요!',
          }}
          likes={12}
          dislikes={0}
        />
      </FeedCardGroup>
    </div>
  );
}

export default Answer;
