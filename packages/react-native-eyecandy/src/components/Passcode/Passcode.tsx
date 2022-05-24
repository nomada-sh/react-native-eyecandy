import React, { useRef } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import Button from '../Button';

const DELETE_KEY_VALUE = '<';
const EMPTY_KEY_VALUE = '';

const REPEAT_TIMEOUT = 180;

interface KeyValueProps {
  keyValue: string;
  onPressIn: () => void;
  onPressOut: () => void;
}

function KeyValue({ keyValue, ...props }: KeyValueProps) {
  const empty = keyValue === EMPTY_KEY_VALUE;

  return (
    <Button
      style={{
        opacity: empty ? 0 : 1,
        borderRadius: 40,
        margin: 4,
        height: 80,
        width: 80,
      }}
      fullwidth={false}
      {...props}
    >
      {keyValue}
    </Button>
  );
}

interface KeyProps {
  onPressIn: () => void;
  onPressOut: () => void;
  keyValue: string;
  KeyValueComponent?:
    | React.ComponentType<KeyValueProps>
    | React.ReactElement<KeyValueProps>;
  keyValueContainerStyle?: StyleProp<ViewStyle>;
}

function Key({
  onPressIn,
  onPressOut,
  keyValue,
  KeyValueComponent = KeyValue,
  keyValueContainerStyle,
}: KeyProps) {
  let children: React.ReactNode = null;

  if (React.isValidElement(KeyValueComponent)) {
    const keyValueProps = React.Children.only(KeyValueComponent).props;

    children = React.cloneElement(KeyValueComponent, {
      onPressIn: () => {
        onPressIn();
        keyValueProps.onPressIn();
      },
      onPressOut: () => {
        onPressOut();
        keyValueProps.onPressOut();
      },
      keyValue,
    });
  } else {
    children = (
      <KeyValueComponent
        {...{
          keyValue,
          onPressIn,
          onPressOut,
        }}
      />
    );
  }

  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: 'center',
        },
        keyValueContainerStyle,
      ]}
    >
      {children}
    </View>
  );
}

export interface PasscodeProps {
  value: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  KeyValueComponent?: React.ComponentType<KeyValueProps> | React.ReactElement;
  keyValueContainerStyle?: StyleProp<ViewStyle>;
}

const keyValues = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  [EMPTY_KEY_VALUE, '0', DELETE_KEY_VALUE],
];

export default function Passcode({
  value,
  onChange,
  style,
  KeyValueComponent,
  keyValueContainerStyle,
}: PasscodeProps) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const valueRef = useRef(value);
  if (valueRef.current !== value) valueRef.current = value;

  const onPressIn = (keyValue: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    onChange(
      keyValue === DELETE_KEY_VALUE
        ? valueRef.current.slice(0, -1)
        : valueRef.current + keyValue,
    );

    timeoutRef.current = setTimeout(() => {
      onPressIn(keyValue);
    }, REPEAT_TIMEOUT);
  };

  const onPressOut = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = undefined;
  };

  return (
    <View style={style}>
      {keyValues.map((row, i) => (
        <View
          key={i}
          style={{
            flexDirection: 'row',
          }}
        >
          {row.map((keyValue, j) => (
            <Key
              key={j}
              keyValue={keyValue}
              onPressIn={() => onPressIn(keyValue)}
              onPressOut={onPressOut}
              KeyValueComponent={KeyValueComponent}
              keyValueContainerStyle={keyValueContainerStyle}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
