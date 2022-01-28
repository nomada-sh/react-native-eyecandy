import type { Fields, InputProps, Name } from './types';
export default function useForm<T extends Fields>(initialFields: T): {
    errors: import("./types").Errors<T>;
    messages: import("./types").Messages<T>;
    values: import("./types").Values<T>;
    onChange: (name: Name<T>) => (value: string) => void;
    onSubmit: (handleSubmit: (v: import("./types").Values<T>) => void, extraValidation?: ((v: import("./types").Values<T>) => boolean) | undefined) => void;
    register: (name: Name<T>) => InputProps;
    clearErrors: () => void;
    clearValues: () => void;
    clear: () => void;
};
