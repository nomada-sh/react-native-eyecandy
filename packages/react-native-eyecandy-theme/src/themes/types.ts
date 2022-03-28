import { ThemeColors } from '../colors';
import { ThemePalette } from '../palette';
import { DeepPartial } from '../types';
import { ThemeTypography } from '../typography';

export type Theme = {
  dark: boolean;
  palette: ThemePalette;
  typography: ThemeTypography;
  colors: ThemeColors;
};

export type CustomTheme = DeepPartial<Theme>;

export type CreateThemeOptions = DeepPartial<Theme>;

export type CreateTheme = (options?: CreateThemeOptions) => Theme;
