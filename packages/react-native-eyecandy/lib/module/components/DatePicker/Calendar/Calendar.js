import React, { useCallback, useMemo, useState } from 'react';
import { Calendar as CalendarBase } from 'calendar-base';
import Animated, { runOnJS, useAnimatedGestureHandler, useSharedValue, withTiming } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Month from './Month';
import YearMonthSelection from './YearMonthSelection';
import wrap from '../wrap';

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
  const calendar = useMemo(() => new CalendarBase(), []);
  const getCalendar = useCallback((year, month) => {
    return calendar.getCalendar(year, month);
  }, [calendar]);
  const createMonths = useCallback(date => {
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
  const [months, setMonths] = useState(createMonths(date));
  const onChange = useCallback((index, nextIndex, prevIndex) => {
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
  const onPressDay = useCallback(value => {
    onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(new Date(value.year, value.month, value.day));
  }, [onDateChange]);
  const x = useSharedValue(-width);
  const index = useSharedValue(2);
  const currentDate = useMemo(() => {
    const current = months[index.value];
    return new Date(current.year, current.month, 1);
  }, [index.value, months]);
  const goToDate = useCallback((date, animated) => {
    // TODO: Improve this
    setMonths(createMonths(date));
    index.value = 2; // if (animated) x.value = withSpring(-width);
    // else x.value = -width;

    x.value = -width;
  }, [createMonths, index, width, x]);
  const onPressToday = useCallback(() => {
    onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(new Date());
    const current = months[index.value];
    const from = new Date(current.year, current.month, 1);
    const to = new Date();
    const same = to.getFullYear() === from.getFullYear() && to.getMonth() === from.getMonth();
    if (same) return;
    goToDate(to, true);
  }, [goToDate, index.value, months, onDateChange]);
  const gestureHandler = useAnimatedGestureHandler({
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
        index.value = wrap(months.length, index.value - direction);
        const next = wrap(months.length, index.value + 2);
        const prev = wrap(months.length, index.value - 2);
        runOnJS(onChange)(index.value, next, prev);
        x.value = withTiming(startX + direction * width, {
          duration: 300
        });
      } else {
        x.value = withTiming(startX, {
          duration: 300
        });
      }
    }
  });
  const content = useMemo(() => {
    return months.map((_ref2, index) => {
      let {
        year,
        month
      } = _ref2;
      return /*#__PURE__*/React.createElement(Month, {
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
  const onChangeVisibleDate = useCallback(date => {
    goToDate(date);
    setYearMonthSelectionStep === null || setYearMonthSelectionStep === void 0 ? void 0 : setYearMonthSelectionStep(undefined);
  }, [goToDate, setYearMonthSelectionStep]);
  if (yearMonthSelectionStep) return /*#__PURE__*/React.createElement(YearMonthSelection, {
    onChange: onChangeVisibleDate,
    step: yearMonthSelectionStep,
    date: currentDate,
    selectedDate: date,
    goToYears: onGoToYears,
    locale: locale,
    setStep: setYearMonthSelectionStep
  });
  return /*#__PURE__*/React.createElement(PanGestureHandler, {
    onGestureEvent: gestureHandler
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: {
      width,
      flexDirection: 'row',
      flex: 1
    }
  }, content));
}

export default /*#__PURE__*/React.memo(Calendar);
//# sourceMappingURL=Calendar.js.map