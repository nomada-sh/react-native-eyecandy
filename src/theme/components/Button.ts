import type { ThemeButton, ThemeVariables } from '../typings';

export default function ({ dark, palette }: ThemeVariables): ThemeButton {
  return {
    default: {
      background: palette.grey[dark ? 800 : 100],
      foreground: palette.grey[dark ? 100 : 800],
    },
    primary: {
      background: palette.primary['500'],
      foreground: palette.primary['100'],
    },
  };
}
