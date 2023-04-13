import React from 'react';
import { Text } from 'react-native';
import { useTheme } from 'styled-components';

export const InputErrorMessage: React.FC<{
  errors: string | undefined;
  isSubmitting: boolean;
}> = ({ errors, isSubmitting }) => {
  const theme = useTheme();

  // TODO mentésenként 4x fut meg és az utolsónál mindig false, ezért nem jelenik meg a hiba
  console.log('isSubmitting', isSubmitting);
  return <>{errors && isSubmitting && <Text style={{ color: theme.text, paddingStart: 10 }}>{errors}</Text>}</>;
};
