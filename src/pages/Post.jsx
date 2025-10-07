import FeedCardGroup from '../components/FeedCard/FeedCardGroup';
import styled from 'styled-components';
import CircleImage from '../components/Profile';
import Button from '../components/Button';
import { useState } from 'react';
import Modal from '../components/Popup';

function Post({ userImage = '/cat.jpg', userName = '아초는고양이' }) {
  const [items, setItems] = useState([]);
  const [openPop, setOpenPop] = useState(false);

  const handleOpen = () => {
    setOpenPop(true);

  }
  const handleClose = () => {
    
    setOpenPop(false);
  }
  return (
    <div>
      <TopRow>
        <Banner />
        <Logo src="/logo.png" alt="OpenMind" />

        <CircleImage src={userImage} sizes="136px" />
        <UserName>{userName}</UserName>
        Button/share 컴포넌트 위치
      </TopRow>

      <Content>
        <RightBar>
          <Button type='insert' onClick={handleOpen}/>
          <Modal openPop={openPop} onClose={handleClose}/>
        </RightBar>
        <FeedCardGroup items={items} count={items.length} />
      </Content>
    </div>
  );
}

export default Post;

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// 배너 이미지를 배경으로 사용하고, 내부에 로고를 배치
const Banner = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  max-width: 1200px;
  height: 234px;
  margin: 0 auto;
  background: url('/banner.png') center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  margin-top: 50px;
  height: 67px; /* 필요 시 조절 */
  width: auto;
`;

const UserName = styled.div`
  color: var(--Grayscale-60, #000);
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: Actor;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 40px; /* 125% */
  margin: 16px 0 8px 0;
`;

// FeedCardGroup과 동일한 폭에 맞춘 컨테이너와 우측 정렬 바
const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  box-sizing: border-box;
`;

const RightBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;
