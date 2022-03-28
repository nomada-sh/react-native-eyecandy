import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Search, Filter } from '@nomada-sh/react-native-eyecandy-icons';

import Button from '../Button';
import TextInput, { TextInputProps } from '../TextInput';

export interface SearchInputProps
  extends Omit<TextInputProps, 'onPressAction'> {
  cancelButtonText?: string;
  onPressCancel?: () => void;
  onPressFilter?: TextInputProps['onPressAction'];
}

function SearchInput({
  style,
  value,
  cancelButtonText = 'Cancel',
  onPressCancel,
  onPressFilter,
  onFocus,
  onBlur,
  ...props
}: SearchInputProps) {
  const [focused, setFocused] = useState(false);
  const shouldRenderCancelButton = focused && value && value.length > 0;

  return (
    <View style={[styles.container, style]}>
      <TextInput
        onFocus={e => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={e => {
          setFocused(false);
          onBlur?.(e);
        }}
        value={value}
        startIcon={Search}
        endIcon={Filter}
        onPressAction={onPressFilter}
        style={[
          styles.inputContainer,
          {
            marginEnd: shouldRenderCancelButton ? 8 : 0,
          },
        ]}
        {...props}
      />
      {shouldRenderCancelButton ? (
        <Button
          fullwidth={false}
          color="primary"
          inverse
          text={cancelButtonText}
          buttonStyle={styles.cancelButton}
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

export default SearchInput;
