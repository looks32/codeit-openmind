import styled, { css } from "styled-components";

const Button = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #d9d9d9;

  ${({ active, color }) =>
    active &&
    css`
      color: ${color};
    `}
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
  filter: invert(53%) sepia(6%) saturate(9%) hue-rotate(346deg) brightness(95%) contrast(86%); // 기본 회색

  ${({ active, color }) =>
    active &&
    css`
      filter: ${color === "#1877F2"
        ? "invert(34%) sepia(95%) saturate(2918%) hue-rotate(204deg) brightness(97%) contrast(101%)"
        : "invert(0%) sepia(93%) saturate(7500%) hue-rotate(292deg) brightness(105%) contrast(112%)"};
    `}
`;

export default function ReactionButton({ icon, label, active, color, onClick }) {
  return (
    <Button active={active} color={color} onClick={onClick}>
      <Icon src={icon} alt={label} active={active} color={color} />
      {label}
    </Button>
  );
}