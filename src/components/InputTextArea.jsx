import styled from "styled-components";

const StyledTextArea = styled.textarea`
  width: 100%;
  max-width: 480px;
  min-width: 200px;
  height: 140px;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: #fafafa;
  font-size: 16px;
  color: #222;
  resize: none;
  outline: none;
  box-sizing: border-box;
  transition: border 0.2s, background 0.2s;

  &::placeholder {
    color: #bdbdbd;
    font-size: 16px;
  }

  &:focus {
    border: 2px solid #bdb0a7;
  }
`;

export default function InputTextArea({ value, onChange, placeholder }) {
  return <StyledTextArea value={value} onChange={onChange} placeholder={placeholder} />;
}