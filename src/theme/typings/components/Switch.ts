export type SwitchColors = 'default';

export type ThemeSwitchColor = {
  trackColor: string;
  trackColorEnabled: string;
  thumbColor: string;
};

export type ThemeSwitch = {
  [key in SwitchColors]: ThemeSwitchColor;
};
