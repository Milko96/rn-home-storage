import React, { useEffect, useRef, useState } from 'react';
import { FlatList, TextInput } from 'react-native';
import ItemCard from '../../components/home/ItemCard';
import { Input } from '../../global/styled-components/Input.styled';
import items from '../../services/storage.service';
import { Header } from 'react-native/Libraries/NewAppScreen';

const StorageScreen = () => {
  const itemRef = useRef<FlatList>(null);

  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState(items);

  useEffect(() => {
    setFilteredList(items.filter(x => x.name.toLowerCase().includes(searchText.toLowerCase())));
  }, [searchText]);

  return (
    <>
      <Input
        placeholder={'Type to search'}
        onChangeText={setSearchText}
        value={searchText}
        style={{
          position: 'absolute',
          zIndex: 1
        }}
      />
      <FlatList
        style={{
          paddingHorizontal: 20,
          paddingVertical: 5,
          marginTop: 35
        }}
        ref={itemRef}
        data={filteredList}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ItemCard item={item}></ItemCard>}
      />
    </>
  );
};

export default StorageScreen;
