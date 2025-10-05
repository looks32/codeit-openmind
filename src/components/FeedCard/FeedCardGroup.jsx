import styled from 'styled-components';
import FeedCard from './FeedCard';

const GroupWrap = styled.div`
  width: 100%;
  max-width: 1200px;
  min-height: 600px;
  margin: 0 auto;
  border-radius: 16px;
  border: 1px solid var(--Brown-30, #c7bbb5);
  background: var(--Brown-10, #f5f1ee);
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Banner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: var(--Brown-40, #542f1a);
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: Actor;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 125%;
`;

const Empty = styled.img`
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export default function FeedCardGroup({ subject, questions = [], onChange }) {
  const handleDeleted = (id) => {
    onChange?.(questions.filter((q) => q.id !== id));
  };

  return (
    <GroupWrap>
      <Banner>
        {questions?.length > 0 ? (
          <>
            <img src="/Messages.svg" alt="Messages" />
            {questions.length}개의 질문이 있습니다
          </>
        ) : (
          <>
            <img src="/Messages.svg" alt="Messages" />
            아직 질문이 없습니다
          </>
        )}
      </Banner>

      {questions?.length > 0 ? (
        questions.map((q) => (
          <FeedCard
            key={q.id}
            subjectId={subject.id}
            questionProps={q.questionProps}
            answerProps={q.answerProps}
            reactionProps={q.reactionProps}
            hideAnswer={q.hideAnswer}
            onDeleted={handleDeleted}
          />
        ))
      ) : (
        <Empty src="/empty.svg" alt="empty" />
      )}
    </GroupWrap>
  );
}
