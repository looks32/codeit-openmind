import React, { useState } from 'react';
import styled from 'styled-components';
import EditIcon from '../../assets/Edit.svg';
import CloseIcon from '../../assets/Close.svg';

// onEdit() = 편집 콜백 (부모에서 처리)
// onDelete() = 삭제 콜백 (부모에서 처리)
// onClose() = Dropdown이 주입해주는 닫기 콜백 

export default function Tooltip({ onEdit, onDelete, onClose }) {
  const [selected, setSelected] = useState(null);

  function choose(action) {
    setSelected(action);

    if (action === 'edit') {
      if (onEdit) onEdit();
    } else if (action === 'delete') {
      if (onDelete) onDelete();
    }

    if (onClose) {
      setTimeout(() => {
        onClose();
      }, 120); 
    }
  }

  function handleKey(e, action) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      choose(action);
    }
  }

  return (
    <>
      <MenuItem
        role="option"
        tabIndex={0}
        onClick={() => choose('edit')}
        data-selected={selected === 'edit'}
      >
        <IconWrap data-selected={selected === 'edit'}>
          <EditIcon />
        </IconWrap>
        <TextWrap data-selected={seleted === 'edit'}>수정하기</TextWrap>
      </MenuItem>

      <MenuItem
        role="option"
        tabIndex={0}
        onClick={() => choose('delete')}
        onKeyDown={(e) => handleKey(e, 'delete')}
        data-selected={selected === 'delete'}
        >
          <IconWrap data-selected={seleted === 'delete'}>
            <CloseIcon />
          </IconWrap>
          <TextWrap data-selected={selected === 'delete'}>삭제하기</TextWrap>
        </MenuItem>
    </>
  );
}

// 스타일
const MenuItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;

  background: transparent;
  color: #515151;

  &:hover {
    background: #f9f9f9;
    color: #000000;

    svg { fill: currentColor; }
  }

  &:focus {
    outline: none;
    background: #f9f9f9;
  }

  &[data-selected='true'] {
    color: #1877f2;
    svg { fill: currentColor; }
  }
`;

// 아이콘 래퍼 
const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 14px;
    display: block;
    fill: currentColor;
    // svg 내부의 path 등이 fill="currentColor"여야 color로 바뀜.
  }
`;

// 텍스트 래퍼
const TextWrap = styled.span`
  font-size: 14px;
  line-height: 18px;
  color: inherit;
`;