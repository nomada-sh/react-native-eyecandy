type ValidateFunction = (value: string) => boolean;

export type ValidationIsOptions = 'number' | 'email';

// eslint-disable-next-line @typescript-eslint/ban-types
export type ValidationType = Function | number | string | ValidationIsOptions;
export type MessageType<T extends ValidationType> =
  | string
  | ((value: T) => string);

export type ValidationPair<T extends ValidationType> = [T, MessageType<T>];
export type Validation<T extends ValidationType> = T | ValidationPair<T>;

export type Field = {
  initialValue?: string;
  onChange?: (value: string) => void;
  validate?: ValidateFunction | [ValidateFunction, string];
  required?: boolean | string;
  maxLength?: Validation<number>;
  minLength?: Validation<number>;
  is?: Validation<ValidationIsOptions>;
};

export type Fields = Record<string, Field | string>;

export type Error = Partial<{
  required: boolean;
  maxLength: boolean;
  minLength: boolean;
  validate: boolean;
  is: boolean;
}>;

export type Message = Partial<Record<keyof Error, string>>;

export type InputProps = {
  onChangeText: (value: string) => void;
  value: string;
  maxLength?: number;
  errors?: [boolean, string][];
  required?: boolean;
};

export type Name<T extends Fields> = keyof T;
export type Values<T extends Fields> = Record<keyof T, string>;
export type Errors<T extends Fields> = Record<keyof T, Error>;
export type Messages<T extends Fields> = Record<keyof T, Message>;
