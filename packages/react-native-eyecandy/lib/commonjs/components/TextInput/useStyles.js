"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useStyles;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useStyles(_ref) {
  let {
    color = 'default',
    focused,
    widthPaddingEnd,
    widthPaddingStart,
    value,
    dirty = false,
    hasError = false,
    fullWidth = true
  } = _ref;
  const {
    palette,
    typography,
    dark
  } = (0, _reactNativeEyecandyTheme.useTheme)();
  const colors = (0, _reactNativeEyecandyTheme.useColors)(c => c.input[color]);
  const fontSize = typography.body.fontSize;
  const empty = dirty || value === undefined || value === '';
  const padding = 16;
  const errorColor = palette.error[200];
  const backgroundColor = focused ? colors.focused.background : colors.background;
  let textColor = colors.foreground;
  textColor = hasError ? errorColor : textColor;
  let placeholderColor = colors.placeholder;
  placeholderColor = hasError ? errorColor : placeholderColor;
  let indicatorColor = focused ? colors.focused.indicator : backgroundColor;
  indicatorColor = hasError ? errorColor : indicatorColor;
  let iconColor = focused ? indicatorColor : textColor;
  const keyboardAppearance = dark ? 'dark' : 'light';

  const styles = _reactNative.StyleSheet.create({
    container: {
      width: fullWidth ? '100%' : undefined
    },
    inputContainer: {
      height: 56,
      borderWidth: 1,
      backgroundColor,
      borderRadius: 12,
      overflow: 'hidden',
      flexDirection: 'row',
      borderStyle: 'solid',
      borderColor: indicatorColor
    },
    iconContainer: {
      justifyContent: 'center',
      paddingHorizontal: padding
    },
    icon: {
      fontSize: 20,
      color: iconColor
    },
    input: {
      flex: 1,
      color: textColor,
      fontSize: fontSize.medium,
      fontWeight: empty ? 'normal' : '700',
      paddingEnd: widthPaddingEnd ? padding : 0,
      paddingStart: widthPaddingStart ? padding : 0
    },
    inputPlaceholder: {
      color: placeholderColor
    }
  });

  const renderIcon = (0, _react.useCallback)((Icon, stroke) => {
    return /*#__PURE__*/_react.default.createElement(Icon, {
      size: styles.icon.fontSize,
      stroke: stroke || styles.icon.color
    });
  }, [styles.icon.color, styles.icon.fontSize]);
  return {
    styles,
    keyboardAppearance,
    renderIcon
  };
}
//# sourceMappingURL=useStyles.js.map