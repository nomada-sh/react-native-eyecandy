import { DeepPartial } from '../types';
export declare type ThemeHeadingFontSizes = {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
};
export declare type ThemeHeading = {
    fontSize: ThemeHeadingFontSizes;
};
export declare type ThemeBodyFontSizes = {
    xsmall: number;
    small: number;
    medium: number;
    large: number;
    xlarge: number;
};
export declare type ThemeBody = {
    fontSize: ThemeBodyFontSizes;
};
export declare type ThemeTypography = {
    heading: ThemeHeading;
    body: ThemeBody;
};
export declare type CustomThemeTypography = DeepPartial<ThemeTypography>;
export declare type CreateThemeTypographyOptions = DeepPartial<ThemeTypography>;
