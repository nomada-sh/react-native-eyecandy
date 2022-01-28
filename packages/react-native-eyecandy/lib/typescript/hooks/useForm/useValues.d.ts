/// <reference types="react" />
import type { Fields, Values, Name } from './types';
export default function useValues<T extends Fields>(fields: T): {
    values: Values<T>;
    setValue: (name: Name<T>, value: string) => void;
    setValues: import("react").Dispatch<import("react").SetStateAction<Values<T>>>;
    clearValues: () => void;
};
