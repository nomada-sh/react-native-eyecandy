import React from 'react';
import { StatusBar } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';

export default function ThemedStatusBar() {
  const theme = useTheme();

  return (
    <StatusBar
      backgroundColor={theme.colors.background.default.container}
      barStyle={theme.dark ? 'light-content' : 'dark-content'}
    />
  );
}
