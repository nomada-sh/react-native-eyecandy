import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';

import { Body } from '../../../../typography';

export interface YearMonthSelectionProps {
  step?: 'year' | 'month';
  onPressYear?: (year: number) => void;
  onPressMonth?: (month: number) => void;
  locale: string;
  date: Date;
}

const YEARS = 50;

function YearMonthSelection({ step, date, locale }: YearMonthSelectionProps) {
  const { year, month } = useMemo(() => {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  }, [date]);

  const formatMonth = useCallback(
    (month: number) => {
      return new Intl.DateTimeFormat([locale, 'en-US'], {
        month: 'long',
      }).format(new Date(year, month, 1));
    },
    [locale, year],
  );

  const years = useMemo(() => {
    const years = [];
    for (let i = year - YEARS; i <= year + YEARS; i++) years.push(i);
    return years;
  }, [year]);

  const months = useMemo(() => {
    const months = [];
    for (let i = 0; i < 12; i++) months.push(formatMonth(i));
    return months;
  }, [formatMonth]);

  if (step === 'year') return <Body>{year}</Body>;

  if (step === 'month') return <Body>{formatMonth(month)}</Body>;

  return null;
}

YearMonthSelection.defaultProps = {
  locale: 'en-US',
};

export default React.memo(YearMonthSelection);
