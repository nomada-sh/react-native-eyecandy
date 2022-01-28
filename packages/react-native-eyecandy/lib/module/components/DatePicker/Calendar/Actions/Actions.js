import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Body } from '../../../../typography';
import formatDate from '../../formatDate';

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
  } = useMemo(() => {
    return {
      month: formatDate(date, 'MMMM', locale),
      year: formatDate(date, 'yyyy', locale)
    };
  }, [date, locale]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.monthYearContainer
  }, /*#__PURE__*/React.createElement(Body, {
    style: [styles.text, {
      marginEnd: 0
    }],
    size: "xlarge",
    color: "primary",
    onPress: onPressMonth
  }, month), /*#__PURE__*/React.createElement(Body, {
    style: [styles.text, {
      marginStart: 0
    }],
    size: "xlarge",
    color: "primary",
    onPress: onPressYear
  }, year)), /*#__PURE__*/React.createElement(Body, {
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
const styles = StyleSheet.create({
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
export default Actions;
//# sourceMappingURL=Actions.js.map