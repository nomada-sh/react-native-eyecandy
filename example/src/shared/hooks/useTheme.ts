import React from 'react';

export const ThemeContext = React.createContext<{
  dark: boolean;
  setDark: (dark: boolean) => void;
}>({
  dark: false,
  setDark: () => {},
});

export default function useTheme() {
  return React.useContext(ThemeContext);
}
