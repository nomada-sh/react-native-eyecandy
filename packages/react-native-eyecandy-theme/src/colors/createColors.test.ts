import createColors from './createColors';
import {CustomThemeColors, ThemeButtonColors} from './types';

test('createColors', () => {
  const colors = createColors();

  expect(colors).toEqual({
    background: expect.any(Object),
    button: expect.any(Object),
    input: expect.any(Object),
    text: expect.any(Object),
    switch: expect.any(Object),
    divider: expect.any(Object),
  });

  const backgroundColor = {
    container: expect.any(String),
    content: expect.any(String),
  };

  expect(colors.background).toEqual({
    default: backgroundColor,
  });

  const buttonColor = {
    background: expect.any(String),
    foreground: expect.any(String),
  };

  expect(colors.button).toEqual({
    default: buttonColor,
    primary: buttonColor,
  });

  const textColor = {
    normal: expect.any(String),
    contrast: expect.any(String),
  };

  expect(colors.text).toEqual({
    default: textColor,
    primary: textColor,
    error: textColor,
    greyout: textColor,
  });

  const inputColor = {
    background: expect.any(String),
    foreground: expect.any(String),
    placeholder: expect.any(String),
    border: expect.any(String),
    focused: {
      background: expect.any(String),
      indicator: expect.any(String),
    },
  };

  expect(colors.input).toEqual({
    default: inputColor,
  });

  const swithColor = {
    thumbColor: expect.any(String),
    trackColor: expect.any(String),
    trackColorEnabled: expect.any(String),
  };

  expect(colors.switch).toEqual({
    default: swithColor,
  });
});

test('createColors button', () => {
  const customColors: CustomThemeColors<ThemeButtonColors> = {
    default: {
      background: 'black',
      foreground: 'white',
    },
    primary: {
      background: 'blue',
    },
  };

  const colors = createColors({
    colors: {
      button: customColors,
    },
  });

  expect(colors.button).toEqual({
    default: {
      background: 'black',
      foreground: 'white',
    },
    primary: {
      background: 'blue',
      foreground: expect.any(String),
    },
  });
});
