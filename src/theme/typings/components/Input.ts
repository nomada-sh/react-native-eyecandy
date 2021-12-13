export type InputColors = 'default';

export type ThemeInputColor = {
  background: string;
  foreground: string;
  placeholder: string;
  border: string;
  focused: {
    indicator: string;
    background: string;
  };
};

export type ThemeInput = {
  [key in InputColors]: ThemeInputColor;
};
