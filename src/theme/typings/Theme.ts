import type { ThemeComponents } from './Components';
import type { ThemePalette, ThemeTypography } from './variables';

export type ThemeVariables = {
  dark: boolean;
  typography: ThemeTypography;
  palette: ThemePalette;
};

export type Theme = ThemeVariables & {
  components: ThemeComponents;
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};

export type ThemeCreator<T, Variables> =
  | DeepPartial<T>
  | ((variables: Variables) => DeepPartial<T>);

export type ThemeOptions = {
  dark?: boolean;
  palette?: ThemeCreator<
    ThemePalette,
    { dark: boolean; palette: ThemePalette }
  >;
  typography?: ThemeCreator<
    ThemeTypography,
    { dark: boolean; typography: ThemeTypography }
  >;
  components?: ThemeCreator<ThemeComponents, ThemeVariables>;
  baseTheme?: Theme;
};
