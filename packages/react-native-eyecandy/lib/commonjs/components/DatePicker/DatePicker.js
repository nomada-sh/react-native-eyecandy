"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Calendar = _interopRequireDefault(require("./Calendar"));

var _BottomSheetV = _interopRequireDefault(require("../BottomSheetV2"));

var _Button = _interopRequireDefault(require("../Button"));

var _LinkButton = _interopRequireDefault(require("../LinkButton"));

var _reactNativeEyecandyIcons = require("@nomada-sh/react-native-eyecandy-icons");

var _formatDate = _interopRequireDefault(require("./formatDate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// TODO: Create Button with input styles.
function DatePicker(_ref) {
  let {
    date,
    onDateChange,
    locale,
    disableCloseOnSelect,
    doneText,
    backText,
    todayText
  } = _ref;
  // TODO: Listen to changes in width.
  const width = (0, _react.useRef)(_reactNative.Dimensions.get('window').width).current;
  const [tab, setTab] = (0, _react.useState)('date');
  const [yearMonthSelectionStep, setYearMonthSelectionStep] = (0, _react.useState)();
  const [visible, setVisible] = (0, _react.useState)(false);
  const onClose = (0, _react.useCallback)(() => {
    setVisible(false);
  }, []);
  const onPress = (0, _react.useCallback)(() => {
    setVisible(true);
  }, []);
  const onGoToYears = (0, _react.useCallback)(() => {
    setYearMonthSelectionStep('year');
  }, []);
  const onGoToMonths = (0, _react.useCallback)(() => {
    setYearMonthSelectionStep('month');
  }, []);
  const handleDateChange = (0, _react.useCallback)(date => {
    onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(date);
    if (!disableCloseOnSelect) onClose();
  }, [onDateChange, disableCloseOnSelect, onClose]);
  const content = (0, _react.useMemo)(() => {
    return /*#__PURE__*/_react.default.createElement(_Calendar.default, {
      width: width,
      locale: locale,
      date: date,
      onDateChange: handleDateChange,
      onGoToYears: onGoToYears,
      onGoToMonths: onGoToMonths,
      yearMonthSelectionStep: yearMonthSelectionStep,
      setYearMonthSelectionStep: setYearMonthSelectionStep,
      todayText: todayText
    });
  }, [date, handleDateChange, locale, onGoToMonths, onGoToYears, todayText, width, yearMonthSelectionStep]);
  const formattedDate = (0, _react.useMemo)(() => (0, _formatDate.default)(date, 'PPP', locale), [date, locale]);
  const doneButtonText = (0, _react.useMemo)(() => {
    return yearMonthSelectionStep ? backText : doneText;
  }, [backText, doneText, yearMonthSelectionStep]);
  const onDonePress = (0, _react.useCallback)(() => {
    if (yearMonthSelectionStep) setYearMonthSelectionStep(undefined);else setVisible(false);
  }, [yearMonthSelectionStep]);
  (0, _react.useEffect)(() => {
    if (visible) setYearMonthSelectionStep(undefined);
  }, [visible]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_LinkButton.default, {
    icon: _reactNativeEyecandyIcons.CalendarEvent,
    onPress: onPress,
    text: formattedDate,
    showChevron: false,
    bold: true,
    focused: visible
  }), /*#__PURE__*/_react.default.createElement(_BottomSheetV.default, {
    height: disableCloseOnSelect ? 410 : 350,
    visible: visible,
    onClose: onClose
  }, content, disableCloseOnSelect ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      padding: 10
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    color: "primary",
    text: doneButtonText,
    onPress: onDonePress
  })) : null));
}

DatePicker.defaultProps = {
  date: new Date(),
  locale: 'en-US',
  doneText: 'Done',
  backText: 'Back',
  todayText: 'Today'
};

const styles = _reactNative.StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    padding: 10
  },
  tab: {
    flex: 1,
    height: 45,
    marginHorizontal: 10
  },
  tabButton: {}
});

var _default = /*#__PURE__*/_react.default.memo(DatePicker);

exports.default = _default;
//# sourceMappingURL=DatePicker.js.map