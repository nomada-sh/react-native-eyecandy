import type { ThemeInput, ThemeVariables } from '../typings';

export default function ({ dark, palette }: ThemeVariables): ThemeInput {
  return {
    default: {
      background: palette.grey[dark ? 800 : 50],
      foreground: palette.grey[dark ? 50 : 900],
      placeholder: palette.grey[500],
      border: palette.grey[dark ? 800 : 300],
      focused: {
        background: dark ? palette.grey[900] : palette.primary[100],
        indicator: palette.primary[500],
      },
    },
  };
}
