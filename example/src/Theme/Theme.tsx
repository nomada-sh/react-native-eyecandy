import React, { useMemo } from 'react';

import {
  ThemeProvider,
  createTheme,
} from '@nomada-sh/react-native-eyecandy-theme';

import { ThemeContext } from '../shared/hooks/useTheme';

import ThemedStatusBar from './ThemedStatusBar';

export default function Theme({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = React.useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        dark,
        palette: ({ dark }) => ({
          primary: {
            '500': dark ? '#ff9800' : '#00bcd4',
          },
          secondary: {
            '500': dark ? '#00bcd4' : '#ff9800',
          },
        }),
      }),
    [dark],
  );

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
