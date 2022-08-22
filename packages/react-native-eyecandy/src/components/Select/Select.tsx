import React, { useImperativeHandle, useState } from 'react';
import { TouchableWithoutFeedback, View, Pressable } from 'react-native';

import { ChevronDown, Plus } from '@nomada-sh/react-native-eyecandy-icons';

import { Body } from '../../typography';

import { Picker } from './Picker';
import { SelectHandle, SelectItem, SelectProps } from './types';
import { useStyles } from './useStyles';

const defaultIsSelected = (item: SelectItem<any>, value?: any) => {
  return value === undefined ? false : item.value === value;
};

const defaultItems: SelectItem<any>[] = [];

function SelectBase<V>(
  {
    items = defaultItems,
    placeholder = 'Select an item...',
    emptyText = 'No items',
    onChange,
    value,
    color,
    icon: Icon,
    onFocus,
    onBlur,
    style,
    variant,
    isSelected = defaultIsSelected,
    closeOnSelect,
    modalTitle,
    marginBottom,
    marginTop,
    hideClearIcon,
  }: SelectProps<V>,
  ref: React.Ref<SelectHandle>,
) {
  const disabled = items.length === 0;
  const [visible, setVisible] = useState(false);

  const focus = () => {
    if (disabled) return;

    setVisible(true);
    onFocus?.();
  };

  const blur = () => {
    if (disabled) return;

    setVisible(false);
    onBlur?.();
  };

  useImperativeHandle(ref, () => ({
    focus,
    blur,
  }));

  const styles = useStyles({
    color,
    variant,
    focused: visible,
    removePaddingLeft: Icon !== undefined,
  });

  const selectedItemIndex = items.findIndex(item => isSelected(item, value));
  const selectedItem = selectedItemIndex >= 0 ? items[selectedItemIndex] : null;

  const showClearIcon = !hideClearIcon && selectedItem !== null;

  const icon = Icon ? (
    React.isValidElement(Icon) ? (
      Icon
    ) : (
      <Icon
        focused={visible}
        size={styles.icon.fontSize}
        color={styles.icon.color}
      />
    )
  ) : null;

  const text = items.length ? (
    selectedItem ? (
      <Body>{selectedItem.label}</Body>
    ) : (
      <Body color={styles.placeholder.color}>{placeholder}</Body>
    )
  ) : (
    <Body color={styles.placeholder.color}>{emptyText}</Body>
  );

  return (
    <>
      <Picker
        selectedItemIndex={selectedItemIndex}
        onClose={blur}
        visible={visible}
        items={items}
        isSelected={isSelected}
        value={value}
        title={modalTitle}
        onPress={(item, index) => {
          onChange?.(item.value, index);
          if (closeOnSelect) blur();
        }}
      />
      <View
        style={[
          styles.container,
          {
            marginTop,
            marginBottom,
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
          <Pressable disabled={disabled} style={styles.select} onPress={focus}>
            {text}
          </Pressable>
        </View>
        {showClearIcon ? (
          <TouchableWithoutFeedback
            onPress={() => {
              onChange?.(undefined, -1);
            }}
          >
            <View style={styles.iconContainer}>
              <Plus
                style={{
                  transform: [{ rotate: '45deg' }],
                }}
                size={styles.icon.fontSize}
                color={visible ? styles.icon.color : styles.placeholder.color}
              />
            </View>
          </TouchableWithoutFeedback>
        ) : null}
        <TouchableWithoutFeedback disabled={disabled} onPress={focus}>
          <View style={styles.iconContainer}>
            <ChevronDown
              size={styles.icon.fontSize}
              color={visible ? styles.icon.color : styles.placeholder.color}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

export const Select = React.forwardRef(SelectBase) as <V>(
  p: SelectProps<V> & { ref?: React.Ref<SelectHandle> },
) => JSX.Element;
