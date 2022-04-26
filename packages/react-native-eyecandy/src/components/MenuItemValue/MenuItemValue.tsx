import React from 'react';
import { StyleSheet } from 'react-native';

import { Body } from '../../typography';
import MenuItemBase, { MenuItemBaseProps } from '../MenuItemBase';

export interface MenuItemValueProps
  extends Omit<MenuItemBaseProps, 'children'> {
  text?: string;
  value?: string;
  textColor?: string;
  valueColor?: string;
}

function MenuItemValue({
  textColor,
  text,
  value,
  valueColor,
  ...props
}: MenuItemValueProps) {
  return (
    <MenuItemBase {...props}>
      <Body style={styles.text} weight="bold" size="medium" color={textColor}>
        {text}
      </Body>
      <Body
        size="medium"
        color={valueColor !== undefined ? valueColor : 'greyout'}
      >
        {value}
      </Body>
    </MenuItemBase>
  );
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
});

export default MenuItemValue;
