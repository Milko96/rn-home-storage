import React, { memo } from 'react';
import {Text, View} from 'react-native';
import ItemProps from '../../types/item.type';

const ItemCard: React.FC<{item: ItemProps}> = ({item}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text>{item.name}</Text>
    </View>
  );
};

const areEqual = (prevState: {item: ItemProps}, nextState: {item: ItemProps}) => {
    return (
      prevState.item.id === nextState.item.id
    );
  };

export default memo(ItemCard, areEqual);