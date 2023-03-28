import React, {useRef} from 'react';
import {FlatList} from 'react-native';
import ItemCard from '../../components/home/ItemCard';
import items from '../../services/storage.service';

const StorageScreen = () => {
  const itemRef = useRef<FlatList>(null);
  return (
    <FlatList
        style={{
            paddingHorizontal: 20,
            paddingVertical: 5
        }}
      ref={itemRef}
      data={items}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <ItemCard item={item}></ItemCard>}
    />
  );
};

export default StorageScreen;
