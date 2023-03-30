import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import BuyListScreen from '../screens/buy-list/BuyListScreen';
import StorageScreen from '../screens/storage/StorageScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import { ThemeContext } from 'styled-components/native';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const theme = useContext(ThemeContext);

  return (
    <BottomTab.Navigator backBehavior='history'>
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarShowLabel: false,
          tabBarIcon: () => <Icon name='home' size={30} />
        }}
      />
      <BottomTab.Screen
        name='On Storage'
        component={StorageScreen}
        options={{
          title: 'On Storage',
          tabBarShowLabel: false,
          tabBarIcon: () => <Icon name='bars' size={30} />
        }}
      />
      <BottomTab.Screen
        name='Buy list'
        component={BuyListScreen}
        options={{
          title: 'Buy list',
          tabBarShowLabel: false,
          tabBarIcon: () => <Icon name='shoppingcart' size={30} />
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
