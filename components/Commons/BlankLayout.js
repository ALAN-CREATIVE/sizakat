import styled from "styled-components";

const ChildrenContainer = styled.main`
  margin-top: 3%
`

const BlankLayout = ({ children }) => {
  return (
    <>
      <ChildrenContainer>{children}</ChildrenContainer>
    </>
  );
};

export const siteTitle = 'Sizakat';

export default BlankLayout;
