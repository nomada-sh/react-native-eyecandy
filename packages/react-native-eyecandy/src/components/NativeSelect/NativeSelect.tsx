import React, { useImperativeHandle, useRef, useState } from 'react';
import { Platform, TouchableWithoutFeedback, View } from 'react-native';

import { ChevronDown } from '@nomada-sh/react-native-eyecandy-icons';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import SelectBase from 'react-native-picker-select';

import type {
  NativeSelectHandle,
  NativeSelectItem,
  NativeSelectProps,
} from './types';
import useStyles from './useStyles';

const defaultItems: NativeSelectItem<any>[] = [];

function NativeSelect<V>(
  {
    items = defaultItems,
    onChange,
    value,
    color,
    icon: Icon,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    style,
    variant,
    emptyText = 'No items',
    marginBottom,
    marginTop,
    placeholder = 'Select an item...',
    dark: darkProp,
  }: NativeSelectProps<V>,
  ref: React.Ref<NativeSelectHandle>,
) {
  const disabled = items.length === 0;
  const androidItemSelectedColor = '#9ea0a4';

  const placeholderItem = {
    label: items.length === 0 ? emptyText : placeholder,
    value: undefined,
    color: Platform.OS === 'android' ? androidItemSelectedColor : undefined,
  };

  const [focused, setFocused] = useState(false);
  const { dark } = useTheme();
  const styles = useStyles({
    color,
    variant,
    focused,
    removePaddingLeft: Icon !== undefined,
  });

  const selectRef = useRef<any>(null);

  const focus = () => {
    if (disabled) return;

    if (Platform.OS === 'android') {
      selectRef.current?.focus();
    } else {
      selectRef.current?.togglePicker(true);
    }
  };

  const onFocus = () => {
    setFocused(true);
    onFocusProp?.();
  };

  const onBlur = () => {
    setFocused(false);
    onBlurProp?.();
  };

  useImperativeHandle(ref, () => ({
    focus,
  }));

  const icon = Icon ? (
    React.isValidElement(Icon) ? (
      Icon
    ) : (
      <Icon
        focused={focused}
        size={styles.icon.fontSize}
        stroke={styles.icon.color}
      />
    )
  ) : null;

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
      {icon ? (
        <TouchableWithoutFeedback disabled={disabled} onPress={focus}>
          <View style={styles.iconContainer}>{icon}</View>
        </TouchableWithoutFeedback>
      ) : null}
      <View style={styles.selectContainer}>
        <SelectBase
          disabled={disabled}
          ref={Platform.OS === 'android' ? undefined : selectRef}
          pickerProps={{
            // @ts-ignore
            ref: Platform.OS === 'android' ? selectRef : undefined,
            onFocus,
            onBlur,
          }}
          useNativeAndroidPickerStyle={false}
          style={{
            inputAndroid: styles.select,
            inputIOS: styles.select,
            placeholder: styles.placeholder,
            chevronUp: {
              display: 'none',
            },
            chevronDown: {
              display: 'none',
            },
          }}
          items={items}
          onValueChange={(value, index) => {
            onChange && onChange(value, index);
          }}
          value={value}
          placeholder={placeholderItem}
          darkTheme={darkProp !== undefined ? darkProp : dark}
        />
      </View>
      <TouchableWithoutFeedback disabled={disabled} onPress={focus}>
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

export default React.forwardRef(NativeSelect) as <V>(
  p: NativeSelectProps<V> & { ref?: React.Ref<NativeSelectHandle> },
) => JSX.Element;
