import styled from 'styled-components';
import messages from '../assets/ico_messages.png';
import CircleImage from '../components/Profile';
import { Link } from 'react-router-dom';

const Card = styled.div`
  border-radius: 16px;
  border: 1px solid #818181;

  > a {
    display: block;
    padding: 20px;
  }

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

function Qcard({ profile, nickName, question = 0, id }) {
  return (
    <Card>
      <Link to={`/post/${id}/answer`} title="홈으로">
        <div className="profile">
          <CircleImage src={profile} sizes="60px" />
        </div>
        <strong>{nickName}</strong>
        <div className="question_area">
          <span className="title">받은 질문</span>
          <span>{question}개</span>
        </div>
      </Link>
    </Card>
  );
}

export default Qcard;
