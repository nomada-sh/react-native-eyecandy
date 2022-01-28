import React, { useMemo } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import Header from '../Header';
import Actions from '../Actions';
import Days from '../Days';
import wrap from '../../wrap';

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
  const days = useMemo(() => getCalendar(year, month), [getCalendar, year, month]);
  const selectedDate = useMemo(() => ({
    year: selectedDateProp.getFullYear(),
    month: selectedDateProp.getMonth(),
    day: selectedDateProp.getDate()
  }), [selectedDateProp]);
  const date = useMemo(() => new Date(year, month), [month, year]);
  const style = useAnimatedStyle(() => {
    const newX = wrap(width * size, x.value) + index * width;
    let translateX = newX - width * (size + 1);
    if (newX >= 0 && newX <= width * size) translateX = newX - width;
    return {
      transform: [{
        translateX
      }]
    };
  }, [x, index, width]);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [{
      width,
      position: 'absolute'
    }, style],
    key: `${year}-${month}`
  }, /*#__PURE__*/React.createElement(Actions, {
    date: date,
    onPressYear: onPressYear,
    onPressMonth: onPressMonth,
    onPressToday: onPressToday,
    locale: locale,
    todayText: todayText
  }), /*#__PURE__*/React.createElement(Header, {
    locale: locale,
    month: month,
    year: year
  }), /*#__PURE__*/React.createElement(Days, {
    data: days,
    onDayPress: onPressDay,
    selectedDate: selectedDate,
    month: month,
    year: year
  }));
}

export default Month;
//# sourceMappingURL=Month.js.map