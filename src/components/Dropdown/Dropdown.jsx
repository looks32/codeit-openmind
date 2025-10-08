import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ArrowDown from '../../assets/Arrow-down.svg';
import ArrowUp from '../../assets/Arrow-up.svg';

export default function Dropdown({
  label = '이름순', // 기본 버튼에 표시할 텍스트 값 또는 JSX
  onOpenChange, // 열리거나 닫힐 때 부모에게 알려주기 위한 옵션(선택)
  children, // 펼쳤을 때 보여줄 내용 (부모가 전달)
}) {
  const [open, setOpen] = useState(false); // 드롭다운 열림 상태
  const ref = useRef(null); // 외부 클릭 감지용 루트 DOM
  const toggleRef = useRef(null); // 토글 버튼 포커스 복귀용

  useEffect(() => {
    function handleOutside(e) {
      // 클릭 대상이 드롭다운 내부가 아니면 외부 클릭으로 간주
      if (ref.current && !ref.current.contains(e.target)) {
        if (open) {
          setOpen(false);
          if (onOpenChange) onOpenChange(false);
        }
      }
    }

    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open, onOpenChange]);
  // open 또는 onOpenChange가 바뀔 때 이 이펙트를 다시 실행하여 최신 콜백을 사용하게 함

  function toggle() {
    setOpen(p => {
      const next = !p;
      console.log('Dropdown.toggle -> next:', next);
      if (onOpenChange) onOpenChange(next);
      return next;
    });
  }

  function handleToggleKey(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  }

  // children에 onClose 주입: child에서 onClose() 호출하면 이 Dropdown만 닫힘
  const injectedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onClose: () => {
          setOpen(false);
          if (onOpenChange) onOpenChange(false);
          if (toggleRef.current) toggleRef.current.focus(); // 포커스 복귀(옵션)
        },
      });
    }
    return child;
  });

  return (
    <Wrap ref={ref}>
      <Toggle
        ref={toggleRef}
        type="button"
        onClick={toggle}
        onKeyDown={handleToggleKey}
        open={open}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Label open={open}>{label}</Label>
        <ArrowWrapper aria-hidden="true">
          <img src={open ? ArrowUp : ArrowDown} alt="" />
        </ArrowWrapper>
      </Toggle>

      {open && injectedChildren && (
        <Menu role="listbox">
          {injectedChildren}
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