import type { ThemeText, ThemeVariables } from '../typings';

export default function ({ palette, dark }: ThemeVariables): ThemeText {
  return {
    default: {
      normal: palette.foreground.primary,
      contrast: palette.background.container,
    },
    primary: {
      normal: palette.primary[500],
      contrast: palette.primary[100],
    },
    error: {
      normal: palette.error[200],
      contrast: palette.grey[100],
    },
    grey: {
      normal: dark ? palette.grey[400] : palette.grey[500],
      contrast: palette.foreground.primary,
    },
  };
}
