import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Button from '../../../Button';
import { Body } from '../../../../typography';
import { useUpdateEffect } from 'react-use';
import formatDate from '../../formatDate';
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
  } = useMemo(() => {
    return {
      yearSelected: selectedDate.getFullYear(),
      monthSelected: selectedDate.getMonth()
    };
  }, [selectedDate]);
  const {
    yearNow,
    monthNow
  } = useMemo(() => {
    const now = new Date();
    return {
      yearNow: now.getFullYear(),
      monthNow: now.getMonth()
    };
  }, []);
  const {
    initialYear
  } = useMemo(() => {
    return {
      initialYear: visibleDate.getFullYear(),
      initialMonth: visibleDate.getMonth()
    };
  }, [visibleDate]);
  const [year, setYear] = useState(initialYear);
  const formatMonth = useCallback(month => {
    return formatDate(new Date(initialYear, month, 1), 'MMMM', locale);
  }, [locale, initialYear]);
  const initialYearIndexRef = useRef(0);
  const years = useMemo(() => {
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
  const months = useMemo(() => {
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
  useUpdateEffect(() => {
    setYear(initialYear);
  }, [initialYear]);
  if (step === 'year') return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(FlatList, {
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
      return /*#__PURE__*/React.createElement(View, {
        style: {
          flexDirection: 'row'
        }
      }, item.map(y => /*#__PURE__*/React.createElement(View, {
        key: y,
        style: styles.year
      }, /*#__PURE__*/React.createElement(Button, {
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
  if (step === 'month') return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.titleContainer
  }, /*#__PURE__*/React.createElement(Body, {
    onPress: goToYears,
    size: "xlarge",
    color: "primary",
    weight: "bold"
  }, year)), /*#__PURE__*/React.createElement(FlatList, {
    contentContainerStyle: styles.flatlist,
    data: months,
    keyExtractor: (_, index) => index.toString(),
    renderItem: _ref3 => {
      let {
        item
      } = _ref3;
      return /*#__PURE__*/React.createElement(View, {
        style: {
          flexDirection: 'row'
        }
      }, item.map(_ref4 => {
        let {
          month: m,
          name
        } = _ref4;
        return /*#__PURE__*/React.createElement(View, {
          key: name,
          style: styles.month
        }, /*#__PURE__*/React.createElement(Button, {
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
const styles = StyleSheet.create({
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
export default /*#__PURE__*/React.memo(YearMonthSelection);
//# sourceMappingURL=YearMonthSelection.js.map