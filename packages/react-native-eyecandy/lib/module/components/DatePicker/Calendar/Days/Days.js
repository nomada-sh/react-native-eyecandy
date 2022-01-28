import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Day from '../Day';

function Days(_ref) {
  let {
    debug,
    data = [],
    onDayPress,
    selectedDate,
    month,
    year
  } = _ref;
  const count = useRef(1);
  debug && console.log('DAYS', `${month}/${year},`, 'RENDER COUNT:', count.current++);
  const isDateSelected = useCallback(value => {
    if (!selectedDate) return false;
    const selected = selectedDate.year === value.year && selectedDate.month === value.month && selectedDate.day === value.day;
    return selected;
  }, [selectedDate]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, data.map((day, index) => {
    const selected = day ? isDateSelected(day) : false;
    return /*#__PURE__*/React.createElement(Day, {
      onPress: onDayPress,
      key: index,
      value: day,
      selected: selected
    });
  }));
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 40 * 6
  }
});
export default /*#__PURE__*/React.memo(Days);
//# sourceMappingURL=Days.js.map