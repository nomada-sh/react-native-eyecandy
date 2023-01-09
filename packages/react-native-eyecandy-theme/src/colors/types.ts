import { CustomThemePalette, ThemePalette } from '../palette';
import { DeepPartial } from '../types';
import { CustomThemeTypography, ThemeTypography } from '../typography';

export type ThemeColors = {
  button: ThemeButtonColors;
  input: ThemeInputColors;
  text: ThemeTextColors;
  switch: ThemeSwitchColors;
  background: ThemeBackgroundColors;
  divider: ThemeDividerColors;
  badge: ThemeBadgeColors;
};

export type ThemeColorsVariables = {
  dark: boolean;
  palette: ThemePalette;
  typography: ThemeTypography;
};

export type CustomThemeColors<T = ThemeColors> =
  | DeepPartial<T>
  | ((variables: ThemeColorsVariables) => DeepPartial<T>);

export type CreateThemeColorsOptions = {
  dark?: boolean;
  palette?: CustomThemePalette;
  typography?: CustomThemeTypography;
  colors?: CustomThemeColors;
};

export type CreateThemeColors = (
  options?: CreateThemeColorsOptions,
) => ThemeColors;

export type GetThemeColorsOptions<T> = {
  colors?: CustomThemeColors<T>;
} & ThemeColorsVariables;

export type GetThemeColors<T> = (options: GetThemeColorsOptions<T>) => T;

export type MergeThemeColorsOptions<T> = {
  colors?: CustomThemeColors<T>;
  defaultColors: T;
} & ThemeColorsVariables;

/**
 * Background
 */
export type ThemeBackgroundColorChoices = 'default';

export type ThemeBackgroundColor = {
  container: string;
  content: string;
};

export type ThemeBackgroundColors = {
  [key in ThemeBackgroundColorChoices]: ThemeBackgroundColor;
};

/**
 * Button
 */

export type ThemeButtonColorChoices =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'warning'
  | 'success';

export type ThemeButtonColor = {
  background: string;
  foreground: string;
};

export type ThemeButtonColors = {
  [key in ThemeButtonColorChoices]: ThemeButtonColor;
};

/**
 * Input
 */

export type ThemeInputColorChoices = 'default' | 'error' | 'success';

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

export type ThemeInputColors = {
  [key in ThemeInputColorChoices]: ThemeInputColor;
};

/**
 * Switch
 */

export type ThemeSwitchColorChoices = 'default';

export type ThemeSwitchColor = {
  trackColor: string;
  trackColorEnabled: string;
  thumbColor: string;
};

export type ThemeSwitchColors = {
  [key in ThemeSwitchColorChoices]: ThemeSwitchColor;
};

/**
 * Text
 */

// !! Keep in sync with utils/isThemeTextColorsChoices.ts
export type ThemeTextColorsChoices =
  | 'default'
  | 'primary'
  | 'error'
  | 'warning'
  | 'success'
  | 'greyout';

export type ThemeTextColor = {
  normal: string;
  contrast: string;
};

export type ThemeTextColors = {
  [key in ThemeTextColorsChoices]: ThemeTextColor;
};

/**
 * Divider
 */
export type ThemeDividerColorChoices = 'default';

export type ThemeDividerColor = string;

export type ThemeDividerColors = {
  [key in ThemeDividerColorChoices]: ThemeDividerColor;
};

/**
 * Badge
 */
export type ThemeBadgeColorChoices =
  | 'default'
  | 'primary'
  | 'danger'
  | 'error'
  | 'warning'
  | 'success'
  | 'greyout';

export type ThemeBadgeColor = {
  border: string;
  background: string;
};

export type ThemeBadgeColors = {
  [key in ThemeBadgeColorChoices]: ThemeBadgeColor;
};
