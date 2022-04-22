import React, { useImperativeHandle, useState } from 'react';
import { TouchableWithoutFeedback, View, Pressable } from 'react-native';

import { ChevronDown, Plus } from '@nomada-sh/react-native-eyecandy-icons';

import { Body } from '../../typography';

import Picker from './Picker';
import { SelectHandle, SelectItem, SelectProps } from './types';
import useStyles from './useStyles';

const defaultIsSelected = (item: SelectItem, value?: any) => {
  return value === undefined ? false : item.value === value;
};

const defaultItems: SelectItem[] = [];

const Select = React.forwardRef<SelectHandle, SelectProps>(
  (
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
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);

    const focus = () => {
      setVisible(true);
      onFocus?.();
    };

    const blur = () => {
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
    const selectedItem =
      selectedItemIndex >= 0 ? items[selectedItemIndex] : null;

    const icon = Icon ? (
      React.isValidElement(Icon) ? (
        Icon
      ) : (
        <Icon size={styles.icon.fontSize} stroke={styles.icon.color} />
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

    const disabled = items.length === 0;
    const showClearIcon = !hideClearIcon && selectedItem !== null;

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
            <Pressable
              disabled={disabled}
              style={styles.select}
              onPress={focus}
            >
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
                  stroke={
                    visible ? styles.icon.color : styles.placeholder.color
                  }
                />
              </View>
            </TouchableWithoutFeedback>
          ) : null}
          <TouchableWithoutFeedback disabled={disabled} onPress={focus}>
            <View style={styles.iconContainer}>
              <ChevronDown
                size={styles.icon.fontSize}
                stroke={visible ? styles.icon.color : styles.placeholder.color}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </>
    );
  },
);

export default Select;
