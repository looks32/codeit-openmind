import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import FeedCardQuestion from './FeedCardQuestion';
import FeedCardAnswer from './FeedCardAnswer';
import Reaction from '../Reaction';
import { deleteQuestion, postAnswer, patchAnswer } from '../../utill/api';

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
  right: 0;
  border-radius: 8px;
  z-index: 10;
  display: flex;
  padding: 4px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid var(--Gray30, #cfcfcf);
  background: var(--Gray10, #fff);

  /* 1pt */
  box-shadow: 0 4px 4px 0 rgba(140, 140, 140, 0.25);
`;

const PopupItem = styled.div`
  font-size: 14px;
  display: flex;
  width: 103px;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: var(--Gray50, #515151);

  &:hover {
    background: #f5f5f5;
    color: var(--Gray60, #3b3b3b);
    cursor: pointer;
  }
  &:active {
    background: var(--Gray10, #fff);
    color: var(--Blue, #1877f2);
  }
`;

const EditIcon = styled.svg`
  display: inline-block;
  color: var(--Gray50, #515151);
  width: 14px;
  height: 14px;
  vertical-align: middle;
  transition: color 0.15s ease;

  ${PopupItem}:hover & {
    color: var(--Gray60, #3b3b3b);
  }

  ${PopupItem}:active & {
    color: var(--Blue, #1877f2);
  }
`;

const RejectIcon = styled.svg`
  display: inline-block;
  color: var(--Gray50, #515151);
  width: 14px;
  height: 14px;
  vertical-align: middle;
  transition: color 0.15s ease;

  ${PopupItem}:hover & {
    color: var(--Gray60, #3b3b3b);
  }

  ${PopupItem}:active & {
    color: var(--Blue, #1877f2);
  }
`;

const DeleteIcon = styled.svg`
  display: inline-block;
`;

const CardWrap = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 32px;
  margin: 0 auto 20px auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    gap: 24px;
    padding: 24px;
  }
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--Gray30, #cfcfcf);
  margin: 0;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
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
    if (answerProps.state !== answerState) {
      setAnswerState(answerProps.state);
    }
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
                {!isEditing && answerState === 'answered' && (
                  <PopupItem
                    onClick={() => {
                      setIsEditing(true);
                      setShowPopup(false);
                    }}
                  >
                    <EditIcon
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 14 14"
                    >
                      <g clipPath="url(#clip0_1_288)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.1991 2.3656C1.49994 2.06476 1.90796 1.89575 2.33341 1.89575H6.41675C6.65837 1.89575 6.85425 2.09163 6.85425 2.33325C6.85425 2.57488 6.65837 2.77075 6.41675 2.77075H2.33341C2.14003 2.77075 1.95456 2.84757 1.81782 2.98432C1.68107 3.12107 1.60425 3.30653 1.60425 3.49992V11.6666C1.60425 11.86 1.68107 12.0454 1.81782 12.1822C1.95456 12.3189 2.14003 12.3958 2.33341 12.3958H10.5001C10.6935 12.3958 10.8789 12.3189 11.0157 12.1822C11.1524 12.0454 11.2292 11.86 11.2292 11.6666V7.58325C11.2292 7.34163 11.4251 7.14575 11.6667 7.14575C11.9084 7.14575 12.1042 7.34163 12.1042 7.58325V11.6666C12.1042 12.092 11.9352 12.5001 11.6344 12.8009C11.3336 13.1017 10.9255 13.2708 10.5001 13.2708H2.33341C1.90796 13.2708 1.49994 13.1017 1.1991 12.8009C0.898258 12.5001 0.729248 12.092 0.729248 11.6666V3.49992C0.729248 3.07447 0.898258 2.66644 1.1991 2.3656Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M11.6668 1.53345C11.4546 1.53345 11.2511 1.61773 11.1011 1.76774L5.64514 7.22372L5.26804 8.7321L6.77642 8.355L12.2324 2.89902C12.3824 2.74901 12.4667 2.54554 12.4667 2.33338C12.4667 2.12123 12.3824 1.91776 12.2324 1.76774C12.0824 1.61773 11.8789 1.53345 11.6668 1.53345ZM10.4824 1.14902C10.7965 0.834913 11.2225 0.658447 11.6668 0.658447C12.111 0.658447 12.537 0.834913 12.8511 1.14902C13.1652 1.46314 13.3417 1.88916 13.3417 2.33338C13.3417 2.77761 13.1652 3.20363 12.8511 3.51774L7.30945 9.05941C7.25338 9.11548 7.18313 9.15526 7.1062 9.17449L4.77287 9.75782C4.62378 9.79509 4.46606 9.75141 4.3574 9.64274C4.24873 9.53408 4.20505 9.37636 4.24232 9.22728L4.82565 6.89394C4.84489 6.81702 4.88466 6.74676 4.94073 6.69069L10.4824 1.14902Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_288">
                          <rect width="14" height="14" fill="white" />
                        </clipPath>
                      </defs>
                    </EditIcon>
                    수정하기
                  </PopupItem>
                )}
                {!isEditing && answerState !== 'rejected' && (
                  <PopupItem
                    onClick={async () => {
                      setShowPopup(false);
                      try {
                        if (answerState === 'pending') {
                          // 아직 답변이 없을 때: 거절 답변 생성
                          await postAnswer(questionProps.id, '답변 거절', true);
                        } else if (answerState === 'answered') {
                          // 이미 답변이 있을 때: 거절로 상태 변경
                          await patchAnswer(
                            answerProps.answerId,
                            localAnswer || '',
                            true
                          );
                        }
                        setAnswerState('rejected');
                      } catch (e) {
                        console.log(`거절 실패: ${e?.message || ''}`);
                      }
                    }}
                  >
                    <RejectIcon
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z"
                        fill="black"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.9999 20.0001L3.99989 5.00011L5.06055 3.93945L20.0605 18.9395L18.9999 20.0001Z"
                        fill="black"
                      />
                    </RejectIcon>
                    거절하기
                  </PopupItem>
                )}
                <PopupItem
                  onClick={async () => {
                    setShowPopup(false);
                    if (deleting) return;
                    try {
                      setDeleting(true);
                      await deleteQuestion(questionProps.id);
                      onDeleted?.(questionProps.id);
                    } catch (e) {
                      console.log(`삭제 실패: ${e?.message || ''}`);
                    } finally {
                      setDeleting(false);
                    }
                  }}
                >
                  <DeleteIcon
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M5 5.83054L1.0018 9.82872C0.892682 9.93785 0.755523 9.99368 0.59032 9.9962C0.42513 9.99873 0.28545 9.94291 0.171278 9.82872C0.0570925 9.71455 0 9.57613 0 9.41346C0 9.2508 0.0570925 9.11238 0.171278 8.9982L4.16946 5L0.171278 1.0018C0.0621496 0.892681 0.00632452 0.755523 0.00380254 0.59032C0.00126742 0.425131 0.0570925 0.28545 0.171278 0.171278C0.28545 0.0570925 0.42387 0 0.586537 0C0.749205 0 0.887625 0.0570925 1.0018 0.171278L5 4.16946L8.9982 0.171278C9.10732 0.0621496 9.24448 0.00632452 9.40968 0.00380254C9.57487 0.00126742 9.71455 0.0570925 9.82872 0.171278C9.94291 0.28545 10 0.423869 10 0.586537C10 0.749205 9.94291 0.887624 9.82872 1.0018L5.83054 5L9.82872 8.9982C9.93785 9.10732 9.99368 9.24448 9.9962 9.40968C9.99873 9.57487 9.94291 9.71455 9.82872 9.82872C9.71455 9.94291 9.57613 10 9.41346 10C9.2508 10 9.11238 9.94291 8.9982 9.82872L5 5.83054Z"
                      fill="#515151"
                    />
                  </DeleteIcon>
                  삭제하기
                </PopupItem>
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
          state={answerState}
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
