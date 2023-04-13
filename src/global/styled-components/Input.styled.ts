import styled from 'styled-components/native';

export const TextInput = styled.TextInput`
  color: ${props => props.theme.text};
  padding-start: 10px;
  font-weight: 500;
  font-family: ${props => props.theme.fontFamily};
  font-size: 14px;
  padding-vertical: 5px;
  flex-grow: 1;
  color: ${props => props.theme.text};
  border-width: 1px;
  border-radius: 10px;
`;
