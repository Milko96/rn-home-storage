import React, { memo } from 'react';
import { Text } from 'react-native';
import { shadow } from '../../global/styles/Shadow';
import ItemProps from '../../types/item.type';
import { Card } from './ItemCard.styled';

const ItemCard: React.FC<{ item: ItemProps }> = ({ item }) => {
  return (
    <Card
      style={{
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadow.shadowContainer
      }}>
      <Text style={{ fontWeight: '700' }}>{item.name}</Text>
    </Card>
  );
};

const areEqual = (prevState: { item: ItemProps }, nextState: { item: ItemProps }) => {
  return prevState.item.id === nextState.item.id;
};

export default memo(ItemCard, areEqual);
