import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTab.navigator';
import StorageItemEditScreen from '../screens/storage/storage-item-edit/StorageItemEditScreen';
import { useTheme } from 'styled-components';

const NativeStack = createNativeStackNavigator();

const NativeStackNavigator = () => {
  const theme = useTheme();

  return (
    <NativeStack.Navigator
      initialRouteName='Base'
      screenOptions={{
        statusBarColor: theme.background,
        headerStyle: { backgroundColor: theme.background },
        headerTintColor: theme.primary,
        animation: 'fade_from_bottom'
      }}>
      <NativeStack.Screen name='Base' component={BottomTabNavigator} options={{ headerShown: false }} />
      <NativeStack.Screen
        name='StorageItemEditScreen'
        component={StorageItemEditScreen}
        options={{ presentation: 'modal', contentStyle: { backgroundColor: theme.secondary } }}
      />
    </NativeStack.Navigator>
  );
};
0;
export default NativeStackNavigator;
