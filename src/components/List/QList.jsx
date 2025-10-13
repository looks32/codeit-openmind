import styled from 'styled-components';
import Loading from '../Loading';
import Qcard from './Qcard';

const QListWrap = styled.ol`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20px;

  li {
    width: calc((100% / 4) - 15px);
  }

  // 유저카드 186px이하 시 3단으로 변경
  @media (max-width: 878px) {
    li {
      width: calc((100% / 3) - 14px);
    }
  }

  /* 모바일 */
  @media (max-width: 667px) {
    li {
      width: calc((100% / 2) - 10px);

      a {
        padding: 16px;
      }

      strong {
        font-size: 18px;
      }

      span {
        font-size: 14px;
      }

      img {
        width: 48px;
        height: 48px;
      }
    }
  }
`;

function QList({ sortList, loading }) {
  return (
    <QListWrap>
      {loading ? (
        <Loading />
      ) : (
        sortList.map((item) => {
          return (
            <li key={item.id}>
              <Qcard
                profile={item.imageSource}
                nickName={item.name}
                question={item.questionCount}
                id={item.id}
              />
            </li>
          );
        })
      )}
    </QListWrap>
  );
}

export default QList;
