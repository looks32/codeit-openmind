import React, { useState } from 'react';
import Qcard from '../components/Qcard';
import Dropdown from '../components/Dropdown/Dropdown';
import CustomMenu from '../components/Dropdown/Custommenu';

function List() {
  const [label, setLabel] = useState('이름순');

  return (
    <div>
      <Dropdown label={label}>
        {/* 부모는 onSelect로 label 상태를 갱신, Dropdwon이 주는 onClose()로 메뉴가 닫히게 됨. */}
        <CustomMenu onSelect={(v) => setLabel(v)} />
      </Dropdown>

      <Qcard />
    </div>
  );
}

export default List;
