import React, { useMemo } from 'react';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import deepmerge from 'deepmerge';

import Drawer from '../Drawer';

export default function Navigation() {
  const { dark, palette, colors } = useTheme();

  const theme = useMemo(() => {
    return deepmerge(dark ? DarkTheme : DefaultTheme, {
      colors: {
        primary: palette.primary[500],
        background: colors.background.default.container,
        card: colors.background.default.content,
        text: colors.text.default.normal,
        border: colors.divider.default,
      },
    }) as typeof DefaultTheme;
  }, [
    dark,
    palette.primary,
    colors.background.default.container,
    colors.background.default.content,
    colors.text.default.normal,
    colors.divider.default,
  ]);

  return (
    <NavigationContainer theme={theme}>
      <Drawer />
    </NavigationContainer>
  );
}
