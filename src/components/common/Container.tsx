import styled from 'styled-components';

interface ContainerProps {
  $start?: boolean;
  $bg?: string;
  $padding?: string;
}

const Container = styled.div.attrs({
  className: 'flex flex-col items-center min-h-screen w-full',
})<ContainerProps>`
  justify-content: ${({ $start }) => ($start ? 'flex-start' : 'center')};
  background: ${({ $bg }) => $bg || '#fff'};
  padding: ${({ $padding }) => $padding || '0'};
`;

export default Container;
