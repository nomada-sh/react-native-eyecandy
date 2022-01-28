"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _hooks = require("../../hooks");

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BaseMenuItem(_ref) {
  let {
    style,
    icon,
    iconColor,
    iconBackgroundColor,
    separator = false,
    onPress,
    children
  } = _ref;
  const {
    background,
    divider
  } = (0, _reactNativeEyecandyTheme.useColors)(c => ({
    background: c.background.default,
    divider: c.divider.default
  }));
  const rippleColor = (0, _hooks.useRippleColor)(background.container);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    android_ripple: {
      color: rippleColor.string()
    },
    style: [{
      backgroundColor: background.container
    }, styles.container, style],
    onPress: onPress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.content
  }, icon && /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    variant: "transparent-rounded",
    style: styles.icon,
    buttonStyle: {
      backgroundColor: iconBackgroundColor
    },
    icon: icon,
    iconColor: iconColor,
    size: 40,
    iconSize: 22,
    disabled: true,
    hideDisabledOverlay: true
  }), children), separator ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [{
      backgroundColor: divider
    }, styles.separator]
  }) : null);
}

const styles = _reactNative.StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  text: {
    flex: 1
  },
  icon: {
    marginEnd: 16
  },
  separator: {
    height: 1,
    width: '100%'
  }
});

var _default = BaseMenuItem;
exports.default = _default;
//# sourceMappingURL=BaseMenuItem.js.map