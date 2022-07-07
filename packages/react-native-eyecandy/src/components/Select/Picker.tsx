import React from 'react';
import {
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import Color from 'color';

import { Body } from '../../typography';
import MenuItemBase from '../MenuItemBase';

import { PickerProps } from './types';

const ITEM_HEIGHT = 45;

// TODO: Improve FlatList.

export function Picker<V>({
  visible,
  onClose,
  items,
  isSelected,
  value,
  onPress,
  title,
  selectedItemIndex,
}: PickerProps<V>) {
  const { height: windowHeight } = useWindowDimensions();
  const { colors, palette } = useTheme();

  const backgroundColor = colors.background.default.container;
  const selectedBackgroundColor = Color(palette.primary[500])
    .alpha(0.1)
    .string();

  const flatListRef = React.useRef<FlatList<any>>(null);

  const paddingTop = title ? 0 : 20;
  const paddingBottom = 20;
  let maxHeight = windowHeight * 0.6;
  const visibleItems = Math.floor((maxHeight - paddingTop) / ITEM_HEIGHT) + 0.6;
  maxHeight = visibleItems * ITEM_HEIGHT + paddingTop;

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      onRequestClose={onClose}
      animationType="fade"
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                width: '90%',
                maxHeight,
                overflow: 'hidden',
                backgroundColor: colors.background.default.container,
                borderRadius: 12,
              }}
            >
              {title ? (
                <Body
                  color="greyout"
                  weight="bold"
                  style={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    paddingBottom: 10,
                  }}
                >
                  {title}
                </Body>
              ) : null}
              <FlatList
                initialScrollIndex={
                  selectedItemIndex >= 0 ? selectedItemIndex : undefined
                }
                getItemLayout={(_, index) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })}
                ref={flatListRef}
                contentContainerStyle={{
                  paddingTop,
                  paddingBottom,
                }}
                data={items}
                keyExtractor={(item, index) => item.key || index.toString()}
                renderItem={({ item, index }) => {
                  const selected = isSelected(item, value);
                  const Icon = item.icon;

                  const icon = Icon ? (
                    React.isValidElement(Icon) ? (
                      Icon
                    ) : (
                      <Icon color={selected ? 'primary' : 'default'} />
                    )
                  ) : null;

                  return (
                    <MenuItemBase
                      onPress={() => {
                        onPress(item, index);
                      }}
                      style={{
                        height: ITEM_HEIGHT,
                        backgroundColor: selected
                          ? selectedBackgroundColor
                          : backgroundColor,
                      }}
                    >
                      {icon}
                      <Body
                        style={{
                          marginLeft: icon ? 10 : 0,
                          flex: 1,
                        }}
                        color={selected ? 'primary' : 'default'}
                      >
                        {item.label}
                      </Body>
                    </MenuItemBase>
                  );
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
