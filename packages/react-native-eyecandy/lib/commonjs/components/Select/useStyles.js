"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useStyles;

var _reactNative = require("react-native");

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

function useStyles(_ref) {
  let {
    color = 'default',
    variant = 'default',
    value,
    focused,
    withPaddingStart
  } = _ref;
  const colors = (0, _reactNativeEyecandyTheme.useColors)(c => c.input[color]);
  const padding = 16;
  return _reactNative.StyleSheet.create({
    container: {
      borderRadius: 12,
      borderWidth: 1,
      borderStyle: 'solid',
      overflow: 'hidden',
      flexDirection: 'row',
      borderColor: focused ? colors.focused.indicator : variant === 'outlined' ? colors.border : colors.background,
      backgroundColor: variant === 'outlined' ? undefined : focused ? colors.focused.background : colors.background
    },
    selectContainer: {
      flex: 1
    },
    input: {
      color: colors.foreground,
      fontWeight: value ? '700' : 'normal',
      paddingHorizontal: 0,
      paddingStart: withPaddingStart ? padding : 0,
      height: 56
    },
    placeholder: {
      color: colors.placeholder
    },
    iconContainer: {
      justifyContent: 'center',
      paddingHorizontal: padding
    },
    icon: {
      fontSize: 20,
      color: focused ? colors.focused.indicator : undefined
    }
  });
}
//# sourceMappingURL=useStyles.js.map