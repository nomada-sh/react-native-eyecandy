"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _typography = require("../../../../typography");

var _formatDate = _interopRequireDefault(require("../../formatDate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Actions(_ref) {
  let {
    date,
    onPressYear,
    onPressMonth,
    onPressToday,
    locale,
    // = 'en-US',
    todayText
  } = _ref;
  const {
    month,
    year
  } = (0, _react.useMemo)(() => {
    return {
      month: (0, _formatDate.default)(date, 'MMMM', locale),
      year: (0, _formatDate.default)(date, 'yyyy', locale)
    };
  }, [date, locale]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.monthYearContainer
  }, /*#__PURE__*/_react.default.createElement(_typography.Body, {
    style: [styles.text, {
      marginEnd: 0
    }],
    size: "xlarge",
    color: "primary",
    onPress: onPressMonth
  }, month), /*#__PURE__*/_react.default.createElement(_typography.Body, {
    style: [styles.text, {
      marginStart: 0
    }],
    size: "xlarge",
    color: "primary",
    onPress: onPressYear
  }, year)), /*#__PURE__*/_react.default.createElement(_typography.Body, {
    size: "xlarge",
    style: styles.text,
    color: "primary",
    onPress: onPressToday
  }, todayText));
}

Actions.defaultProps = {
  locale: 'en-US',
  todayText: 'Today'
};

const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  monthYearContainer: {
    flexDirection: 'row'
  },
  text: {
    fontWeight: 'bold',
    padding: 10,
    marginHorizontal: 13,
    marginTop: 6
  }
});

var _default = Actions;
exports.default = _default;
//# sourceMappingURL=Actions.js.map