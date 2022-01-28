"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _Header = _interopRequireDefault(require("../Header"));

var _Actions = _interopRequireDefault(require("../Actions"));

var _Days = _interopRequireDefault(require("../Days"));

var _wrap = _interopRequireDefault(require("../../wrap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Month(_ref) {
  let {
    month,
    year,
    getCalendar,
    locale,
    selectedDate: selectedDateProp,
    width,
    index,
    onPressDay,
    onPressYear,
    onPressMonth,
    onPressToday,
    x,
    size,
    todayText
  } = _ref;
  const days = (0, _react.useMemo)(() => getCalendar(year, month), [getCalendar, year, month]);
  const selectedDate = (0, _react.useMemo)(() => ({
    year: selectedDateProp.getFullYear(),
    month: selectedDateProp.getMonth(),
    day: selectedDateProp.getDate()
  }), [selectedDateProp]);
  const date = (0, _react.useMemo)(() => new Date(year, month), [month, year]);
  const style = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const newX = (0, _wrap.default)(width * size, x.value) + index * width;
    let translateX = newX - width * (size + 1);
    if (newX >= 0 && newX <= width * size) translateX = newX - width;
    return {
      transform: [{
        translateX
      }]
    };
  }, [x, index, width]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: [{
      width,
      position: 'absolute'
    }, style],
    key: `${year}-${month}`
  }, /*#__PURE__*/_react.default.createElement(_Actions.default, {
    date: date,
    onPressYear: onPressYear,
    onPressMonth: onPressMonth,
    onPressToday: onPressToday,
    locale: locale,
    todayText: todayText
  }), /*#__PURE__*/_react.default.createElement(_Header.default, {
    locale: locale,
    month: month,
    year: year
  }), /*#__PURE__*/_react.default.createElement(_Days.default, {
    data: days,
    onDayPress: onPressDay,
    selectedDate: selectedDate,
    month: month,
    year: year
  }));
}

var _default = Month;
exports.default = _default;
//# sourceMappingURL=Month.js.map