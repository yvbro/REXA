import React from "react";

import styled from "styled-components";

const Wrapper = styled.div`
  padding-left: 80px;
  height: 100vh;
`;

// eslint-disable-next-line react/prop-types
export default function AppLayout({ children }) {
  return <Wrapper>{children}</Wrapper>
}
