import React from 'react';
import styled from 'styled-components';

/*
 props:
  - onSelect(value): 부모가 전달하는 선택 콜백 (필수는 아님)
  - onClose(): Dropdown이 주입해 주는 닫기 콜백 (있으면 호출)
  - selected (optional): 현재 선택된 값(있으면 aria-selected 표시에 사용)
*/
export default function CustomMenu({ onSelect, onClose, selected }) {
  function choose(value) {
    if (onSelect) onSelect(value);
    if (onClose) onClose();
  }

  function handleKey(e, value) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      choose(value);
    }
  }

  return (
    <>
      <MenuItem
        role="option"
        tabIndex={0}
        aria-selected={selected === '이름순'}
        onClick={() => choose('이름순')}
        onKeyDown={(e) => handleKey(e, '이름순')}
      >
        이름순
      </MenuItem>

      <MenuItem
        role="option"
        tabIndex={0}
        aria-selected={selected === '최신순'}
        onClick={() => choose('최신순')}
        onKeyDown={(e) => handleKey(e, '최신순')}
      >
        최신순
      </MenuItem>
    </>
  );
}

/* 스타일 (styled-components) */
const MenuItem = styled.div`
  width: 100%;
  padding: 8px 1px;
  text-align: center;
  color: #000000; /* 기본 검정 */
  cursor: pointer;
  transition: color 0.12s, background-color 0.12s;
  user-select: none;

  &:hover {
    color: #3692FF; /* 호버시 파란색 */
    background: transparent;
  }

  &:focus {
    outline: none;
    background: rgba(54,146,255,0.06);
  }
`;