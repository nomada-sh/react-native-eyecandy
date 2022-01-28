import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import Calendar from './Calendar';
import BottomSheet from '../BottomSheetV2';
import Button from '../Button';
// TODO: Create Button with input styles.
import LinkButton from '../LinkButton';
import IconButton from '../IconButton';
import { CalendarEvent, ArrowLeft } from '@nomada-sh/react-native-eyecandy-icons';
import formatDate from './formatDate';
export interface DatePickerProps {
  date: Date; // = new Date();
  locale: string; // = 'en-US';
  onDateChange?: (date: Date) => void;
  disableCloseOnSelect?: boolean;
  doneText: string;
  backText: string;
  todayText: string;
}

function DatePicker({
  date,
  onDateChange,
  locale,
  disableCloseOnSelect,
  doneText,
  backText,
  todayText,
}: DatePickerProps) {
  // TODO: Listen to changes in width.
  const width = useRef(Dimensions.get('window').width).current;

  const [tab, setTab] = useState<'date' | 'time'>('date');

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

  const handleDateChange = useCallback(
    (date: Date) => {
      onDateChange?.(date);
      if (!disableCloseOnSelect) onClose();
    },
    [onDateChange, disableCloseOnSelect, onClose],
  );

  const content = useMemo(() => {
    return (
      <Calendar
        width={width}
        locale={locale}
        date={date}
        onDateChange={handleDateChange}
        onGoToYears={onGoToYears}
        onGoToMonths={onGoToMonths}
        yearMonthSelectionStep={yearMonthSelectionStep}
        setYearMonthSelectionStep={setYearMonthSelectionStep}
        todayText={todayText}
      />
    );
  }, [
    date,
    handleDateChange,
    locale,
    onGoToMonths,
    onGoToYears,
    todayText,
    width,
    yearMonthSelectionStep,
  ]);

  const formattedDate = useMemo(
    () => formatDate(date, 'PPP', locale),
    [date, locale],
  );

  const doneButtonText = useMemo(() => {
    return yearMonthSelectionStep ? backText : doneText;
  }, [backText, doneText, yearMonthSelectionStep]);

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
      <BottomSheet
        height={disableCloseOnSelect ? 410 : 350}
        visible={visible}
        onClose={onClose}
      >
        {/* {yearMonthSelectionStep === undefined ? (
          <View style={styles.tabsContainer}>
            <Button
              text="Date"
              color="primary"
              variant="rounded"
              fullwidth={false}
              style={styles.tab}
              onPress={() => setTab('date')}
            />
            <Button
              text="Time"
              variant="rounded"
              fullwidth={false}
              style={styles.tab}
              buttonStyle={styles.tabButton}
              onPress={() => setTab('time')}
            />
          </View>
        ) : null} */}
        {content}
        {disableCloseOnSelect ? (
          <View
            style={{
              padding: 10,
            }}
          >
            <Button
              color="primary"
              text={doneButtonText}
              onPress={onDonePress}
            />
          </View>
        ) : null}
      </BottomSheet>
    </View>
  );
}

DatePicker.defaultProps = {
  date: new Date(),
  locale: 'en-US',
  doneText: 'Done',
  backText: 'Back',
  todayText: 'Today',
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  tab: {
    flex: 1,
    height: 45,
    marginHorizontal: 10,
  },
  tabButton: {},
});

export default React.memo(DatePicker);
