import createColors from './createColors';
import {
  ThemeBackgroundColor,
  ThemeBackgroundColors,
  ThemeBadgeColor,
  ThemeBadgeColors,
  ThemeButtonColor,
  ThemeButtonColors,
  ThemeColors,
  ThemeInputColor,
  ThemeInputColors,
  ThemeSwitchColor,
  ThemeSwitchColors,
  ThemeTextColor,
  ThemeTextColors,
} from './types';

test('createColors', () => {
  const colors = createColors();

  expect(colors).toEqual<ThemeColors>({
    background: expect.any(Object),
    button: expect.any(Object),
    input: expect.any(Object),
    text: expect.any(Object),
    switch: expect.any(Object),
    divider: expect.any(Object),
    badge: expect.any(Object),
  });

  const backgroundColor: ThemeBackgroundColor = {
    container: expect.any(String),
    content: expect.any(String),
  };

  expect(colors.background).toEqual<ThemeBackgroundColors>({
    default: backgroundColor,
  });

  const buttonColor: ThemeButtonColor = {
    background: expect.any(String),
    foreground: expect.any(String),
  };

  expect(colors.button).toEqual<ThemeButtonColors>({
    default: buttonColor,
    primary: buttonColor,
    secondary: buttonColor,
    danger: buttonColor,
    warning: buttonColor,
    success: buttonColor,
  });

  const textColor: ThemeTextColor = {
    normal: expect.any(String),
    contrast: expect.any(String),
  };

  expect(colors.text).toEqual<ThemeTextColors>({
    default: textColor,
    primary: textColor,
    error: textColor,
    greyout: textColor,
  });

  const inputColor: ThemeInputColor = {
    background: expect.any(String),
    foreground: expect.any(String),
    placeholder: expect.any(String),
    border: expect.any(String),
    focused: {
      background: expect.any(String),
      indicator: expect.any(String),
    },
  };

  expect(colors.input).toEqual<ThemeInputColors>({
    default: inputColor,
    error: inputColor,
  });

  const swithColor: ThemeSwitchColor = {
    thumbColor: expect.any(String),
    trackColor: expect.any(String),
    trackColorEnabled: expect.any(String),
  };

  expect(colors.switch).toEqual<ThemeSwitchColors>({
    default: swithColor,
  });

  const badgeColor: ThemeBadgeColor = {
    background: expect.any(String),
    border: expect.any(String),
  };

  expect(colors.badge).toEqual<ThemeBadgeColors>({
    default: badgeColor,
    error: badgeColor,
    greyout: badgeColor,
    primary: badgeColor,
    success: badgeColor,
    warning: badgeColor,
  });
});

test('createColors button', () => {
  const colors = createColors({
    colors: {
      button: {
        default: {
          background: 'black',
          foreground: 'white',
        },
        primary: {
          background: 'blue',
        },
      },
    },
  });

  expect(colors.button).toEqual<ThemeButtonColors>({
    default: {
      background: 'black',
      foreground: 'white',
    },
    primary: {
      background: 'blue',
      foreground: expect.any(String),
    },
    secondary: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    success: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    danger: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    warning: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
  });
});

test('createColors button colors function', () => {
  const colors = createColors({
    colors: () => {
      return {
        button: {
          default: {
            background: 'black',
            foreground: 'white',
          },
          primary: {
            background: 'blue',
          },
        },
      };
    },
  });

  expect(colors.button).toEqual<ThemeButtonColors>({
    default: {
      background: 'black',
      foreground: 'white',
    },
    primary: {
      background: 'blue',
      foreground: expect.any(String),
    },
    secondary: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    success: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    danger: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    warning: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
  });
});

test('createColors button dark', () => {
  const colors = createColors({
    dark: true,
    colors: ({ dark }) => {
      return {
        button: {
          default: {
            background: dark ? 'white' : 'black',
            foreground: dark ? 'black' : 'white',
          },
          primary: {
            background: 'blue',
          },
        },
      };
    },
  });

  expect(colors.button).toEqual<ThemeButtonColors>({
    default: {
      background: 'white',
      foreground: 'black',
    },
    primary: {
      background: 'blue',
      foreground: expect.any(String),
    },
    secondary: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    success: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    danger: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    warning: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
  });
});

test('createColors button palette', () => {
  const colors = createColors({
    palette: {
      primary: {
        500: 'blue',
      },
      secondary: {
        500: 'red',
      },
    },
    colors: ({ palette }) => {
      return {
        button: {
          default: {
            background: palette.primary[500],
            foreground: palette.secondary[500],
          },
          primary: {
            background: palette.primary[500],
          },
        },
      };
    },
  });

  expect(colors.button).toEqual<ThemeButtonColors>({
    default: {
      background: 'blue',
      foreground: 'red',
    },
    primary: {
      background: 'blue',
      foreground: expect.any(String),
    },
    secondary: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    success: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    danger: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    warning: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
  });
});

test('createColors button undefined use default colors', () => {
  const colors = createColors({
    colors: {
      button: {
        default: {
          background: undefined,
          foreground: undefined,
        },
        primary: {
          background: undefined,
        },
      },
    },
  });

  expect(colors.button).toEqual<ThemeButtonColors>({
    default: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    primary: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    secondary: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    success: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    danger: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
    warning: {
      background: expect.any(String),
      foreground: expect.any(String),
    },
  });
});
