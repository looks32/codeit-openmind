import styled from 'styled-components';
import messages from '../assets/ico_messages.png';
import CircleImage from '../components/Profile';

const Card = styled.div`
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #818181;

  > strong {
    display: block;
    margin-top: 12px;
    font-size: 20px;
  }

  .question_area {
    display: flex;
    justify-content: space-between;
    margin-top: 28px;
    color: #818181;
    .title {
      display: inline-block;
      padding-left: 22px;
      background: url(${messages}) no-repeat left center / 18px;
    }
  }
`;

function Qcard({ profile, nickName, question = 0 }) {
  return (
    <Card>
      <div className="profile">
        <CircleImage src={profile} sizes="60px" />
      </div>
      <strong>{nickName}</strong>
      <div className="question_area">
        <span className="title">받은 질문</span>
        <span>{question}개</span>
      </div>
    </Card>
  );
}

export default Qcard;
