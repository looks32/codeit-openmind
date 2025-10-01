import FeedCard from '../components/FeedCard/FeedCard';
import FeedCardGroup from '../components/FeedCard/FeedCardGroup';

function Post() {
  return (
    <div style={{ padding: 16 }}>
      <FeedCardGroup>
        {/* 1) 미답변 - 빈 입력 (버튼 비활성) */}
        <FeedCard
          questionProps={{
            question: '좋아하는 동물은?',
            timeAgo: '2주전',
            state: 'pending',
          }}
          answerProps={{ state: 'pending', userName: '아초는고양이' }}
          likes={'좋아요'}
          dislikes={'싫어요'}
        />

        {/* 2) 미답변 - 예시 텍스트로 활성화 상태를 보여주기 위해 placeholder만 그대로, 실제 활성은 사용자가 입력하면 됨 */}
        <FeedCard
          questionProps={{
            question: '좋아하는 동물은?',
            timeAgo: '2주전',
            state: 'pending',
          }}
          answerProps={{ state: 'pending', userName: '아초는고양이' }}
          likes={'좋아요'}
          dislikes={'싫어요'}
        />

        {/* 3) 답변 완료 */}
        <FeedCard
          questionProps={{
            question:
              '좋아하는 동물은?좋아하는 동물은?좋아하는 동물은? 좋아하동 물은?',
            timeAgo: '2주전',
            state: 'answered',
          }}
          answerProps={{
            state: 'answered',
            userName: '아초는고양이',
            timeAgo: '2주전',
            answer: `그릇을 몰라 귀는 이상 오직 피고, 가슴이 이상, 못할 범바람이다. 찾아다녀도, 젖인 방향하였다.`,
          }}
          likes={12}
          dislikes={0}
        />

        <FeedCard
          questionProps={{
            question:
              '좋아하는 동물은?좋아하는 동물은?좋아하는 동물은? 좋아하동 물은?',
            timeAgo: '2주전',
            state: 'answered',
          }}
          answerProps={{
            state: 'rejected',
            userName: '아초는고양이',
            timeAgo: '2주전',
          }}
          likes={12}
          dislikes={0}
        />
      </FeedCardGroup>
    </div>
  );
}

export default Post;
