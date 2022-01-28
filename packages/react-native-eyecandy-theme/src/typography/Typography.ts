import type {
  ThemeHeadingFontSizes,
  ThemeBodyFontSizes,
  ThemeTypography,
} from './types';

export const HeadingFontSizes: ThemeHeadingFontSizes = {
  h1: 48,
  h2: 40,
  h3: 32,
  h4: 24,
  h5: 20,
  h6: 18,
};

export const BodyFontSizes: ThemeBodyFontSizes = {
  xsmall: 10,
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
};

const Typography: ThemeTypography = {
  heading: {
    fontSize: HeadingFontSizes,
  },
  body: {
    fontSize: BodyFontSizes,
  },
};

export default Typography;
