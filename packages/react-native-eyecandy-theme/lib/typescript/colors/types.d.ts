import { DeepPartial } from '../types';
import { CustomThemePalette, ThemePalette } from '../palette';
import { CustomThemeTypography, ThemeTypography } from '../typography';
export declare type ThemeColors = {
    button: ThemeButtonColors;
    input: ThemeInputColors;
    text: ThemeTextColors;
    switch: ThemeSwitchColors;
    background: ThemeBackgroundColors;
    divider: ThemeDividerColors;
};
export declare type ThemeColorsVariables = {
    dark: boolean;
    palette: ThemePalette;
    typography: ThemeTypography;
};
export declare type CustomThemeColors<T = ThemeColors> = DeepPartial<T> | ((variables: ThemeColorsVariables) => T);
export declare type CreateThemeColorsOptions = {
    dark?: boolean;
    palette?: CustomThemePalette;
    typography?: CustomThemeTypography;
    colors?: CustomThemeColors<ThemeColors>;
};
export declare type CreateThemeColors = (options?: CreateThemeColorsOptions) => ThemeColors;
export declare type GetThemeColorsOptions<T> = {
    colors?: CustomThemeColors<T>;
} & ThemeColorsVariables;
export declare type GetThemeColors<T> = (options: GetThemeColorsOptions<T>) => T;
export declare type MergeThemeColorsOptions<T> = {
    colors?: CustomThemeColors<T>;
    defaultColors: T;
} & ThemeColorsVariables;
/**
 * Background
 */
export declare type ThemeBackgroundColorChoices = 'default';
export declare type ThemeBackgroundColor = {
    container: string;
    content: string;
};
export declare type ThemeBackgroundColors = {
    [key in ThemeBackgroundColorChoices]: ThemeBackgroundColor;
};
/**
 * Button
 */
export declare type ThemeButtonColorChoices = 'default' | 'primary';
export declare type ThemeButtonColor = {
    background: string;
    foreground: string;
};
export declare type ThemeButtonColors = {
    [key in ThemeButtonColorChoices]: ThemeButtonColor;
};
/**
 * Input
 */
export declare type ThemeInputColorChoices = 'default';
export declare type ThemeInputColor = {
    background: string;
    foreground: string;
    placeholder: string;
    border: string;
    focused: {
        indicator: string;
        background: string;
    };
};
export declare type ThemeInputColors = {
    [key in ThemeInputColorChoices]: ThemeInputColor;
};
/**
 * Switch
 */
export declare type ThemeSwitchColorChoices = 'default';
export declare type ThemeSwitchColor = {
    trackColor: string;
    trackColorEnabled: string;
    thumbColor: string;
};
export declare type ThemeSwitchColors = {
    [key in ThemeSwitchColorChoices]: ThemeSwitchColor;
};
/**
 * Text
 */
export declare type ThemeTextColorsChoices = 'default' | 'primary' | 'error' | 'greyout';
export declare type ThemeTextColor = {
    normal: string;
    contrast: string;
};
export declare type ThemeTextColors = {
    [key in ThemeTextColorsChoices]: ThemeTextColor;
};
/**
 * Divider
 */
export declare type ThemeDividerColorChoices = 'default';
export declare type ThemeDividerColor = string;
export declare type ThemeDividerColors = {
    [key in ThemeDividerColorChoices]: ThemeDividerColor;
};
