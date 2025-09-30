import styled from "styled-components";

const CircleImage  = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: ${(image) => image.sizes || "104px"};
  height: ${(image) => image.sizes || "104px"};
`;
export default CircleImage;
