import React, { memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { shadow } from '../../utils/styles/Shadow';
import StorageItemProps from '../../types/storage-item.type';
import { Card } from './ItemCard.styled';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

const ItemCard: React.FC<{ item: StorageItemProps }> = ({ item }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
    // TODO-Miló típusosítani a navigation
      onPress={() => navigation.navigate('StorageItemEditScreen', { itemId: item.id })}
      activeOpacity={0.8}>
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
    </TouchableOpacity>
  );
};

export default ItemCard;
