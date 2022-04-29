import React from 'react';

import {
  ThemeProvider,
  createTheme,
} from '@nomada-sh/react-native-eyecandy-theme';

import { ThemeContext } from '../shared/hooks/useTheme';

import ThemedStatusBar from './ThemedStatusBar';

const DefaultTheme = createTheme({
  palette: {
    primary: {
      '500': '#00bcd4',
    },
    secondary: {
      '500': '#ff9800',
    },
  },
});

const DarkTheme = createTheme({
  palette: {
    primary: {
      '500': '#ff9800',
    },
    secondary: {
      '500': '#00bcd4',
    },
  },
  dark: true,
});

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
      <ThemeProvider theme={theme}>
        <ThemedStatusBar />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
