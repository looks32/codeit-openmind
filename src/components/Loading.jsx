import styled from 'styled-components';
import ico from '../assets/loading.svg';

const LoadingWrap = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

function Loading() {
  return (
    <LoadingWrap>
      <img src={ico} alt="로딩중" />
    </LoadingWrap>
  );
}

export default Loading;
