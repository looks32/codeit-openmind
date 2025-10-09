import styled from 'styled-components';
import likeIco from '../assets/ico_thumbs_up.png';
import likeActiveIco from '../assets/ico_thumbs_up_active.png';
import deLikeIco from '../assets/ico_thumbs_down.png';
import deLikeActiveIco from '../assets/ico_thumbs_down_active.png';
import { useState } from 'react';
import { postReaction } from '../utill/api';

const ReactionArea = styled.div`
  display: flex;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    width: 83px;
    font-size: 14px;
    color: #818181;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;

    &.active {
      color: #000;
    }

    &.active.like {
      color: #1877f2;
    }

    & ~ button {
      margin-left: 32px;
    }

    img {
      width: 16px;
      margin-right: 6px;
    }
  }
`;

function Reaction({
  questionId,
  likeActive = false,
  deLikeActive = false,
  likeNumber = 0,
  deLikeNumber = 0,
  likeClick,
  deLikeClick,
}) {
  const [isLikeActive, setIsLikeActive] = useState(likeActive);
  const [isDeLikeActive, setDeIsLikeActive] = useState(deLikeActive);
  const [likeEa, setLikeEa] = useState(likeNumber);
  const [deLikeEa, setDeLikeEa] = useState(deLikeNumber);
  const [busy, setBusy] = useState(false); // API 요청 중에는 버튼 비활성화

  const onClickLike = async () => {
    if (busy) return;
    setIsLikeActive(!isLikeActive);
    setBusy(true);
    try {
      if (!isLikeActive) await postReaction(questionId, 'like');
      setLikeEa(isLikeActive ? likeEa - 1 : likeEa + 1);
    } catch (e) {
      alert(`좋아요 실패: ${e?.message || ''}`);
    } finally {
      setBusy(false);
    }
  };

  const onClickDeLike = async () => {
    if (busy) return;
    setDeIsLikeActive(!isDeLikeActive);
    setBusy(true);
    try {
      if (!isDeLikeActive) await postReaction(questionId, 'dislike');
      setDeLikeEa(isDeLikeActive ? deLikeEa - 1 : deLikeEa + 1);
    } catch (e) {
      alert(`싫어요 실패: ${e?.message || ''}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <ReactionArea>
      <button
        className={`like ${isLikeActive ? 'active' : ''}`}
        onClick={onClickLike}
        disabled={busy}
      >
        <img src={isLikeActive ? likeActiveIco : likeIco} alt="좋아요 아이콘" />
        좋아요 {likeEa <= 0 ? '' : likeEa}
      </button>
      <button
        className={isDeLikeActive ? 'active' : ''}
        onClick={onClickDeLike}
        disabled={busy}
      >
        <img
          src={isDeLikeActive ? deLikeActiveIco : deLikeIco}
          alt="싫어요 아이콘"
        />
        싫어요 {deLikeEa <= 0 ? '' : deLikeEa}
      </button>
    </ReactionArea>
  );
}

export default Reaction;
