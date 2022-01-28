/// <reference types="react" />
export interface YearsProps {
    onPressBack?: () => void;
    year: number;
    maxYears: number;
    onPressYear: (year: number) => void;
}
declare function Years({ onPressBack, year, maxYears, onPressYear }: YearsProps): JSX.Element;
declare namespace Years {
    var defaultProps: {
        maxYears: number;
    };
}
export default Years;
