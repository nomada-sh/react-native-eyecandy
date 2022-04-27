import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Search, Filter } from '@nomada-sh/react-native-eyecandy-icons';

import Button from '../Button';
import TextInput, { TextInputProps } from '../TextInput';

export interface SearchBarProps
  extends Omit<TextInputProps, 'onPressIconRight'> {
  cancelButtonText?: string;
  onPressCancel?: () => void;
  onPressFilter?: TextInputProps['onPressIconRight'];
}

function SearchBar({
  style,
  value,
  cancelButtonText = 'Cancel',
  onPressCancel,
  onPressFilter,
  onFocus,
  onBlur,
  onChangeText,
  marginBottom,
  marginTop,
  ...props
}: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  const [cancelButtonVisible, setCancelButtonVisible] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          marginBottom,
          marginTop,
        },
        style,
      ]}
    >
      <TextInput
        fullWidth={false}
        onFocus={e => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={e => {
          setFocused(false);
          onBlur?.(e);
        }}
        onChangeText={text => {
          setCancelButtonVisible(text.length > 0);
          onChangeText?.(text);
        }}
        value={value}
        iconLeft={Search}
        iconRight={Filter}
        onPressIconRight={onPressFilter}
        style={[
          styles.inputContainer,
          {
            marginEnd: cancelButtonVisible ? 8 : 0,
          },
        ]}
        {...props}
      />
      {focused && cancelButtonVisible ? (
        <Button
          fullwidth={false}
          color="primary"
          inverse
          text={cancelButtonText}
          pressableStyle={styles.cancelButton}
          onPress={() => onPressCancel?.()}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
  },
});

export default SearchBar;
