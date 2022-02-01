import { DeepPartial } from '../types';
import { ThemePalette } from '../palette';
import { ThemeTypography } from '../typography';
import { ThemeColors } from '../colors';

export type Theme = {
  dark: boolean;
  palette: ThemePalette;
  typography: ThemeTypography;
  colors: ThemeColors;
};

export type CustomTheme = DeepPartial<Theme>;

export type CreateThemeOptions = DeepPartial<Theme>;

export type CreateTheme = (options?: CreateThemeOptions) => Theme;
