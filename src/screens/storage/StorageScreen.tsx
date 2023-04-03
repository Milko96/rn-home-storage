import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import ItemCard from '../../components/home/ItemCard';
import { Input } from '../../global/styled-components/Input.styled';
import items from '../../services/storage.service';
import { useTheme } from 'styled-components/native';

const StorageScreen = () => {
  const itemRef = useRef<FlatList>(null);

  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState(items.sort((x,y)=>x.name.localeCompare(y.name)));

  useEffect(() => {
    setFilteredList(items.filter(x => x.name.toLowerCase().includes(searchText.toLowerCase())));
  }, [searchText]);

  const theme = useTheme();

  return (
    <>
      <Input
        placeholder={'Type to search'}
        placeholderTextColor={theme.text}
        onChangeText={setSearchText}
        value={searchText}
        style={{
          position: 'absolute',
          zIndex: 1,
          borderStyle: 'solid',
          borderWidth: 2,
          borderRadius: 10,
          borderColor: theme.background,
          width: '100%',
          marginTop: 5
        }}
      />
      <FlatList
        style={{
          paddingHorizontal: 20,
          paddingVertical: 5,
          marginTop: 40
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
