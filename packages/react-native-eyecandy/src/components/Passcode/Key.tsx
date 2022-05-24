import React from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';

import { KeyValue, KeyValueProps } from './KeyValue';

export const DELETE_KEY_VALUE = '<';
export const EMPTY_KEY_VALUE = '';

export interface KeyProps {
  onPressIn: () => void;
  onPressOut: () => void;
  keyValue: string;
  KeyValueComponent?: React.ComponentType<KeyValueProps>;
  keyValueContainerStyle?: StyleProp<ViewStyle>;
  hideDeleteKey?: boolean;
  testID?: string;
}

export function Key({
  onPressIn: onPressInProp,
  onPressOut: onPressOutProp,
  keyValue,
  keyValueContainerStyle,
  KeyValueComponent = KeyValue,
  hideDeleteKey,
  testID,
}: KeyProps) {
  const [isPressed, setIsPressed] = React.useState(false);
  const isDeleteKey = keyValue === DELETE_KEY_VALUE;
  const isEmptyKey = keyValue === EMPTY_KEY_VALUE;

  const children =
    isEmptyKey || (isDeleteKey && hideDeleteKey) ? null : (
      <KeyValueComponent
        keyValue={keyValue}
        isDeleteKey={isDeleteKey}
        isPressed={isPressed}
      />
    );

  const onPressIn = () => {
    setIsPressed(true);
    onPressInProp();
  };

  const onPressOut = () => {
    setIsPressed(false);
    onPressOutProp();
  };

  const keyTestID = testID
    ? `${testID}-${isDeleteKey ? 'delete' : keyValue}`
    : undefined;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <Pressable
        testID={keyTestID}
        // onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={keyValueContainerStyle}
      >
        {children}
      </Pressable>
    </View>
  );
}
