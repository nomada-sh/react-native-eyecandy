"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _typography = require("../../../../typography");

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

var _hooks = require("../../../../hooks");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Day(_ref) {
  let {
    value,
    onPress,
    selected,
    debug
  } = _ref;
  const {
    palette,
    dark,
    colors
  } = (0, _reactNativeEyecandyTheme.useTheme)();
  const today = (0, _react.useMemo)(() => {
    if (!value) return false;
    const now = new Date();
    return value.year === now.getFullYear() && value.month === now.getMonth() && value.day === now.getDate();
  }, [value]);
  const rippleColor = (0, _hooks.useRippleColor)(selected ? palette.primary[500] : colors.background.default.container);
  const backgroundColor = (0, _react.useMemo)(() => {
    if (selected) return palette.primary[500];
    if (today) return palette.grey[dark ? 800 : 200];
    return 'transparent';
  }, [dark, palette.grey, palette.primary, selected, today]);
  const textColor = (0, _react.useMemo)(() => {
    if (selected) return 'white';
    if (today) return palette.primary[500];
    return colors.text.default.normal;
  }, [colors.text.default.normal, palette.primary, selected, today]);
  const count = (0, _react.useRef)(1);
  value && debug && console.log('DAY', `${value.year}/${value.month}/${value.day}`, 'RENDER COUNT:', count.current++);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    style: [value !== false ? styles.pressable : styles.pressableHidden, {
      backgroundColor: backgroundColor
    }],
    disabled: value === false,
    onPress: () => {
      if (value !== false && onPress) onPress(value);
    },
    android_ripple: {
      color: rippleColor.string(),
      borderless: true,
      radius: 20
    }
  }, /*#__PURE__*/_react.default.createElement(_typography.Body, {
    color: "default",
    weight: selected ? 'bold' : 'normal',
    style: {
      color: textColor
    }
  }, value !== false ? value.day : '00')));
}

const styles = _reactNative.StyleSheet.create({
  container: {
    width: '14.28%',
    alignItems: 'center',
    overflow: 'hidden'
  },
  pressable: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pressableHidden: {
    opacity: 0
  }
});

var _default = /*#__PURE__*/_react.default.memo(Day);

exports.default = _default;
//# sourceMappingURL=Day.js.map