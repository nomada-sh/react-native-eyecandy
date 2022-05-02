import { TextStyle } from 'react-native';

import { DeepPartial } from '../types';

export type ThemeTextWeights =
  | TextStyle['fontWeight']
  | 'semibold'
  | 'medium'
  | 'regular';

export type ThemeHeadingVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type ThemeHeadingFontSizes = {
  [key in ThemeHeadingVariants]: number;
};

export type ThemeHeading = {
  fontSize: ThemeHeadingFontSizes;
};

export type ThemeBodyFontSizesChoices =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge';

export type ThemeBodyFontSizes = {
  [key in ThemeBodyFontSizesChoices]: number;
};

export type ThemeBody = {
  fontSize: ThemeBodyFontSizes;
};

export type ThemeTypography = {
  heading: ThemeHeading;
  body: ThemeBody;
};

export type ThemeTypographyVariables = {
  dark: boolean;
};

export type CustomThemeTypography =
  | DeepPartial<ThemeTypography>
  | ((variables: ThemeTypographyVariables) => DeepPartial<ThemeTypography>);

export type CreateThemeTypographyOptions = {
  dark?: boolean;
  typography?: CustomThemeTypography;
};

export type CreateThemeTypography = (
  options?: CreateThemeTypographyOptions,
) => ThemeTypography;
