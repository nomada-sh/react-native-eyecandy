"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _typography = require("../../../typography");

var _reactNativeEyecandyTheme = require("@nomada-sh/react-native-eyecandy-theme");

var _Button = _interopRequireDefault(require("../../Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Years(_ref) {
  let {
    onPressBack,
    year,
    maxYears,
    onPressYear
  } = _ref;
  const background = (0, _reactNativeEyecandyTheme.useColors)(c => c.background.default);
  const years = (0, _react.useMemo)(() => {
    const years = [];

    for (let i = year - maxYears; i <= year + maxYears; i++) {
      years.push(i);
    }

    return years;
  }, [maxYears, year]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, {
      backgroundColor: background.content
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      margin: 16,
      marginBottom: 4
    }
  }, /*#__PURE__*/_react.default.createElement(_typography.Body, {
    onPress: onPressBack,
    color: "primary",
    weight: "bold"
  }, "Back")), /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.ScrollView, {
    contentContainerStyle: {
      padding: 8,
      paddingTop: 0,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    showsVerticalScrollIndicator: false
  }, years.map(y => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    key: y,
    style: {
      width: '33%',
      padding: 8
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    onPress: () => onPressYear(y),
    buttonStyle: {
      height: 50
    },
    color: year === y ? 'primary' : 'default',
    text: y.toString()
  })))));
}

Years.defaultProps = {
  maxYears: 80
};
var _default = Years;
exports.default = _default;
//# sourceMappingURL=Years.js.map