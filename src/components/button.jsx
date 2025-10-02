import styled, { css, ThemeProvider } from "styled-components";

const Sizes ={
    smallHeight:34,
    answerSmall:149,
    questionSmall:120,
}
const theme = {
  colors :{
    Brown10:"#F5F1EE",
    Brown20:"#E4D5C9",
    Brown30:"#C7BBB5",
    Brown40:"#542F1A",
    Brown50:"#341909",
    white:"#fff",
  }
}

const iconTypes = ["answer", "question"];


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
    // 답변
    answer: css`
        width: ${({ width }) => Sizes[width] ?? "192"}px;
        background-color: ${({theme}) => theme.colors.Brown10};
        border: 1px solid ${({theme}) => theme.colors.Brown40};
        color: ${({theme}) => theme.colors.Brown40};
        gap:${({ width }) => (width ? "4px" : "8px")};

        &:hover {
          border: 2px solid ${({theme}) => theme.colors.Brown40};
        }
        &:active {
          background-color: ${({theme}) => theme.colors.Brown20};
        }
    `,
    // 질문 
    question: css`
        width: ${({ width }) => Sizes[width] ?? "160"}px;
        background-color: ${({theme}) => theme.colors.Brown40};
        color: ${({theme}) => theme.colors.white};
        border: none;
        gap:${({ width }) => (width ? "4px" : "10px")};

        &:hover {
          border: 2px solid ${({theme}) => theme.colors.Brown50};
        }
        &:active {
          background-color: ${({theme}) => theme.colors.Brown50};
        }
    `,
  
};
// 공통
const BaseButton = styled.button`
    height: ${({ height }) => Sizes[height] ?? "46"}px;
    padding: 0;
    padding-left: ${({ width }) => (width ? "12px" : "24px")};
    border-radius: 8px;
    line-height: 22px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;


    ${({ type }) => types[type] || types.answer}

    // inactivate

    &:disabled {
        cursor: not-allowed;
        ${({ type, theme }) =>
          type === "answer"
            ? `
              background-color: ${theme.colors.Brown10};
              border: 1px solid ${theme.colors.Brown30};
              color: ${theme.colors.Brown30};
            `
            :type === "question"
            ? `
              background-color: ${theme.colors.Brown30};
              border: none;
            `
            :""
        };
    }
`;
const InsertButton = styled.button`
  width: 208px;
  height: 54px;
  padding:0;
  background-color: ${({ theme }) => theme.colors.Brown40};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 9999px;
  line-height: 25px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`

function Button({ width="", height="", type = "", children}) {
    const defaultText = 
    type === "answer" ? "답변하러 가기" : type === "question" ? "질문 받기" : type === "insert" ? "질문 작성하기" : "";

  return (
    <ThemeProvider theme={theme}>
     {type === "insert" ? (
        <InsertButton>
          {children || defaultText}
        </InsertButton>
      ) : (
        <BaseButton width={width} height={height} type={type} disabled={false}>
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
    </ThemeProvider>
  );
}

export default Button;
