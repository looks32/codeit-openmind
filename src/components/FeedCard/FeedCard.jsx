import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import FeedCardQuestion from './FeedCardQuestion';
import FeedCardAnswer from './FeedCardAnswer';
import Reaction from '../Reaction';
import { deleteQuestion } from '../../utill/api';

// 임시 Badge, MoreButton, LikeButton, DislikeButton 컴포넌트
const Badge = styled.span`
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  font-size: 22px;
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
  margin-bottom: 32px;
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
  hideAnswer = false,
  onDeleted = () => {},
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localAnswer, setLocalAnswer] = useState(answerProps.answer || '');
  const [deleting, setDeleting] = useState(false);
  // 답변 상태를 로컬로 보관해 즉시 UI 반영
  const [answerState, setAnswerState] = useState(answerProps.state);

  useEffect(() => {
    setAnswerState(answerProps.state);
  }, [answerProps.state]);

  const handleSave = (next) => {
    setLocalAnswer(next);
    setIsEditing(false);
  };

  return (
    <CardWrap>
      <TopRow>
        <Badge>
          {answerState === 'pending' ? (
            <img src="/Gray.svg" alt="Badge" />
          ) : (
            <img src="/Brown.svg" alt="Badge" />
          )}
        </Badge>
        {!hideAnswer && (
          <div style={{ position: 'relative' }}>
            <MoreButton onClick={() => setShowPopup((v) => !v)}>⋯</MoreButton>
            {showPopup && (
              <Popup>
                <PopupItem
                  onClick={async () => {
                    setShowPopup(false);
                    if (deleting) return;
                    try {
                      setDeleting(true);
                      await deleteQuestion(questionProps.id);
                      onDeleted?.(questionProps.id);
                    } catch (e) {
                      alert(`삭제 실패: ${e?.message || ''}`);
                    } finally {
                      setDeleting(false);
                    }
                  }}
                >
                  삭제하기
                </PopupItem>
                {!isEditing && answerState === 'answered' && (
                  <PopupItem
                    onClick={() => {
                      setIsEditing(true);
                      setShowPopup(false);
                    }}
                  >
                    수정하기
                  </PopupItem>
                )}
              </Popup>
            )}
          </div>
        )}
      </TopRow>
      <FeedCardQuestion {...questionProps} />
      {!(hideAnswer && answerProps.state === 'pending') && (
        <FeedCardAnswer
          {...answerProps}
          questionId={questionProps.id}
          answerId={answerProps.answerId}
          answer={localAnswer}
          editing={isEditing}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          onStateChange={(s) => setAnswerState(s)}
        />
      )}
      <Divider />
      <BottomRow>
        <Reaction {...reactionProps} />
      </BottomRow>
    </CardWrap>
  );
}
