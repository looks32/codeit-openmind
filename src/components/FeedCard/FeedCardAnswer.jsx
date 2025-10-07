import styled from 'styled-components'
import Profile from '../Profile'
import InputTextArea from '../InputTextArea'
import ButtonBox from '../ButtonBox'
import { useState, useEffect } from 'react'
import CircleImage from '../Profile'

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
`

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`

const UserName = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: #222;
`

const TimeAgo = styled.span`
  font-size: 13px;
  color: #bdb0a7;
`

const StyledButtonWrap = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
`

export default function FeedCardAnswer({
  state = 'pending',
  answer = '답변 내용',
  userImage = '/cat.png',
  userName = '아초는고양이',
  timeAgo = '2주 전',
  editing = false,
  onSave,
}) {
  const [input, setInput] = useState('')

  useEffect(() => {
    // 편집 모드로 들어갈 때 기존 답변을 입력창에 채워줌
    if (editing) setInput(answer || '')
  }, [editing, answer])

  const isRejected = state === 'rejected'
  const canEdit = !isRejected && (state === 'pending' || editing)
  const isButtonActive = input.trim().length > 0

  return (
    <Card>
      <ProfileRow>
        <CircleImage src={userImage} sizes="48px" />
        <UserName>{userName}</UserName>
        {state !== 'pending' && !editing && (
          <TimeAgo>
            {typeof timeAgo === 'string' ? timeAgo : timeAgo?.text || ''}
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
              state === 'pending' ? '답변을 입력해주세요' : '답변을 수정하세요'
            }
          />
          <StyledButtonWrap>
            <ButtonBox
              style={{ width: '100%' }}
              disabled={!isButtonActive}
              onClick={() => {
                if (!isButtonActive) return
                if (onSave) onSave(input.trim())
              }}
            >
              {state === 'pending'
                ? '답변 완료'
                : editing
                  ? '수정 완료'
                  : '수정 완료'}
            </ButtonBox>
          </StyledButtonWrap>
        </>
      )}

      {/* 답변 완료 표시 (편집 모드가 아닐 때만) */}
      {state === 'answered' && !editing && (
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
  )
}
