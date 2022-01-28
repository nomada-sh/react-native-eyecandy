"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _Button = _interopRequireDefault(require("../../../Button"));

var _typography = require("../../../../typography");

var _reactUse = require("react-use");

var _formatDate = _interopRequireDefault(require("../../formatDate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const YEARS = 50;

function YearMonthSelection(_ref) {
  let {
    step,
    date: visibleDate,
    locale,
    onChange,
    goToYears,
    selectedDate,
    setStep
  } = _ref;
  const {
    yearSelected,
    monthSelected
  } = (0, _react.useMemo)(() => {
    return {
      yearSelected: selectedDate.getFullYear(),
      monthSelected: selectedDate.getMonth()
    };
  }, [selectedDate]);
  const {
    yearNow,
    monthNow
  } = (0, _react.useMemo)(() => {
    const now = new Date();
    return {
      yearNow: now.getFullYear(),
      monthNow: now.getMonth()
    };
  }, []);
  const {
    initialYear
  } = (0, _react.useMemo)(() => {
    return {
      initialYear: visibleDate.getFullYear(),
      initialMonth: visibleDate.getMonth()
    };
  }, [visibleDate]);
  const [year, setYear] = (0, _react.useState)(initialYear);
  const formatMonth = (0, _react.useCallback)(month => {
    return (0, _formatDate.default)(new Date(initialYear, month, 1), 'MMMM', locale);
  }, [locale, initialYear]);
  const initialYearIndexRef = (0, _react.useRef)(0);
  const years = (0, _react.useMemo)(() => {
    const years = [];

    for (let i = initialYear - YEARS; i <= initialYear + YEARS; i += 4) {
      const group = [];

      for (let j = 0; j < 4; j++) {
        const y = i + j;
        if (y === initialYear) initialYearIndexRef.current = years.length - 2;
        group.push(y);
      }

      years.push(group);
    }

    return years;
  }, [initialYear]);
  const months = (0, _react.useMemo)(() => {
    const months = [];

    for (let i = 0; i < 4; i++) {
      const group = [];

      for (let j = 0; j < 3; j++) group.push({
        month: i * 3 + j,
        name: formatMonth(i * 3 + j)
      });

      months.push(group);
    }

    return months;
  }, [formatMonth]);
  (0, _reactUse.useUpdateEffect)(() => {
    setYear(initialYear);
  }, [initialYear]);
  if (step === 'year') return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.FlatList, {
    initialScrollIndex: initialYearIndexRef.current,
    getItemLayout: (_, index) => ({
      length: 55,
      offset: 55 * index,
      index
    }),
    contentContainerStyle: [styles.flatlist, {
      paddingTop: 0
    }],
    data: years,
    keyExtractor: (_, index) => index.toString(),
    renderItem: _ref2 => {
      let {
        item
      } = _ref2;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          flexDirection: 'row'
        }
      }, item.map(y => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        key: y,
        style: styles.year
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        style: styles.yearButton //onPress={() => onPressYear?.(new Date(y, month))}
        ,
        onPress: () => {
          setYear(y);
          setStep === null || setStep === void 0 ? void 0 : setStep('month');
        },
        color: y === yearSelected || y === yearNow ? 'primary' : 'default',
        inverse: y === yearNow && y !== yearSelected,
        text: y.toString()
      }))));
    },
    showsVerticalScrollIndicator: false
  }));
  if (step === 'month') return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.titleContainer
  }, /*#__PURE__*/_react.default.createElement(_typography.Body, {
    onPress: goToYears,
    size: "xlarge",
    color: "primary",
    weight: "bold"
  }, year)), /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.FlatList, {
    contentContainerStyle: styles.flatlist,
    data: months,
    keyExtractor: (_, index) => index.toString(),
    renderItem: _ref3 => {
      let {
        item
      } = _ref3;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          flexDirection: 'row'
        }
      }, item.map(_ref4 => {
        let {
          month: m,
          name
        } = _ref4;
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          key: name,
          style: styles.month
        }, /*#__PURE__*/_react.default.createElement(_Button.default, {
          onPress: () => onChange === null || onChange === void 0 ? void 0 : onChange(new Date(year, m)),
          color: m === monthSelected && year === yearSelected || m === monthNow && year === yearNow ? 'primary' : 'default',
          inverse: m === monthNow && year === yearNow && m !== monthSelected,
          text: name
        }));
      }));
    },
    showsVerticalScrollIndicator: false
  }));
  return null;
}

YearMonthSelection.defaultProps = {
  locale: 'en-US'
};

const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  flatlist: {
    padding: 10
  },
  month: {
    padding: 6,
    width: '33%'
  },
  year: {
    padding: 6,
    width: '25%',
    height: 55
  },
  yearButton: {
    height: 55 - 12
  },
  titleContainer: {
    padding: 16,
    paddingBottom: 0,
    alignItems: 'center'
  }
});

var _default = /*#__PURE__*/_react.default.memo(YearMonthSelection);

exports.default = _default;
//# sourceMappingURL=YearMonthSelection.js.map