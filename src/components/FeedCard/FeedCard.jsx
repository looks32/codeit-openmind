import styled, { css } from 'styled-components';
import { useState } from 'react';
import FeedCardQuestion from './FeedCardQuestion';
import FeedCardAnswer from './FeedCardAnswer';
import Reaction from '../Reaction';

// 임시 Badge, MoreButton, LikeButton, DislikeButton 컴포넌트
const Badge = styled.span`
  display: inline-block;
  color: #bdb0a7;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  padding: 4px 12px;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  color: #bdb0a7;
  cursor: pointer;
`;

const Popup = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 10;
  min-width: 100px;
`;

const PopupItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  color: #222;
  &:hover {
    background: #f5f5f5;
  }
`;

const CardWrap = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 32px 32px 0 32px;
  margin: 0 auto 32px auto;
  box-sizing: border-box;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #eee;
  margin: 24px 0 0 0;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
`;

export default function FeedCard({
  subjectId,
  questionProps = {},
  answerProps = {},
  reactionProps = {},
}) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <CardWrap>
      <TopRow>
        <Badge>
          {answerProps.state === 'pending' ? (
            <img src="/Gray.svg" alt="Badge" />
          ) : (
            <img src="/Brown.svg" alt="Badge" />
          )}
        </Badge>
        <div style={{ position: 'relative' }}>
          <MoreButton onClick={() => setShowPopup((v) => !v)}>⋯</MoreButton>
          {showPopup && (
            <Popup>
              <PopupItem onClick={() => setShowPopup(false)}>
                삭제하기
              </PopupItem>
              <PopupItem onClick={() => setShowPopup(false)}>
                수정하기
              </PopupItem>
            </Popup>
          )}
        </div>
      </TopRow>
      <FeedCardQuestion {...questionProps} />
      <FeedCardAnswer {...answerProps} />
      <Divider />
      <BottomRow>
        <Reaction {...reactionProps} />
      </BottomRow>
    </CardWrap>
  );
}
