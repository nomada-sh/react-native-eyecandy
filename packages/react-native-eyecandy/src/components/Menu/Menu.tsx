import React from 'react';
import { View, ViewProps } from 'react-native';

export interface MenuProps extends ViewProps {}

function Menu(props: MenuProps) {
  return <View {...props} />;
}

export default Menu;
