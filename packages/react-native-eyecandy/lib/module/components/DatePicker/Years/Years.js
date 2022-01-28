import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Body } from '../../../typography';
import { useColors } from '@nomada-sh/react-native-eyecandy-theme';
import Button from '../../Button';

function Years(_ref) {
  let {
    onPressBack,
    year,
    maxYears,
    onPressYear
  } = _ref;
  const background = useColors(c => c.background.default);
  const years = useMemo(() => {
    const years = [];

    for (let i = year - maxYears; i <= year + maxYears; i++) {
      years.push(i);
    }

    return years;
  }, [maxYears, year]);
  return /*#__PURE__*/React.createElement(View, {
    style: [StyleSheet.absoluteFill, {
      backgroundColor: background.content
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: {
      margin: 16,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(Body, {
    onPress: onPressBack,
    color: "primary",
    weight: "bold"
  }, "Back")), /*#__PURE__*/React.createElement(ScrollView, {
    contentContainerStyle: {
      padding: 8,
      paddingTop: 0,
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    showsVerticalScrollIndicator: false
  }, years.map(y => /*#__PURE__*/React.createElement(View, {
    key: y,
    style: {
      width: '33%',
      padding: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onPress: () => onPressYear(y),
    buttonStyle: {
      height: 50
    },
    color: year === y ? 'primary' : 'default',
    text: y.toString()
  })))));
}

Years.defaultProps = {
  maxYears: 80
};
export default Years;
//# sourceMappingURL=Years.js.map