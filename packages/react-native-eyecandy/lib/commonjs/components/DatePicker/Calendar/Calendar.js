"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _calendarBase = require("calendar-base");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _Month = _interopRequireDefault(require("./Month"));

var _YearMonthSelection = _interopRequireDefault(require("./YearMonthSelection"));

var _wrap = _interopRequireDefault(require("../wrap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Calendar(_ref) {
  let {
    locale,
    date,
    onDateChange,
    width,
    onGoToYears,
    onGoToMonths,
    yearMonthSelectionStep,
    setYearMonthSelectionStep,
    todayText
  } = _ref;
  const calendar = (0, _react.useMemo)(() => new _calendarBase.Calendar(), []);
  const getCalendar = (0, _react.useCallback)((year, month) => {
    return calendar.getCalendar(year, month);
  }, [calendar]);
  const createMonths = (0, _react.useCallback)(date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return [{
      year,
      month: month - 2
    }, {
      year,
      month: month - 1
    }, {
      year,
      month
    }, {
      year,
      month: month + 1
    }, {
      year,
      month: month + 2
    }];
  }, []);
  const [months, setMonths] = (0, _react.useState)(createMonths(date));
  const onChange = (0, _react.useCallback)((index, nextIndex, prevIndex) => {
    const current = months[index];
    const newMonths = [...months];
    newMonths[nextIndex] = {
      year: current.year,
      month: current.month + 2
    };
    newMonths[prevIndex] = {
      year: current.year,
      month: current.month - 2
    };
    setMonths(newMonths);
  }, [months]);
  const onPressDay = (0, _react.useCallback)(value => {
    onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(new Date(value.year, value.month, value.day));
  }, [onDateChange]);
  const x = (0, _reactNativeReanimated.useSharedValue)(-width);
  const index = (0, _reactNativeReanimated.useSharedValue)(2);
  const currentDate = (0, _react.useMemo)(() => {
    const current = months[index.value];
    return new Date(current.year, current.month, 1);
  }, [index.value, months]);
  const goToDate = (0, _react.useCallback)((date, animated) => {
    // TODO: Improve this
    setMonths(createMonths(date));
    index.value = 2; // if (animated) x.value = withSpring(-width);
    // else x.value = -width;

    x.value = -width;
  }, [createMonths, index, width, x]);
  const onPressToday = (0, _react.useCallback)(() => {
    onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(new Date());
    const current = months[index.value];
    const from = new Date(current.year, current.month, 1);
    const to = new Date();
    const same = to.getFullYear() === from.getFullYear() && to.getMonth() === from.getMonth();
    if (same) return;
    goToDate(to, true);
  }, [goToDate, index.value, months, onDateChange]);
  const gestureHandler = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
    },
    onActive: (e, ctx) => {
      x.value = ctx.startX + e.translationX;
    },
    onEnd: (e, ctx) => {
      const threshold = width / 3;
      const direction = e.translationX > 0 ? 1 : -1;
      const startX = Math.round(ctx.startX / width) * width;

      if (Math.abs(e.translationX) > threshold) {
        index.value = (0, _wrap.default)(months.length, index.value - direction);
        const next = (0, _wrap.default)(months.length, index.value + 2);
        const prev = (0, _wrap.default)(months.length, index.value - 2);
        (0, _reactNativeReanimated.runOnJS)(onChange)(index.value, next, prev);
        x.value = (0, _reactNativeReanimated.withTiming)(startX + direction * width, {
          duration: 300
        });
      } else {
        x.value = (0, _reactNativeReanimated.withTiming)(startX, {
          duration: 300
        });
      }
    }
  });
  const content = (0, _react.useMemo)(() => {
    return months.map((_ref2, index) => {
      let {
        year,
        month
      } = _ref2;
      return /*#__PURE__*/_react.default.createElement(_Month.default, {
        key: `${year}-${month}`,
        onPressDay: onPressDay,
        onPressToday: onPressToday,
        onPressYear: onGoToYears,
        onPressMonth: onGoToMonths,
        selectedDate: date,
        month: month,
        year: year,
        getCalendar: getCalendar,
        width: width,
        locale: locale,
        index: index,
        x: x,
        size: months.length,
        todayText: todayText
      });
    });
  }, [months, onPressDay, onPressToday, onGoToYears, onGoToMonths, date, getCalendar, width, locale, x, todayText]);
  const onChangeVisibleDate = (0, _react.useCallback)(date => {
    goToDate(date);
    setYearMonthSelectionStep === null || setYearMonthSelectionStep === void 0 ? void 0 : setYearMonthSelectionStep(undefined);
  }, [goToDate, setYearMonthSelectionStep]);
  if (yearMonthSelectionStep) return /*#__PURE__*/_react.default.createElement(_YearMonthSelection.default, {
    onChange: onChangeVisibleDate,
    step: yearMonthSelectionStep,
    date: currentDate,
    selectedDate: date,
    goToYears: onGoToYears,
    locale: locale,
    setStep: setYearMonthSelectionStep
  });
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.PanGestureHandler, {
    onGestureEvent: gestureHandler
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: {
      width,
      flexDirection: 'row',
      flex: 1
    }
  }, content));
}

var _default = /*#__PURE__*/_react.default.memo(Calendar);

exports.default = _default;
//# sourceMappingURL=Calendar.js.map