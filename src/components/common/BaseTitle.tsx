import styled from 'styled-components';

interface BaseTitleProps {
  $fontSize?: string;
}

export const BaseTitle = styled.h1<BaseTitleProps>`
  font-size: ${({ $fontSize }) => $fontSize || '30px'};
  font-weight: 600;
`;
