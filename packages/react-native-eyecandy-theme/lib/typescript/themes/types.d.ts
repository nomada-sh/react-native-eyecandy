import { DeepPartial } from '../types';
import { ThemePalette } from '../palette';
import { ThemeTypography } from '../typography';
import { ThemeColors } from '../colors';
export declare type Theme = {
    dark: boolean;
    palette: ThemePalette;
    typography: ThemeTypography;
    colors: ThemeColors;
};
export declare type CustomTheme = DeepPartial<Theme>;
export declare type CreateThemeOptions = DeepPartial<Theme>;
export declare type CreateTheme = (options?: CreateThemeOptions) => Theme;
