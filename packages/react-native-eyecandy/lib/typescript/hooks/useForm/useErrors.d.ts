/// <reference types="react" />
import type { Fields, Errors, Error, Name } from './types';
export default function useErrors<T extends Fields>(fields: T): {
    errors: Errors<T>;
    setErrors: import("react").Dispatch<import("react").SetStateAction<Errors<T>>>;
    setError: (name: Name<T>, error: Error) => void;
    clearErrors: () => void;
    validate: (name: Name<T>, value: string) => Partial<{
        required: boolean;
        maxLength: boolean;
        minLength: boolean;
        validate: boolean;
        is: boolean;
    }>;
};
