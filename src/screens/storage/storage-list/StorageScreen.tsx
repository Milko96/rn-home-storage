import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import ItemCard from '../../../components/home/ItemCard';
import { TextInput } from '../../../global/styled-components/Input.styled';
import service from '../../../services/storage.service';
import { useTheme } from 'styled-components/native';

const StorageScreen = () => {
  const itemRef = useRef<FlatList>(null);

  const items = service.list();

  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState(items.sort((x, y) => x.name.localeCompare(y.name)));

  useEffect(() => {
    setFilteredList(
      searchText === ''
        ? items
        : items.filter(
            x =>
              x.name.toLowerCase().includes(searchText.toLowerCase()) ||
              x.amounts.some(y => y.brand?.toLowerCase().includes(searchText.toLowerCase())) ||
              x.amounts.some(y => y.amount?.toString().toLowerCase().includes(searchText.toLowerCase())) ||
              x.amounts.some(y => y.packaging?.measurementUnit.toLowerCase().includes(searchText.toLowerCase()))
          )
    );
  }, [searchText]);

  const theme = useTheme();

  return (
    <>
      <TextInput
        placeholder={'Type to search'}
        placeholderTextColor={theme.text}
        onChangeText={setSearchText}
        value={searchText}
        style={{
          position: 'absolute',
          zIndex: 1,
          width: '98%',
          marginTop: 5,
          marginHorizontal: 5
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
