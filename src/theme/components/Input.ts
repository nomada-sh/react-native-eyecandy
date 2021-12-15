import type { ThemeInput, ThemeVariables } from '../typings';

export default function ({ dark, palette }: ThemeVariables): ThemeInput {
  return {
    default: {
      background: palette.grey[dark ? 800 : 100],
      foreground: palette.grey[dark ? 50 : 900],
      placeholder: palette.grey[500],
      border: palette.grey[dark ? 800 : 300],
      focused: {
        background: palette.grey[dark ? 900 : 200],
        indicator: palette.primary[500],
      },
    },
  };
}
