import styled, { css } from 'styled-components';
const Sizes = {
  smallHeight: 34,
  answerSmall: 149,
  questionSmall: 120,
};

const iconTypes = ['answer', 'question'];

const ArrowIcon = styled.span`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

const types = {
  answer: css`
    width: ${({ width }) => Sizes[width] ?? '192'}px;
    background-color: var(--Brown10);
    border: 1px solid var(--Brown40);
    color: var(--Brown40);
    gap: ${({ width }) => (width ? '4px' : '8px')};

    &:hover {
      border: 2px solid var(--Brown40);
    }
    &:active {
      background-color: var(--Brown20);
    }
  `,
  // 질문
  question: css`
    width: ${({ width }) => Sizes[width] ?? '160'}px;
    background-color: var(--Brown40);
    color: var(--Gray10);
    border: 2px solid transparent;
    gap: ${({ width }) => (width ? '4px' : '10px')};

    &:hover {
      border: 2px solid var(--Brown50);
    }
    &:active {
      background-color: var(--Brown50);
    }
  `,
};

const BaseButton = styled.button`
  height: ${({ height }) => Sizes[height] ?? '46'}px;
  padding: 0;
  padding-left: ${({ width }) => (width ? '12px' : '24px')};
  border-radius: 8px;
  line-height: 22px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border 0.2s;

  ${({ type }) => types[type] || types.answer}

  // inactivate
    &:disabled {
    cursor: not-allowed;
    ${({ type }) =>
      type === 'answer'
        ? `
              background-color: var(--Brown10);
              border: 1px solid var(--Brown30);
              color: var(--Brown30);
            `
        : type === 'question'
          ? `
              background-color: var(--Brown30);
              border: none;
            `
          : ''};
  }
`;
// insert
const InsertButton = styled.button`
  width: ${({ width }) =>
    typeof width === 'number' ? `${width}px` : width || '208px'};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height || '54px'};
  padding: 0;
  background-color: var(--Brown40);
  color: var(--Gray10);
  border-radius: 9999px;
  line-height: 25px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

function Button({
  width = '',
  height = '',
  type = '',
  children,
  disabled,
  onClick,
}) {
  const defaultText =
    type === 'answer'
      ? '답변하러 가기'
      : type === 'question'
        ? '질문 받기'
        : type === 'insert'
          ? '질문 작성하기'
          : '';

  return (
    <div>
      {type === 'insert' ? (
        <InsertButton
          width={width}
          height={height}
          disabled={disabled}
          onClick={onClick}
        >
          {children || defaultText}
        </InsertButton>
      ) : (
        <BaseButton
          width={width}
          height={height}
          type={type}
          disabled={disabled}
        >
          {children || defaultText}

          {iconTypes.includes(type) && (
            <ArrowIcon>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.25 12C4.25 11.5858 4.58579 11.25 5 11.25H19C19.4142 11.25 19.75 11.5858 19.75 12C19.75 12.4142 19.4142 12.75 19 12.75H5C4.58579 12.75 4.25 12.4142 4.25 12Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.4697 4.46967C11.7626 4.17678 12.2374 4.17678 12.5303 4.46967L19.5303 11.4697C19.8232 11.7626 19.8232 12.2374 19.5303 12.5303L12.5303 19.5303C12.2374 19.8232 11.7626 19.8232 11.4697 19.5303C11.1768 19.2374 11.1768 18.7626 11.4697 18.4697L17.9393 12L11.4697 5.53033C11.1768 5.23744 11.1768 4.76256 11.4697 4.46967Z"
                  fill="currentColor"
                />
              </svg>
            </ArrowIcon>
          )}
        </BaseButton>
      )}
    </div>
  );
}

export default Button;
