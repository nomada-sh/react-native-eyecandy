import { ThemeColors, CustomThemeColors } from '../colors';
import { ThemePalette, CustomThemePalette } from '../palette';
import { DeepPartial } from '../types';
import { ThemeTypography, CustomThemeTypography } from '../typography';

export type Theme = {
  dark: boolean;
  palette: ThemePalette;
  typography: ThemeTypography;
  colors: ThemeColors;
};

export type CustomTheme = DeepPartial<Theme>;

export type CreateThemeOptions = {
  dark?: boolean;
  palette?: CustomThemePalette;
  typography?: CustomThemeTypography;
  colors?: CustomThemeColors;
};

// export type CreateThemeOptions = DeepPartial<Theme>;

export type CreateTheme = (options?: CreateThemeOptions) => Theme;
