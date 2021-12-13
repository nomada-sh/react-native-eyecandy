import type { ThemeButton, ThemeVariables } from '../typings';

export default function ({ dark, palette }: ThemeVariables): ThemeButton {
  return {
    default: {
      background: dark ? palette.grey[800] : palette.primary[100],
      foreground: dark ? palette.primary[100] : palette.grey[800],
    },
    primary: {
      background: palette.primary['500'],
      foreground: palette.primary['100'],
    },
  };
}
