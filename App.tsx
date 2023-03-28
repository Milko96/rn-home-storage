import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components';

import BottomTabNavigator from './src/navigation/BottomTab.navigator';
import { fontFamily, lightTheme } from './src/global/styles/Theme';

const App = () => {
  return (
    <ThemeProvider theme={{...lightTheme, ...fontFamily}}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
