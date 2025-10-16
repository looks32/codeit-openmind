import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  padding: 14px 0;
  border: none;
  border-radius: 8px;
  border: 2px solid transparent;
  background: ${({ disabled }) => (disabled ? "var(--Brown30)" : "var(--Brown40)")};
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s;

  &:hover {
    border: 2px solid var(--Brown-50, #341909);
    background: ${({ disabled }) => (disabled ? "var(--Brown30)" : "var(--Brown40)")};
  }
  &:active {
    border: 2px solid var(--Brown-50, #341909);
    background: ${({ disabled }) => (disabled ? "var(--Brown30)" : "var(--Brown50)")};
  }
`;

export default function ButtonBox({ children, disabled = false, ...props }) {
  return (
    <StyledButton disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
}