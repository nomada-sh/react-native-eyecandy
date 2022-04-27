import React from 'react';
import { StyleSheet } from 'react-native';

import { Body } from '../../typography';
import MenuItemBase, { MenuItemBaseProps } from '../MenuItemBase';
import Switch from '../Switch';

export interface MenuItemSwitchProps
  extends Omit<MenuItemBaseProps, 'children'> {
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
    <MenuItemBase {...props}>
      <Body style={styles.text} weight="bold" size="medium" color={textColor}>
        {text}
      </Body>
      <Switch value={value} onValueChange={onValueChange} />
    </MenuItemBase>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
});

export default MenuItemSwitch;
