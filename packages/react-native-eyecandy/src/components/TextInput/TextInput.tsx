import React from 'react';
import {
  TextInput as TextInputBase,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import TextInputErrors from '../TextInputErrors';
import { EyeCheck, EyeOff } from '@nomada-sh/react-native-eyecandy-icons';

import type { TextInputProps } from './typings';
import useStyles from './useStyles';
import useTextInput from './useTextInput';

export default function TextInput({
  startIcon: StartIcon,
  endIcon: EndIcon,
  onPressAction,
  style,
  inputStyle,
  secureTextEntry: secureTextEntryProp,
  showSecureTextEntryToggle,
  onSecureTextEntryChange = () => {},
  color = 'default',
  value,
  defaultValue,
  onFocus: onFocus,
  onBlur: onBlur,
  inputRef: inputRefProp,
  error,
  errors,
  required,
  fullWidth,
  placeholder: placeholderProp,
  ...props
}: TextInputProps) {
  const {
    inputRef,
    focused,
    handleBlur,
    handleFocus,
    onPressIcon,
    onPressSecureTextEntryToggle,
    secureTextEntry,
    hasError,
    placeholder,
  } = useTextInput({
    onBlur,
    onFocus,
    onSecureTextEntryChange,
    secureTextEntry: secureTextEntryProp,
    inputRef: inputRefProp,
    error,
    errors,
    required,
    placeholder: placeholderProp,
  });

  const { styles, keyboardAppearance, renderIcon } = useStyles({
    color,
    focused,
    widthPaddingStart: StartIcon === undefined,
    widthPaddingEnd: !showSecureTextEntryToggle && EndIcon === undefined,
    value: value ?? defaultValue,
    hasError,
    fullWidth,
  });

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.inputContainer]}>
        {StartIcon ? (
          <TouchableWithoutFeedback onPress={() => onPressIcon()}>
            <View style={styles.iconContainer}>{renderIcon(StartIcon)}</View>
          </TouchableWithoutFeedback>
        ) : null}
        <TextInputBase
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          ref={inputRef}
          placeholderTextColor={styles.inputPlaceholder.color}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          style={[styles.input, inputStyle]}
          keyboardAppearance={keyboardAppearance}
          disableFullscreenUI
          {...props}
        />
        {EndIcon ? (
          <TouchableWithoutFeedback onPress={() => onPressAction?.()}>
            <View style={styles.iconContainer}>{renderIcon(EndIcon)}</View>
          </TouchableWithoutFeedback>
        ) : null}
        {showSecureTextEntryToggle ? (
          <TouchableWithoutFeedback
            onPress={() => onPressSecureTextEntryToggle()}>
            <View style={styles.iconContainer}>
              {renderIcon(
                secureTextEntry ? EyeOff : EyeCheck,
                styles.inputPlaceholder.color,
              )}
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </View>
      <TextInputErrors error={error} errors={errors} />
    </View>
  );
}
