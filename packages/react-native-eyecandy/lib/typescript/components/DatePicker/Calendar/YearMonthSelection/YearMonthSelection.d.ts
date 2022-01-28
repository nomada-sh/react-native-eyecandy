import React from 'react';
export interface YearMonthSelectionProps {
    step?: 'year' | 'month';
    onChange?: (date: Date) => void;
    goToYears?: () => void;
    locale: string;
    date: Date;
    selectedDate: Date;
    setStep?: (step: 'year' | 'month' | undefined) => void;
}
declare function YearMonthSelection({ step, date: visibleDate, locale, onChange, goToYears, selectedDate, setStep, }: YearMonthSelectionProps): JSX.Element | null;
declare namespace YearMonthSelection {
    var defaultProps: {
        locale: string;
    };
}
declare const _default: React.MemoExoticComponent<typeof YearMonthSelection>;
export default _default;
