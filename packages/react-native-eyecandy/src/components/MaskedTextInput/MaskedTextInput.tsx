import React, { useImperativeHandle, useRef, useState } from 'react';
import { View, TextInput as RNTextInput } from 'react-native';

import { EyeCheck, EyeOff } from '@nomada-sh/react-native-eyecandy-icons';
import MaskInput from 'react-native-mask-input';

import {
  TextInputStyles,
  styles,
  IconTouchable,
  useSecureTextEntry,
  useStyles,
} from '../TextInput';

import { MaskedTextInputProps, MaskedTextInputHandle } from './types';

const DEFAULT_CUSTOM_STYLES: TextInputStyles = {};

const MaskedTextInput = React.forwardRef<
  MaskedTextInputHandle,
  MaskedTextInputProps
>((props, ref) => {
  const inputRef = useRef<RNTextInput>(null);
  const [focused, setFocused] = useState(false);

  const focus = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const blur = () => {
    if (inputRef.current) inputRef.current.blur();
  };

  const clear = () => {
    if (inputRef.current) inputRef.current.clear();
  };

  const isFocused = () => {
    if (inputRef.current) return inputRef.current.isFocused();
    return false;
  };

  useImperativeHandle(ref, () => ({
    focus,
    blur,
    clear,
    isFocused,
  }));

  const {
    styles: customStyles = DEFAULT_CUSTOM_STYLES,
    focusOnLeftIconPress = true,
    placeholder = '',
    style,
    onPressIconLeft,
    onPressIconRight,
    focusOnRightIconPress,
    iconLeft,
    iconRight,
    inputLeft,
    inputRight,
    showSecureTextEntryToggle,
    required,
    onFocus,
    onBlur,
    ...inputProps
  } = props;

  const dynamicStyles = useStyles({
    ...props,
    removeDefaultLeftPadding: iconLeft !== undefined,
    removeDefaultRightPadding:
      iconRight !== undefined || showSecureTextEntryToggle,
    focused,
  });

  const { secureTextEntry, onPressSecureTextEntryToggle } =
    useSecureTextEntry(props);

  const handlePressIconLeft = () => {
    if (onPressIconLeft) onPressIconLeft();
    if (focusOnLeftIconPress) focus();
  };

  const handlePressIconRight = () => {
    if (onPressIconRight) onPressIconRight();
    if (focusOnRightIconPress) focus();
  };

  return (
    <View
      style={[
        styles.container,
        dynamicStyles.container,
        customStyles.container,
        style,
      ]}
    >
      {/* Left Icon */}
      <IconTouchable
        focused={focused}
        onPress={handlePressIconLeft}
        style={[styles.leftIconContainer, customStyles.leftIconContainer]}
        icon={iconLeft}
        color={dynamicStyles.icon.color}
      />

      {/* Left Component */}
      {inputLeft}

      <MaskInput
        disableFullscreenUI
        placeholder={required ? `${placeholder} *` : placeholder}
        selectionColor={dynamicStyles.selection.color}
        placeholderTextColor={dynamicStyles.placeholder.color}
        style={[styles.input, dynamicStyles.input, customStyles.input]}
        {...inputProps}
        onFocus={e => {
          setFocused(true);
          if (onFocus) onFocus(e);
        }}
        onBlur={e => {
          setFocused(false);
          if (onBlur) onBlur(e);
        }}
        secureTextEntry={secureTextEntry}
        ref={inputRef}
      />

      {/* Right Component */}
      {inputRight}

      {/* Right Icon */}
      <IconTouchable
        focused={focused}
        onPress={handlePressIconRight}
        style={[styles.rightIconContainer, customStyles.rightIconContainer]}
        icon={iconRight}
        color={dynamicStyles.icon.color}
      />

      {/* Secure Text Entry Toggle */}
      {showSecureTextEntryToggle ? (
        <IconTouchable
          focused={focused}
          onPress={onPressSecureTextEntryToggle}
          style={[styles.rightIconContainer, customStyles.rightIconContainer]}
          icon={secureTextEntry ? EyeOff : EyeCheck}
          color={dynamicStyles.icon.color}
        />
      ) : null}
    </View>
  );
});

export default MaskedTextInput;
