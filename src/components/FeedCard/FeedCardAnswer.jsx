import styled from 'styled-components';
import InputTextArea from '../InputTextArea';
import ButtonBox from '../ButtonBox';
import { useState, useEffect } from 'react';
import CircleImage from '../Profile';
import { postAnswer, patchAnswer } from '../../utill/api';

// 공통 카드 스타일
const Card = styled.div`
  width: 100%;
  background: transparent;
  border-radius: 0;
  box-sizing: border-box;
  margin: 0 auto 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: #222;
`;

const TimeAgo = styled.span`
  font-size: 13px;
  color: #bdb0a7;
`;

const StyledButtonWrap = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
`;

export default function FeedCardAnswer({
  questionId,
  answerId,
  state = 'pending',
  answer = '답변 내용',
  userImage = '/cat.png',
  userName = '아초는고양이',
  timeAgo = '2주 전',
  editing = false,
  onSave,
  onCancel,
  onStateChange,
}) {
  const [input, setInput] = useState('');
  // post 성공 시 로컬에서 상태를 answered로 바꿔 UI를 전환
  const [currentState, setCurrentState] = useState(state);
  // 새로 생성된 답변의 id를 보관해 이후 수정 시 사용
  const [currentAnswerId, setCurrentAnswerId] = useState(answerId);
  const [size, setSize] = useState(window.innerWidth <= 768 ? "32px" : "48px");

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth <= 768 ? "32px" : "48px");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentState(state);
  }, [state]);

  useEffect(() => {
    setCurrentAnswerId(answerId);
  }, [answerId]);

  useEffect(() => {
    if (editing) setInput(answer || '');
  }, [editing, answer]);

  const isRejected = currentState === 'rejected';
  const canEdit = !isRejected && (currentState === 'pending' || editing);
  const isButtonActive = input.trim().length > 0;
  return (
    <Card>
      <ProfileRow>
        <CircleImage src={userImage} sizes={size} />
        <UserName>{userName}</UserName>
        {currentState !== 'pending' && !editing && (
          <TimeAgo>
            {typeof timeAgo === 'string' && timeAgo ? timeAgo : '방금'}
          </TimeAgo>
        )}
      </ProfileRow>

      {/* 답변 입력창 (대기중이거나 편집 모드일 때만, 거절 상태에서는 항상 비활성) */}
      {canEdit && (
        <>
          <InputTextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              currentState === 'pending'
                ? '답변을 입력해주세요'
                : '답변을 수정하세요'
            }
          />
          <StyledButtonWrap>
            <ButtonBox
              style={{ width: '100%' }}
              disabled={!isButtonActive}
              onClick={async () => {
                if (!isButtonActive) return;
                const content = input.trim();
                try {
                  if (currentState === 'pending') {
                    const created = await postAnswer(questionId, content);
                    // 생성된 답변 ID 저장 후 상태 전환
                    setCurrentAnswerId(created?.id);
                    setCurrentState('answered');
                    onStateChange && onStateChange('answered');
                  } else if (editing) {
                    await patchAnswer(currentAnswerId, content);
                    onStateChange && onStateChange('answered');
                  }
                  onSave && onSave(content);
                } catch (e) {
                  alert(`처리 실패: ${e?.message || ''}`);
                }
              }}
            >
              {currentState === 'pending'
                ? '답변 완료'
                : editing
                  ? '수정 완료'
                  : '수정 중...'}
            </ButtonBox>
          </StyledButtonWrap>
        </>
      )}

      {/* 답변 완료 표시 (편집 모드가 아닐 때만) */}
      {currentState === 'answered' && !editing && (
        <div
          style={{
            whiteSpace: 'pre-line',
            color: '#222',
            fontSize: '16px',
          }}
        >
          {answer}
        </div>
      )}

      {isRejected && (
        <div style={{ color: 'red', fontSize: '16px' }}>답변 거절</div>
      )}
    </Card>
  );
}
