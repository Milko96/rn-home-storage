import React, { memo } from 'react';
import { Text } from 'react-native';
import { shadow } from '../../global/styles/Shadow';
import StorageItemProps from '../../types/storage-item.type';
import { Card } from './ItemCard.styled';
import { useTheme } from 'styled-components/native';

const ItemCard: React.FC<{ item: StorageItemProps }> = ({ item }) => {
  const theme = useTheme();

  return (
    <Card
      style={{
        height: 50,
        ...shadow.shadowContainer,
        paddingHorizontal: 5
      }}>
      <Text style={{ fontWeight: '700', color: theme.text }}>{item.name}</Text>
      <Text style={{ marginLeft: 5, color: theme.text }}>{item.amounts[0]?.brand}</Text>
      <Text style={{ marginLeft: 5, color: theme.text }}>
        {item.amounts[0]?.amount} x {item.amounts[0]?.packaging.size}
        {item.amounts[0]?.packaging.measurementUnit}
      </Text>
    </Card>
  );
};

const areEqual = (prevState: { item: StorageItemProps }, nextState: { item: StorageItemProps }) => {
  return prevState.item.id === nextState.item.id;
};

export default memo(ItemCard, areEqual);
