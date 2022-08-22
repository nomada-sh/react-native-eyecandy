import React, { memo } from 'react';

import { Path } from 'react-native-svg';
import { SvgIconContainer } from '../core';
import { SvgIconProps } from '../types';

const Icon = (props: SvgIconProps) => (
  <SvgIconContainer {...props}>
    <Path
      d="M5 12h14M5 12l6 6m-6-6 6-6"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SvgIconContainer>
);

export const ArrowLeft = memo(Icon);
