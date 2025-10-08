import React from 'react';
import Dropdown from '../components/Dropdown/Dropdown';
import Tooltip from '../components/Tooltip/Tooltip';
import MoreIcon from '../../assets/More.svg';

export default function ActionButton({
  type,
  onEdit,
  onDelete,
  iconSize = 20,
  style,
  className,
}) {
  // 현재는 'answer' 타입만 지원. 필요하면 다른 타입 추가 가능
  if (type !== 'answer') return null;

  return (
    <Dropdown
      label={<img src={MoreIcon} alt="더보기" style={{ width: iconSize, height: iconSize, cursor: 'pointer' }} />}
      // onOpenChange 등 필요하면 여기에 전달 가능
    >
      {/* Tooltip은 Dropdown이 주입하는 onClose를 받아 호출하면 자동으로 닫힘 */}
      <Tooltip onEdit={onEdit} onDelete={onDelete} />
    </Dropdown>
  );
}