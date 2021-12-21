import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Dimensions, View } from 'react-native';

import Calendar from './Calendar';
import BottomSheet from '../BottomSheetV2';
import Button from '../Button';

export interface DatePickerProps {
  date: Date; // = new Date();
  locale: string; // = 'en-US';
  onDateChange?: (date: Date) => void;
}

function DatePicker({ date, onDateChange, locale }: DatePickerProps) {
  const width = useRef(Dimensions.get('window').width).current;

  const [yearMonthSelectionStep, setYearMonthSelectionStep] = useState<
    'year' | 'month' | undefined
  >();

  const [visible, setVisible] = useState(false);
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onPress = useCallback(() => {
    //setYearsVisible(false);
    setVisible(true);
  }, []);

  const onGoToYears = useCallback(() => {
    setYearMonthSelectionStep('year');
  }, []);

  const onGoToMonths = useCallback(() => {
    setYearMonthSelectionStep('month');
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
        yearMonthSelectionStep={yearMonthSelectionStep}
      />
    );
  }, [
    date,
    locale,
    onDateChange,
    onGoToMonths,
    onGoToYears,
    width,
    yearMonthSelectionStep,
  ]);

  const formattedDate = useMemo(
    () =>
      Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      }).format(date),
    [date, locale],
  );

  const doneButtonText = useMemo(() => {
    return yearMonthSelectionStep ? 'Back' : 'Done';
  }, [yearMonthSelectionStep]);

  const onDonePress = useCallback(() => {
    if (yearMonthSelectionStep) setYearMonthSelectionStep(undefined);
    else setVisible(false);
  }, [yearMonthSelectionStep]);

  useEffect(() => {
    if (visible) setYearMonthSelectionStep(undefined);
  }, [visible]);

  return (
    <View>
      <Button onPress={onPress} text={formattedDate} />
      <BottomSheet height={410} visible={visible} onClose={onClose}>
        {content}
        <View
          style={{
            padding: 10,
          }}
        >
          <Button color="primary" text={doneButtonText} onPress={onDonePress} />
        </View>
      </BottomSheet>
    </View>
  );
}

DatePicker.defaultProps = {
  date: new Date(),
  locale: 'en-US',
};

export default React.memo(DatePicker);
