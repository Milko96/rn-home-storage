import React, { useEffect, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import ItemCard from '../../../components/home/ItemCard';
import { TextInput } from '../../../components/styled-components/Input.styled';
import service from '../../../services/storage.service';
import { useTheme } from 'styled-components/native';
import StorageItemProps from '../../../types/storage-item.type';
import { useTranslation } from 'react-i18next';

const StorageScreen = () => {
  const itemRef = useRef<FlatList>(null);
  const { t } = useTranslation();

  const onRefresh = () => {
    setIsRefreshing(true);
    setItems([...service.list()]);
    setIsRefreshing(false);
  };

  const [items, setItems] = useState<StorageItemProps[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState(items.sort((x, y) => x.name.localeCompare(y.name)));
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    setFilteredList(
      searchText === ''
        ? items
        : items.filter(
            x =>
              x.name.toLowerCase().includes(searchText.toLowerCase()) ||
              x.amounts.some(y => y.brand?.toLowerCase().includes(searchText.toLowerCase())) ||
              x.amounts.some(y => y.amount?.toString().toLowerCase().includes(searchText.toLowerCase())) ||
              x.amounts.some(y => y?.measurementUnit?.toLowerCase().includes(searchText.toLowerCase()))
          )
    );
  }, [searchText, items]);

  const theme = useTheme();

  return (
    <>
      <TextInput
        placeholder={t('common:search')}
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
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
    </>
  );
};

export default StorageScreen;
