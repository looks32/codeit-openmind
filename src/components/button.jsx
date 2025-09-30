import styled, { css } from "styled-components";
import Color from "./ColorStyle";

const Sizes ={
    small:10,
    default:24,
}


const iconTypes = ["answer", "question"];


const ArrowIcon = styled.span`
    width: 18px;
    height: 18px;   
    svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
    position:absolute;
    top:50%;
    transform: translateY(-50%);
    right: ${({ size }) => Sizes[size] ?? Sizes['default']}px;
`;


const types = {
    // 답변
    answer: css`
        width: ${({ width }) => (width ? `${width}px` : "192px")};
        background-color: ${Color.Brown10};
        border: 1px solid ${Color.Brown40};
        color: ${Color.Brown40};

        &:hover {
          border: 2px solid ${Color.Brown40};
        }
        &:active {
          background-color: ${Color.Brown20};
        }
    `,
    // 질문 
    question: css`
        width: ${({ width }) => (width ? `${width}px` : "160px")};
        background-color: ${Color.Brown40};
        color: ${Color.white};
        border: none;

        &:hover {
          border: 2px solid ${Color.Brown50};
        }
        &:active {
          background-color: ${Color.Brown50};
        }
    `,
    // 작성
    insert : css`
        width:208px;
        height:54px;
        background-color: ${Color.Brown40};
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        color: ${Color.white};
        border-radius: 9999px;
        line-height: 25px;
        border:none;
    `
  
};
// 공통
const BaseButton = styled.button`
    position:relative;
    height: ${({ height }) => (height ? `${height}px` : "46px")};
    padding: 0;
    border-radius: 8px;
    line-height: 22px;
    font-size: 16px;
    cursor: pointer;


    ${({ type }) => types[type] || types.answer}

    // inactivate

    &:disabled {
        cursor: not-allowed;
        ${({ type }) =>
          type === "answer"
            ? `
              background-color: ${Color.Brown10};
              border: 1px solid ${Color.Brown30};
              color: ${Color.Brown30};
            `
            :type === "question"
            ? `
              background-color: ${Color.Brown30};
              border: none;
            `
            :""
        };
    }
`;

function Button({ width, height, type = "", children, size="" }) {
    const defaultText = 
    type === "answer" ? "답변하러 가기" : type === "question" ? "질문 받기" : "";

  return (
    <BaseButton width={width} height={height} type={type} size={size} disabled={false}>
        {children || defaultText}

        {iconTypes.includes(type) && (
            <ArrowIcon size={size}>
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
  );
}

export default Button;
