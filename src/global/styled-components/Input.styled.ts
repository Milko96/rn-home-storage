import styled from 'styled-components/native';

export const TextInput = styled.TextInput`
  color: ${props => props.theme.primary};
  padding-left: 20px;
  font-weight: 500;
  font-family: ${props => props.theme.fontFamily};
  font-size: 14px;
  height: 40px;
  flex-grow: 1;
`;
