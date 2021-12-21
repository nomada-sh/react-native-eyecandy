import React, { useCallback, useMemo, useRef } from 'react';
import { Dimensions, View } from 'react-native';

import Calendar from './Calendar';
import Years from './Years';
import BottomSheet from '../BottomSheetV2';
import Button from '../Button';

export interface DatePickerProps {
  date: Date; // = new Date();
  locale: string; // = 'en-US';
  onDateChange?: (date: Date) => void;
}

function DatePicker({ date, onDateChange, locale }: DatePickerProps) {
  const width = useRef(Dimensions.get('window').width).current;

  const [contentVisible, setContentVisible] = React.useState(false);
  const onClose = useCallback(() => setContentVisible(false), []);

  const [yearsVisible, setYearsVisible] = React.useState(false);

  const onPress = useCallback(() => {
    //setYearsVisible(false);
    setContentVisible(true);
  }, []);

  const onGoToYears = useCallback(() => {
    setYearsVisible(true);
  }, []);

  const onGoToMonths = useCallback(() => {}, []);

  const onPressYear = useCallback((year: number) => {
    setYearsVisible(false);
  }, []);

  const content = useMemo(() => {
    return (
      <Calendar
        width={width}
        locale={locale}
        date={date}
        onDateChange={onDateChange}
        onPressYear={onGoToYears}
        onPressMonth={onGoToMonths}
      />
    );
  }, [date, locale, onDateChange, onGoToMonths, onGoToYears, width]);

  const formattedDate = useMemo(
    () =>
      Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      }).format(date),
    [date, locale],
  );

  const year = useMemo(() => date.getFullYear(), [date]);

  return (
    <View>
      <Button onPress={onPress} text={formattedDate} />
      <BottomSheet height={410} visible={contentVisible} onClose={onClose}>
        {content}
        <View
          style={{
            padding: 10,
          }}
        >
          <Button color="primary" text="Done" onPress={onClose} />
        </View>
        {yearsVisible ? (
          <Years
            onPressYear={onPressYear}
            year={year}
            onPressBack={() => setYearsVisible(false)}
          />
        ) : null}
      </BottomSheet>
    </View>
  );
}

DatePicker.defaultProps = {
  date: new Date(),
  locale: 'en-US',
};

export default React.memo(DatePicker);
