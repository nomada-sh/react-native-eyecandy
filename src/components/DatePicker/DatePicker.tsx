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
// TODO: Create Button with input styles.
import LinkButton from '../LinkButton';
import { CalendarEvent } from '../../icons';

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
        onGoToYears={onGoToYears}
        onGoToMonths={onGoToMonths}
        yearMonthSelectionStep={yearMonthSelectionStep}
        setYearMonthSelectionStep={setYearMonthSelectionStep}
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
      <LinkButton
        icon={CalendarEvent}
        onPress={onPress}
        text={formattedDate}
        showChevron={false}
        bold
        focused={visible}
      />
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
