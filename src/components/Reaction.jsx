import styled from 'styled-components';
import likeIco from '../assets/ico_thumbs_up.png';
import likeActiveIco from '../assets/ico_thumbs_up_active.png';
import deLikeIco from '../assets/ico_thumbs_down.png';
import deLikeActiveIco from '../assets/ico_thumbs_down_active.png';
import { useEffect, useState } from 'react';
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
  const storageKey = `reaction:${questionId}`;
  const [storedReaction, setStoredReaction] = useState(null); // 'like' | 'dislike' | null

  // 마운트 시 해당 질문에 대한 사용자의 기존 반응 복구
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === 'like') {
        setIsLikeActive(true);
        setDeIsLikeActive(false);
        setStoredReaction('like');
      } else if (saved === 'dislike') {
        setIsLikeActive(false);
        setDeIsLikeActive(true);
        setStoredReaction('dislike');
      } else {
        setIsLikeActive(false);
        setDeIsLikeActive(false);
        setStoredReaction(null);
      }
    } catch (_) {
      // no-op
    }
  }, [questionId]);

  const onClickLike = async () => {
    if (busy) return;
    if (storedReaction) {
      console.log('이미 반응을 남기셨습니다. 한 사람당 1번만 가능합니다.');
      return;
    }
    setBusy(true);
    try {
      await postReaction(questionId, 'like');
      setIsLikeActive(true);
      setDeIsLikeActive(false);
      setLikeEa((n) => n + 1);
      localStorage.setItem(storageKey, 'like');
      setStoredReaction('like');
      // 콜백이 전달된 경우 알림
      likeClick && likeClick();
    } catch (e) {
      console.log(`좋아요 실패: ${e?.message || ''}`);
    } finally {
      setBusy(false);
    }
  };

  const onClickDeLike = async () => {
    if (busy) return;
    if (storedReaction) {
      console.log('이미 반응을 남기셨습니다. 한 사람당 1번만 가능합니다.');
      return;
    }
    setBusy(true);
    try {
      await postReaction(questionId, 'dislike');
      setIsLikeActive(false);
      setDeIsLikeActive(true);
      setDeLikeEa((n) => n + 1);
      localStorage.setItem(storageKey, 'dislike');
      setStoredReaction('dislike');
      deLikeClick && deLikeClick();
    } catch (e) {
      console.log(`싫어요 실패: ${e?.message || ''}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <ReactionArea>
      <button
        className={`like ${isLikeActive ? 'active' : ''}`}
        onClick={onClickLike}
        disabled={busy || !!storedReaction}
      >
        <img src={isLikeActive ? likeActiveIco : likeIco} alt="좋아요 아이콘" />
        좋아요 {likeEa <= 0 ? '' : likeEa}
      </button>
      <button
        className={isDeLikeActive ? 'active' : ''}
        onClick={onClickDeLike}
        disabled={busy || !!storedReaction}
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
