import React, {useRef} from 'react';
import items from '../../services/home.service';
import ItemCard from '../../components/home/ItemCard';
import { FlatList, ScrollView, useColorScheme } from 'react-native';

const HomeScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const itemRef = useRef<FlatList>(null);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic">
      <FlatList
        ref={itemRef}
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({item})=><ItemCard item={item}></ItemCard>}
      />
    </ScrollView>
  );
};

export default HomeScreen;
