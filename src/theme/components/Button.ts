import type { ThemeButton, ThemeVariables } from '../typings';

export default function ({ dark, palette }: ThemeVariables): ThemeButton {
  return {
    default: {
      background: palette.grey[dark ? 800 : 50],
      foreground: palette.grey[dark ? 50 : 800],
    },
    primary: {
      background: palette.primary['500'],
      foreground: palette.primary['100'],
    },
  };
}
