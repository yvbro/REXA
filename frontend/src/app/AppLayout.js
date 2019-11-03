import React from 'react';

import styled from 'styled-components';

const Wrapper = styled.div`
  padding-left: 80px;
`;

export default function AppLayout({ children }) {
    return <Wrapper>{children}</Wrapper>;
}
