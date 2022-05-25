import React, { useRef } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import RNHapticFeedback from 'react-native-haptic-feedback';

import { KeyProps } from './Key';
import { DELETE_KEY_VALUE, EMPTY_KEY_VALUE, KeyInjector } from './KeyInjector';

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
  KeyComponent?: React.ComponentType<KeyProps>;
  hideDeleteKey?: boolean;
  emptyKeyValue?: string;
  deleteKeyValue?: string;
  testID?: string;
}

export default function Passcode({
  value,
  onChange,
  style,
  KeyComponent,
  hideDeleteKey,
  emptyKeyValue,
  deleteKeyValue,
  testID,
}: PasscodeProps) {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const valueRef = useRef(value);
  if (valueRef.current !== value) valueRef.current = value;

  const onPress = (keyValue: string) => {
    RNHapticFeedback.trigger('impactMedium');

    const shouldDelete =
      keyValue === DELETE_KEY_VALUE && deleteKeyValue === undefined;

    onChange(
      shouldDelete
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
            <KeyInjector
              testIDPrefix={testID ? `${testID}-key` : undefined}
              key={j}
              keyValue={keyValue}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              KeyComponent={KeyComponent}
              hideDeleteKey={hideDeleteKey}
              emptyKeyValue={emptyKeyValue}
              deleteKeyValue={deleteKeyValue}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
