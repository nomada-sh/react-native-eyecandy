export type ButtonColors = 'default' | 'primary';

export type ThemeButtonColor = {
  background: string;
  foreground: string;
};

export type ThemeButton = {
  [key in ButtonColors]: ThemeButtonColor;
};
