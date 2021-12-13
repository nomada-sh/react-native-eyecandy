import React, { createContext, ReactNode } from 'react';

import { DefaultTheme } from '../theme';

export const EyeCandyContext = createContext(DefaultTheme);

export interface EyeCandyProps {
  theme?: typeof DefaultTheme;
  children?: ReactNode;
}

export default function EyeCandy({
  theme = DefaultTheme,
  ...props
}: EyeCandyProps) {
  return <EyeCandyContext.Provider value={theme} {...props} />;
}
