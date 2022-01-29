import React, {createContext, ReactNode} from 'react';

import {DefaultTheme} from '../themes';

export const ThemeContext = createContext(DefaultTheme);

export interface EyeCandyProps {
  theme?: typeof DefaultTheme;
  children?: ReactNode;
}

export default function ThemeProvider({
  theme = DefaultTheme,
  ...props
}: EyeCandyProps) {
  return <ThemeContext.Provider value={theme} {...props} />;
}
