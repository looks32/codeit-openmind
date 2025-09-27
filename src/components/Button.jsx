import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  padding: 14px 0;
  border: none;
  border-radius: 8px;
  background: ${({ disabled }) => (disabled ? "#e5ded9" : "#bdb0a7")};
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#e5ded9" : "#a89a8b")};
  }
  &:active {
    background: ${({ disabled }) => (disabled ? "#e5ded9" : "#8d7e6e")};
  }
`;

export default function Button({ children, disabled = false, ...props }) {
  return (
    <StyledButton disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
}