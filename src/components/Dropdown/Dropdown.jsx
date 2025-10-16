import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ArrowDown from '../../assets/Arrow-down.svg';
import ArrowUp from '../../assets/Arrow-up.svg';

export default function Dropdown({
  label = '이름순', // 기본 버튼에 표시할 텍스트 값
  onOpenChange, // 열리거나 닫힐 때 연결한 부모에게 알려주기 위한 옵션
  children, // 펼쳤을때 보여줄 내용 메뉴 내용은 부모가 전달
}) {
  const [open, setOpen] = useState(false); // 드롭다운이 열려 있는지 (flase=닫힘)을 관리
  const ref = useRef(null); // 외부 클릭 감지 루트 DOM을 가리킴
  const toggleRef = React.useRef(null);

  useEffect(() => { 
    function handleOutside(e) { // 이 함수는 클릭 대상이 ref.current(드롭 영역) 내부에 있지 않으면 외부 클릭으로 판단
      if (ref.current && !ref.current.contains(e.target)) {
        if (open) { // 외부 클릭일때 opne이 트루이면 
          setOpen(false); // 이걸로 닫고
          if (onOpenChange) onOpenChange(false); //openchange가 있으면 부모에게 닫혔음을 알림
        }
      }
    }
    document.addEventListener('mousedown', handleOutside); // 마운트 되면 문서 전체에 마우스다운 이벤트 리스너를 추가함 바깜 클릭 감지 목적
    return () => document.removeEventListener('mousedown', handleOutside); // useEffect의 cleanup 함수임 언망누트 되거 배열이 바뀔 때 리스너를 제거해서 중복이나 메모리 누수 방지
  }, [open, onOpenChange]); 
  // open 또는 onOpenChange가 바뀔때 다시 실행 보통은 open이 바껴도 리스너 등록/해제가 필요없지만
  // onOpenChange가 외부에서 바뀔 경우 안전하게 최신 콜백을 사용하게 하려는 것 

  function toggle() { // 드롭다운의 열림 상태를 반전
    setOpen(p => {  // 함수형 업데이트 이전 상태 p를 받아 안전하게 다음 상태를 계산함
                    // 구글 피셜 비동기 상태 업데이트에서도 안전하다 함
      const next = !p; // 다음 상태를 계산
      if (onOpenChange) onOpenChange(next); // 부모에게 새 상태(열림/닫힘)을 알려줌
      return next; // 실제로 상태를 업데이트
    });
  }

  function handleToggleKey(e) { // 엔터나 스페이스로 드롭 다운 토글 되게 함
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // 드롭다운이 선택 되었을때 페이지 스크롤이나 기본 동작을 박고 토글을 호출
      toggle(); // onKeyDown에 연결하여 키보드로도 열고 닫기 가능
    }
  }

  return (
    // 드롭다운의 최상위 요소. ref를 붙여서 외부 클림 감지를 해 내부인지 아닌지 확인
    <Wrap ref={ref}>    
      <Toggle     // 드롭다운을 여닫는 버튼 컴포넌트
        type="button"   // 폼 내부에 있어도 기본 submit을 막음
        onClick={toggle}    // 클릭하면 토글 함수가 호출되서 오픈 상태를 만듬
        onKeyDown={handleToggleKey}   // 위의 키보드 접근이 토글되게 함
        open={open}     // 스타일 컴포넌트에 현재 열림 여부를 전달해서 테두리 호버 등 스타일을 변경
        aria-haspopup="listbox"   // 이 버튼이 리스트박스를 열었다는 의미로 스크린리더에 알림
        aria-expanded={open}    // 메뉴가 열려 있으면 true 닫히면 false로 상태를 알림
      >  
        <Label open={open}>{label}</Label>    
        {/* 버튼에 표시되는 텍스트 open을 prop으로 색상을 바꿀 수 이씅ㅁ */}
        <ArrowWrapper aria-hidden="true">
          {/* 화살표는 장식이므로 보조 기술에서 무시하게 */}
          <img src={open ? ArrowUp : ArrowDown} alt="arrow" />
          {/* 열림 닫힘 상태에 따라 화살표 이미지 바뀌게 */}
        </ArrowWrapper>
      </Toggle>

      {open && children && ( // chiildren(부모요소가 전달한 메뉴)이 있을때만 박스 렌더함
                  <Menu role="listbox">
            {React.cloneElement(children, {
              onClose: () => {
                setOpen(false);
                if (onOpenChange) onOpenChange(false);
              },
            })}
          </Menu>
      )}
    </Wrap>
  );
}

/* styled-components */
const Wrap = styled.div`
  position: relative;
  display: inline-block;
  font-family: inherit;
`;

const Toggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center; /* 텍스트+아이콘 그룹 가운데 정렬 */
  gap: 4px;
  padding: 8px 12px;
  min-width: 100%;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  border: 1px solid ${props => (props.open ? '#000000' : '#818181')};
  color: ${props => (props.open ? '#000000' : '#818181')};
  transition: border-color 0.15s ease, color 0.15s ease, box-shadow 0.15s;
  &:hover {
    box-shadow: 0 4px 4px rgba(140,140,140,0.25);
  }
`;

const Label = styled.span`
  color: ${props => (props.open ? '#000000' : '#818181')};
`;

const ArrowWrapper = styled.span`
  img {
    width: 14px;
    height: 14px;
    display: block;
  }
`;

const Menu = styled.div`
  position: absolute;
  left: 0;
  top: calc(100% + 8px);
  background: #fff;
  border: 1px solid #cfcfcf;
  border-radius: 6px;
  box-shadow: 0 4px 4px rgba(140,140,140,0.25);
  padding: 8px 0;
  z-index: 10;
  min-width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;