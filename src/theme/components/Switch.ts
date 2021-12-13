import type { ThemeSwitch, ThemeVariables } from '../typings';

export default function ({ palette, dark }: ThemeVariables): ThemeSwitch {
  return {
    default: {
      thumbColor: palette.grey[100],
      trackColor: dark ? palette.grey[800] : palette.grey[200],
      trackColorEnabled: palette.primary[500],
    },
  };
}
