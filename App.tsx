import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components';

import NativeStackNavigator from './src/navigation/NativeStack.navigator';
import { fontFamily, darkTheme } from './src/global/styles/Theme';

const App = () => {
  return (
    <ThemeProvider theme={{...darkTheme, ...fontFamily}}>
      <NavigationContainer>
        <NativeStackNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
