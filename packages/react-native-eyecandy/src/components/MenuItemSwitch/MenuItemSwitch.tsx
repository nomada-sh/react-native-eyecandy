import React from 'react';
import { StyleSheet } from 'react-native';

import { Body } from '../../typography';
import BaseMenuItem, { BaseMenuItemProps } from '../BaseMenuItem';
import Switch from '../Switch';

export interface MenuItemSwitchProps
  extends Omit<BaseMenuItemProps, 'children'> {
  text?: string;
  textColor?: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
}

function MenuItemSwitch({
  textColor,
  text,
  value,
  onValueChange,
  ...props
}: MenuItemSwitchProps) {
  return (
    <BaseMenuItem {...props}>
      <Body
        style={styles.text}
        weight="bold"
        size="medium"
        customColor={textColor}
      >
        {text}
      </Body>
      <Switch value={value} onValueChange={onValueChange} />
    </BaseMenuItem>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
});

export default MenuItemSwitch;
