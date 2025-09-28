import styled from 'styled-components';
import ReactionButton from './ReactionButton';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px; // 여기서 간격 조정
`;

export default function ReactionButtons({
  likeActive,
  dislikeActive,
  likeCount,
  onLike,
  onDislike,
}) {
  return (
    <Wrapper>
      <ReactionButton
        icon="/thumbs-up.svg"
        label={`좋아요 ${likeCount > 0 ? likeCount : ''}`}
        active={likeActive}
        color="#1877F2"
        onClick={onLike}
      />
      <ReactionButton
        icon="/thumbs-down.svg"
        label="싫어요"
        active={dislikeActive}
        color="black"
        onClick={onDislike}
      />
    </Wrapper>
  );
}
