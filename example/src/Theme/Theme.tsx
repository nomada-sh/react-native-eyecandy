import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from '@nomada-sh/react-native-eyecandy-theme';

import { ThemeContext } from '../shared/hooks/useTheme';

export default function Theme({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = React.useState(false);

  const theme = dark ? DarkTheme : DefaultTheme;

  return (
    <ThemeContext.Provider
      value={{
        dark,
        setDark,
      }}
    >
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}
