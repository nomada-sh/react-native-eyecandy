export type Color = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

type FiveColor = Partial<Color> & Pick<Color, 100 | 200 | 300 | 400 | 500>;
type ThreeColor = Partial<Color> & Pick<Color, 50 | 100 | 200>;

export type ThemePalette = {
  background: {
    container: string;
    content: string;
  };
  foreground: {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
  };
  divider: string;
  primary: FiveColor;
  secondary: FiveColor;
  success: ThreeColor;
  warning: ThreeColor;
  error: ThreeColor;
  grey: Color;
  white: string;
  orange: string;
  purple: string;
  pink: string;
  teal: string;
};
