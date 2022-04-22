import React from 'react';
import { FlatList, Modal, TouchableWithoutFeedback, View } from 'react-native';

import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';
import Color from 'color';

import { Body } from '../../typography';
import MenuItemBase from '../MenuItemBase';

import { PickerProps } from './types';

const ITEM_HEIGHT = 45;

export default function Picker({
  visible,
  onClose,
  items,
  isSelected,
  value,
  onPress,
  title,
  selectedItemIndex,
}: PickerProps) {
  const { colors, palette } = useTheme();

  const backgroundColor = colors.background.default.container;
  const selectedBackgroundColor = Color(palette.primary[500])
    .alpha(0.1)
    .string();

  const flatListRef = React.useRef<FlatList<any>>(null);

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
                maxHeight: '60%',
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
                getItemLayout={(data, index) => ({
                  length: ITEM_HEIGHT,
                  offset: ITEM_HEIGHT * index,
                  index,
                })}
                ref={flatListRef}
                contentContainerStyle={{
                  paddingTop: title ? 0 : 20,
                  paddingBottom: 20,
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
