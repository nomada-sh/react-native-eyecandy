declare type ValidateFunction = (value: string) => boolean;
export declare type ValidationIsOptions = 'number' | 'email';
export declare type ValidationType = Function | number | string | ValidationIsOptions;
export declare type MessageType<T extends ValidationType> = string | ((value: T) => string);
export declare type ValidationPair<T extends ValidationType> = [T, MessageType<T>];
export declare type Validation<T extends ValidationType> = T | ValidationPair<T>;
export declare type Field = {
    initialValue?: string;
    onChange?: (value: string) => void;
    validate?: ValidateFunction | [ValidateFunction, string];
    required?: boolean | string;
    maxLength?: Validation<number>;
    minLength?: Validation<number>;
    is?: Validation<ValidationIsOptions>;
};
export declare type Fields = Record<string, Field | string>;
export declare type Error = Partial<{
    required: boolean;
    maxLength: boolean;
    minLength: boolean;
    validate: boolean;
    is: boolean;
}>;
export declare type Message = Partial<Record<keyof Error, string>>;
export declare type InputProps = {
    onChangeText: (value: string) => void;
    value: string;
    maxLength?: number;
    errors?: [boolean, string][];
    required?: boolean;
};
export declare type Name<T extends Fields> = keyof T;
export declare type Values<T extends Fields> = Record<keyof T, string>;
export declare type Errors<T extends Fields> = Record<keyof T, Error>;
export declare type Messages<T extends Fields> = Record<keyof T, Message>;
export {};
