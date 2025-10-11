import styled from "styled-components";
import { useState, useEffect } from "react";
import linkImg from "../assets/LinkCopy.png";
import kakaoImg from "../assets/kakao.png";
import facebookImg from "../assets/facebook.png";

const OutBoundWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 12px;
`;

const IconBtn = styled.button`
  border: none;
  background: none;
  `;
  
  const LinkIcon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const ShowingText = styled.div`
  font-size: 16px;
  font-weight: 500;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--Gray60);
  color: var(--Gray10);
  padding: 12px 20px;
  border-radius: 8px;
`;

function OutBound() {
  const url = window.location.href;
  const [showText, setShowText] = useState(false);

  // 1️⃣ Kakao SDK 동적 로드 + 초기화
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("1e68dd50404a010e60c9eabe88e808a4");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;

    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init("1e68dd50404a010e60c9eabe88e808a4");
      }
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  //  링크 복사
  const handleClick = () => {
    navigator.clipboard.writeText(url)
    .then(() => {
      setShowText(true);
      setTimeout(() => setShowText(false), 5000);
    });
  };

  //  카카오톡 공유
  const handleKakaoShare = () => {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "이 페이지를 공유해보세요!",
        description: "React로 만든 카카오톡 공유 예제",
        imageUrl:
          "https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "웹에서 보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };
  
  // 페이스북 공유 
  const handleFacebookShare = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookShareUrl, '_blank', "width=600, height=600"); 
  }; 

  return (
    <OutBoundWrap>
      <IconBtn>
        <LinkIcon src={linkImg} onClick={handleClick} />
        {showText && <ShowingText>URL이 복사되었습니다</ShowingText>}
      </IconBtn>
      <IconBtn>
        <LinkIcon src={kakaoImg} onClick={handleKakaoShare} />
      </IconBtn>
      <IconBtn>
        <LinkIcon src={facebookImg} onClick={handleFacebookShare} />
      </IconBtn>
    </OutBoundWrap>
  );
}

export default OutBound;
