import React from 'react';
import {
  RefreshControl as RefreshControlBase,
  RefreshControlProps as RefreshControlBaseProps,
} from 'react-native';
import { useTheme } from '@nomada-sh/react-native-eyecandy-theme';

export interface RefreshControlProps extends RefreshControlBaseProps {}

function RefreshControl(props: RefreshControlProps) {
  const { palette } = useTheme();

  return (
    <RefreshControlBase
      progressBackgroundColor={palette.white}
      colors={[palette.primary[500]]}
      tintColor={palette.primary[500]}
      {...props}
    />
  );
}

export default RefreshControl;
