import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import BuyListScreen from '../screens/buy-list/BuyListScreen';
import StorageScreen from '../screens/storage/StorageScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <BottomTab.Navigator
            backBehavior='history'>
            <BottomTab.Screen name='Home' component={HomeScreen}/>
            <BottomTab.Screen name='On Storage' component={StorageScreen}/>
            <BottomTab.Screen name='Buy list' component={BuyListScreen}/>
        </BottomTab.Navigator>
    );
}

export default BottomTabNavigator;