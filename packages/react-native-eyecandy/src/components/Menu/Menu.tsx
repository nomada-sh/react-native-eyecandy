import React from 'react';
import { View, ViewProps } from 'react-native';

import { Body } from '../../typography';

export interface MenuProps extends ViewProps {
  title?: string;
}

function Menu({ title, children, ...props }: MenuProps) {
  return (
    <View {...props}>
      {title ? (
        <Body
          style={{ padding: 20, paddingBottom: 10 }}
          weight="bold"
          size="large"
        >
          {title}
        </Body>
      ) : null}
      {children}
    </View>
  );
}

export default Menu;
