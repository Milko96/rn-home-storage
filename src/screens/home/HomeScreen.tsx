import React from 'react';
import { ScrollView, Text } from 'react-native';
import { useTheme } from 'styled-components/native';

const HomeScreen = () => {
  const theme = useTheme();
  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic'>
      <Text>home oldal</Text>
    </ScrollView>
  );
};

export default HomeScreen;
