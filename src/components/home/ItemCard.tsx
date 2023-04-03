import React, { memo } from 'react';
import { Text } from 'react-native';
import { shadow } from '../../global/styles/Shadow';
import ItemProps from '../../types/item.type';
import { Card } from './ItemCard.styled';
import { useTheme } from 'styled-components/native';

const ItemCard: React.FC<{ item: ItemProps }> = ({ item }) => {
  const theme = useTheme();

  return (
    <Card
      style={{
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadow.shadowContainer
      }}>
      <Text style={{ fontWeight: '700', color: theme.text }}>{item.name}</Text>
    </Card>
  );
};

const areEqual = (prevState: { item: ItemProps }, nextState: { item: ItemProps }) => {
  return prevState.item.id === nextState.item.id;
};

export default memo(ItemCard, areEqual);
