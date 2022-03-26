import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Platform, TouchableWithoutFeedback, View } from 'react-native';

import { ChevronDown } from '@nomada-sh/react-native-eyecandy-icons';
import SelectBase from 'react-native-picker-select';

import type { SelectProps } from './typings';
import useStyles from './useStyles';

function Select<ValueType>({
  items = [],
  onValueChange = () => {},
  value,
  color,
  icon: Icon,
  onFocus,
  onBlur,
  style,
  variant,
  pickerProps = {},
  placeholder: placeholderProp = 'Select an item...',
  androidItemSelectedColor = '#9ea0a4',
  ...props
}: SelectProps<ValueType>) {
  const placeholder = useMemo(() => {
    let placeholderColor =
      Platform.OS === 'android' ? androidItemSelectedColor : undefined;

    return {
      label: placeholderProp,
      value: null,
      color: placeholderColor,
    };
  }, [placeholderProp, androidItemSelectedColor]);

  const [focused, setFocused] = useState(false);
  const styles = useStyles({
    color,
    variant,
    value,
    focused,
    withPaddingStart: Icon === undefined,
  });

  const selectRef = useRef<any>(null);

  const openPicker = useCallback(() => {
    if (Platform.OS === 'android') {
      selectRef.current?.focus();
    } else {
      selectRef.current?.togglePicker(true);
    }
  }, []);

  const handleFocus = useCallback(() => {
    setFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setFocused(false);
    onBlur?.();
  }, [onBlur]);

  return (
    <View style={[styles.container, style]}>
      {Icon ? (
        <TouchableWithoutFeedback onPress={() => openPicker()}>
          <View style={styles.iconContainer}>
            <Icon size={styles.icon.fontSize} stroke={styles.icon.color} />
          </View>
        </TouchableWithoutFeedback>
      ) : null}
      <View style={styles.selectContainer}>
        <SelectBase
          ref={Platform.OS === 'android' ? undefined : selectRef}
          pickerProps={{
            ...pickerProps,
            // @ts-ignore
            ref: Platform.OS === 'android' ? selectRef : undefined,
            onFocus: handleFocus,
            onBlur: handleBlur,
          }}
          useNativeAndroidPickerStyle={false}
          style={{
            inputAndroid: styles.input,
            inputIOS: styles.input,
            placeholder: styles.placeholder,
          }}
          items={items}
          onValueChange={onValueChange}
          value={value}
          placeholder={placeholder}
          {...props}
        />
      </View>
      <TouchableWithoutFeedback onPress={() => openPicker()}>
        <View style={styles.iconContainer}>
          <ChevronDown
            size={styles.icon.fontSize}
            stroke={focused ? styles.icon.color : styles.placeholder.color}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default Select;
