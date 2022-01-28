"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _BaseButton = _interopRequireDefault(require("../BaseButton"));

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function IconButton(_ref) {
  let {
    icon: Icon,
    style,
    size = 56,
    iconSize: iconSizeProp,
    color = 'default',
    iconColor: iconColorProp,
    variant = 'rounded',
    inverse,
    ...props
  } = _ref;
  const {
    foreground,
    background
  } = (0, _reactNativeEyecandyTheme.useColors)(c => c.button[color]);
  let icon = (0, _react.useMemo)(() => {
    const iconSize = iconSizeProp !== null && iconSizeProp !== void 0 ? iconSizeProp : size * 0.4;
    const iconColor = iconColorProp ? iconColorProp : inverse ? background : foreground;
    return Icon ? /*#__PURE__*/_react.default.createElement(Icon, {
      size: iconSize,
      stroke: iconColor
    }) : null;
  }, [Icon, background, foreground, iconColorProp, iconSizeProp, inverse, size]);
  return /*#__PURE__*/_react.default.createElement(_BaseButton.default, _extends({
    style: [{
      width: size,
      height: size
    }, style],
    color: color,
    inverse: inverse,
    height: size,
    variant: variant
  }, props), icon);
}

var _default = IconButton;
exports.default = _default;
//# sourceMappingURL=IconButton.js.map