import styled from 'styled-components';
import likeIco from '../assets/ico_thumbs_up.png';
import likeActiveIco from '../assets/ico_thumbs_up_active.png';
import deLikeIco from '../assets/ico_thumbs_down.png';
import deLikeActiveIco from '../assets/ico_thumbs_down_active.png';
import { useState } from 'react';

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

  const onClickLike = () => {
    if (isLikeActive) {
      setLikeEa(Number(likeEa) - 1);
    } else {
      setLikeEa(Number(likeEa) + 1);
    }
    setIsLikeActive(!isLikeActive);

    if (likeClick) {
      likeClick();
    }
  };

  const onClickDeLike = () => {
    if (isDeLikeActive) {
      setDeLikeEa(Number(deLikeEa) - 1);
    } else {
      setDeLikeEa(Number(deLikeEa) + 1);
    }
    setDeIsLikeActive(!isDeLikeActive);

    if (deLikeClick) {
      deLikeClick();
    }
  };

  return (
    <ReactionArea>
      <button
        className={`like ${isLikeActive ? 'active' : ''}`}
        onClick={onClickLike}
      >
        <img src={isLikeActive ? likeActiveIco : likeIco} alt="좋아요 아이콘" />
        좋아요 {likeEa <= 0 ? '' : likeEa}
      </button>
      <button
        className={isDeLikeActive ? 'active' : ''}
        onClick={onClickDeLike}
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
