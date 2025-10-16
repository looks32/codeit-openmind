import { useState } from 'react';
import styled from 'styled-components';
import person from '../assets/ico_person.png';

const CommonInput = styled.input`
  padding: 13px 16px 13px 40px;
  font-size: 16px;
  border: 1px solid #818181;
  border-radius: 8px;
  background: url(${person}) no-repeat left 16px center / 20px;
  outline: none;
  transition: 0.5s border;

  &:focus {
    border-color: #542f1a;
  }

  &::placeholder {
    color: #818181;
  }
`;
function Input({ value, placeholder, name }) {
  const [text, setText] = useState(value);

  const onChange = (e) => {
    setText(e.target.value);
  };
  return (
    <CommonInput
      value={text}
      placeholder={placeholder}
      name={name}
      onChange={onChange}
    />
  );
}

export default Input;
