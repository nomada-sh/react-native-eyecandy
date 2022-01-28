"use strict";

var _createColors = _interopRequireDefault(require("./createColors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('createColors', () => {
  const colors = (0, _createColors.default)();
  expect(colors).toEqual({
    background: expect.any(Object),
    button: expect.any(Object),
    input: expect.any(Object),
    text: expect.any(Object),
    switch: expect.any(Object)
  });
  const backgroundColor = {
    container: expect.any(String),
    content: expect.any(String)
  };
  expect(colors.background).toEqual({
    default: backgroundColor
  });
  const buttonColor = {
    background: expect.any(String),
    foreground: expect.any(String)
  };
  expect(colors.button).toEqual({
    default: buttonColor,
    primary: buttonColor
  });
  const textColor = {
    normal: expect.any(String),
    contrast: expect.any(String)
  };
  expect(colors.text).toEqual({
    default: textColor,
    primary: textColor,
    error: textColor,
    greyout: textColor
  });
  const inputColor = {
    background: expect.any(String),
    foreground: expect.any(String),
    placeholder: expect.any(String),
    border: expect.any(String),
    focused: {
      background: expect.any(String),
      indicator: expect.any(String)
    }
  };
  expect(colors.input).toEqual({
    default: inputColor
  });
  const swithColor = {
    thumbColor: expect.any(String),
    trackColor: expect.any(String),
    trackColorEnabled: expect.any(String)
  };
  expect(colors.switch).toEqual({
    default: swithColor
  });
});
test('createColors button', () => {
  const customColors = {
    default: {
      background: 'black',
      foreground: 'white'
    },
    primary: {
      background: 'blue'
    }
  };
  const colors = (0, _createColors.default)({
    colors: {
      button: customColors
    }
  });
  expect(colors.button).toEqual({
    default: {
      background: 'black',
      foreground: 'white'
    },
    primary: {
      background: 'blue',
      foreground: expect.any(String)
    }
  });
});
//# sourceMappingURL=createColors.test.js.map