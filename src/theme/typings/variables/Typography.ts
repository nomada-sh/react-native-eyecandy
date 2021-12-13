export type ThemeHeadingFontSizes = {
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
};

export type ThemeHeading = {
  fontSize: ThemeHeadingFontSizes;
};

export type ThemeBodyFontSizes = {
  xsmall: number;
  small: number;
  medium: number;
  large: number;
  xlarge: number;
};

export type ThemeBody = {
  fontSize: ThemeBodyFontSizes;
};

export type ThemeTypography = {
  heading: ThemeHeading;
  body: ThemeBody;
};
