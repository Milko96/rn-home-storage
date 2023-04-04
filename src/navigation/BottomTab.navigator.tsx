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
    <BottomTab.Navigator
      backBehavior='history'
      sceneContainerStyle={{ backgroundColor: theme.secondary }}
      screenOptions={() => ({
        headerTintColor: theme.primary,
        headerStyle: {
          backgroundColor: theme.background
        },
        tabBarStyle: {
          backgroundColor: theme.background
        },
        tabBarShowLabel: false
      })}>
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: route => <Icon name='home' size={30} color={route.focused ? theme.primary : theme.secondary} />
        }}
      />
      <BottomTab.Screen
        name='On Storage'
        component={StorageScreen}
        options={({ navigation }) => ({
          title: 'On Storage',
          tabBarIcon: route => <Icon name='bars' size={30} color={route.focused ? theme.primary : theme.secondary} />,
          headerRight: () => (
            <Icon
              name='plus'
              size={30}
              color={theme.primary}
              style={{ marginEnd: 5 }}
              onPress={() => navigation.navigate('StorageEditScreen')}
            />
          )
        })}
      />
      <BottomTab.Screen
        name='Buy list'
        component={BuyListScreen}
        options={{
          title: 'Buy list',
          tabBarIcon: route => (
            <Icon name='shoppingcart' size={30} color={route.focused ? theme.primary : theme.secondary} />
          )
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
