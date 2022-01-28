import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Calendar from './Calendar';
import BottomSheet from '../BottomSheetV2';
import Button from '../Button'; // TODO: Create Button with input styles.

import LinkButton from '../LinkButton';
import { CalendarEvent } from '@nomada-sh/react-native-eyecandy-icons';
import formatDate from './formatDate';

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
  const width = useRef(Dimensions.get('window').width).current;
  const [tab, setTab] = useState('date');
  const [yearMonthSelectionStep, setYearMonthSelectionStep] = useState();
  const [visible, setVisible] = useState(false);
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);
  const onPress = useCallback(() => {
    setVisible(true);
  }, []);
  const onGoToYears = useCallback(() => {
    setYearMonthSelectionStep('year');
  }, []);
  const onGoToMonths = useCallback(() => {
    setYearMonthSelectionStep('month');
  }, []);
  const handleDateChange = useCallback(date => {
    onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(date);
    if (!disableCloseOnSelect) onClose();
  }, [onDateChange, disableCloseOnSelect, onClose]);
  const content = useMemo(() => {
    return /*#__PURE__*/React.createElement(Calendar, {
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
  const formattedDate = useMemo(() => formatDate(date, 'PPP', locale), [date, locale]);
  const doneButtonText = useMemo(() => {
    return yearMonthSelectionStep ? backText : doneText;
  }, [backText, doneText, yearMonthSelectionStep]);
  const onDonePress = useCallback(() => {
    if (yearMonthSelectionStep) setYearMonthSelectionStep(undefined);else setVisible(false);
  }, [yearMonthSelectionStep]);
  useEffect(() => {
    if (visible) setYearMonthSelectionStep(undefined);
  }, [visible]);
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(LinkButton, {
    icon: CalendarEvent,
    onPress: onPress,
    text: formattedDate,
    showChevron: false,
    bold: true,
    focused: visible
  }), /*#__PURE__*/React.createElement(BottomSheet, {
    height: disableCloseOnSelect ? 410 : 350,
    visible: visible,
    onClose: onClose
  }, content, disableCloseOnSelect ? /*#__PURE__*/React.createElement(View, {
    style: {
      padding: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
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
const styles = StyleSheet.create({
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
export default /*#__PURE__*/React.memo(DatePicker);
//# sourceMappingURL=DatePicker.js.map