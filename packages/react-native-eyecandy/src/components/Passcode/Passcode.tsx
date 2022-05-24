import React, { useRef } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { Backspace } from '@nomada-sh/react-native-eyecandy-icons';

import { Body } from '../../typography';
import ButtonBase from '../ButtonBase';

export const DELETE_KEY_VALUE = '<';
export const EMPTY_KEY_VALUE = '';

const REPEAT_TIMEOUT = 180;

interface KeyValueProps {
  keyValue: string;
  onPressIn: () => void;
  onPressOut: () => void;
  isDeleteKey?: boolean;
}

function KeyValue({ keyValue, isDeleteKey, ...props }: KeyValueProps) {
  return (
    <ButtonBase
      style={{
        borderRadius: 40,
        margin: 4,
        height: 80,
        width: 80,
      }}
      fullwidth={false}
      {...props}
    >
      {isDeleteKey ? (
        <Backspace
          style={{
            transform: [{ translateX: -1 }],
          }}
        />
      ) : (
        <Body size="large" weight="bold">
          {keyValue}
        </Body>
      )}
    </ButtonBase>
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
  hideDeleteKey?: boolean;
  testID?: string;
}

function Key({
  onPressIn,
  onPressOut,
  keyValue,
  KeyValueComponent = KeyValue,
  keyValueContainerStyle,
  hideDeleteKey,
  testID,
}: KeyProps) {
  const isDeleteKey = keyValue === DELETE_KEY_VALUE;
  const isEmptyKey = keyValue === EMPTY_KEY_VALUE;

  let children: React.ReactNode = null;

  if (isEmptyKey || (isDeleteKey && hideDeleteKey)) children = null;
  else if (React.isValidElement(KeyValueComponent)) {
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
      isDeleteKey,
    });
  } else {
    children = (
      <KeyValueComponent
        keyValue={keyValue}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        isDeleteKey={isDeleteKey}
      />
    );
  }

  return (
    <View
      testID={
        testID ? `${testID}-${isDeleteKey ? 'delete' : keyValue}` : undefined
      }
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
  hideDeleteKey?: boolean;
  testID?: string;
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
  hideDeleteKey,
  testID,
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
    <View style={style} testID={testID}>
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
              hideDeleteKey={hideDeleteKey}
              testID={testID ? `${testID}-key` : undefined}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
