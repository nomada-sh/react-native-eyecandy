import React, { useRef } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import RNHapticFeedback from 'react-native-haptic-feedback';

import { DELETE_KEY_VALUE, EMPTY_KEY_VALUE, Key } from './Key';
import { KeyValueProps } from './KeyValue';

const REPEAT_TIMEOUT = 180;

const KEY_VALUES = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  [EMPTY_KEY_VALUE, '0', DELETE_KEY_VALUE],
];
export interface PasscodeProps {
  value: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  KeyValueComponent?: React.ComponentType<KeyValueProps>;
  keyValueContainerStyle?: StyleProp<ViewStyle>;
  hideDeleteKey?: boolean;
  testID?: string;
}

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

  const onPress = (keyValue: string) => {
    RNHapticFeedback.trigger('impactMedium');

    onChange(
      keyValue === DELETE_KEY_VALUE
        ? valueRef.current.slice(0, -1)
        : valueRef.current + keyValue,
    );
  };

  const onPressIn = (keyValue: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    onPress(keyValue);

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
      {KEY_VALUES.map((row, i) => (
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
              onPressIn={onPressIn}
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
