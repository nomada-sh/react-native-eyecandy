export type TextColors = 'default' | 'primary' | 'error' | 'grey';

export type ThemeTextColor = {
  normal: string;
  contrast: string;
};

export type ThemeText = {
  [key in TextColors]: ThemeTextColor;
};
