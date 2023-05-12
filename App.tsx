import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import i18n from './src/utils/translations/i18n';
import { I18nextProvider } from 'react-i18next';

import NativeStackNavigator from './src/navigation/NativeStack.navigator';
import { fontFamily, darkTheme } from './src/utils/styles/Theme';

const App = () => {
  return (
    <ThemeProvider theme={{ ...darkTheme, ...fontFamily }}>
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <NativeStackNavigator />
        </NavigationContainer>
      </I18nextProvider>
    </ThemeProvider>
  );
};

export default App;
