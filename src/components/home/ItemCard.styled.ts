import styled from 'styled-components/native';

export const Card = styled.View`
  border-radius: 15px;
  margin: 5px 0;
  background-color: ${props => props.theme.secondary};
  opacity: 0.8;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
