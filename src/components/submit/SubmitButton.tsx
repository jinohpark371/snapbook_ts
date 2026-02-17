import styled from 'styled-components';
import { BaseButton } from '../common/Button';
import theme from '../../styles/theme';

export const SubmitButton = styled(BaseButton)`
  width: ${({ $width }) => $width || '305px'};
  height: ${({ $height }) => $height || '55px'};
  min-height: ${({ $height }) => $height || '55px'};
  font-size: ${({ $fontSize }) => $fontSize || '18px'};

  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
`;
