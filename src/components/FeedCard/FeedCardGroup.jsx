import styled from "styled-components";

const GroupWrap = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 16px;
border: 1px solid var(--Brown-30, #C7BBB5);
background: var(--Brown-10, #F5F1EE);
display: flex;
padding: 16px;
flex-direction: column;
align-items: center;
gap: 16px;
`;

const Banner = styled.div`
  display: flex;
justify-content: center;
align-items: center;
gap: 8px;
color: var(--Brown-40, #542F1A);
font-feature-settings: 'liga' off, 'clig' off;
font-family: Actor;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: 125%;
`;

export default function FeedCardGroup({ children, total }) {
  const count = total ?? (Array.isArray(children) ? children.length : (children ? 1 : 0));
  return (
    <GroupWrap>
      <Banner>
        <img src="Messages.svg" alt="Messages" />
        {count}개의 질문이 있습니다
      </Banner>
      {children}
    </GroupWrap>
  );
}
