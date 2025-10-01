import styled from "styled-components";
import Profile from "../Profile";
import InputTextArea from "../InputTextArea";
import ButtonBox from "../ButtonBox";

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
`;

import { useState } from "react";

export default function FeedCardAnswer({ state = "pending", answer = "답변 내용", userName = "아초는고양이", timeAgo = "2주 전" }) {
  // state: "pending" | "answered" | "rejected"
  const [input, setInput] = useState("");
  const isButtonActive = input.trim().length > 0;
  return (
    <Card>
      <ProfileRow>
        <Profile />
        <UserName>{userName}</UserName>
        {state !== "pending" && <TimeAgo>{typeof timeAgo === "string" ? timeAgo : timeAgo?.text || ""}</TimeAgo>}
      </ProfileRow>
      {state === "pending" && (
        <>
          <InputTextArea value={input} onChange={e => setInput(e.target.value)} placeholder="답변을 입력해주세요" />
          <StyledButtonWrap>
            <ButtonBox style={{ width: "100%" }} disabled={!isButtonActive}>답변 완료</ButtonBox>
          </StyledButtonWrap>
        </>
      )}
      {state === "answered" && (
        <div style={{ whiteSpace: "pre-line", color: "#222", fontSize: "16px" }}>{answer}</div>
      )}
      {state === "rejected" && (
        <div style={{ color: "red", fontSize: "16px" }}>답변 거절</div>
      )}
    </Card>
  );
}