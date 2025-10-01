import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  background: transparent;
  border-radius: 0;
  box-sizing: border-box;
  margin: 0 auto 32px auto;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  line-height: 125%;
`;

const Label = styled.span`
  color: #bdb0a7;
  font-size: 13px;
`;

const TimeAgo = styled.span`
  color: #bdb0a7;
  font-size: 13px;
`;

const QuestionText = styled.div`
  color: #222;
  font-size: 16px;
  word-break: break-all;
`;

export default function FeedCardQuestion({ question = "좋아하는 동물은?좋아하는 동물은?좋아하는 동물은? 좋아하동 물은?", timeAgo = "2주 전" }) {
  return (
    <Card>
      <Row>
        <Label>질문 ·</Label>
        <TimeAgo>{typeof timeAgo === "string" ? timeAgo : timeAgo?.text || ""}</TimeAgo>
      </Row>
      <QuestionText>{question}</QuestionText>
    </Card>
  );
}