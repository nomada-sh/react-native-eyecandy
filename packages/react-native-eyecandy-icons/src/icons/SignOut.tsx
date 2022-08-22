import React from 'react';

import { Path } from 'react-native-svg';

import { SvgIconContainer } from '../core';
import { SvgIconProps } from '../types';

const Icon = (props: SvgIconProps) => (
  <SvgIconContainer {...props}>
    <Path
      strokeWidth={1}
      d="M16.316 7.81c.067 0 .13.026.178.073l3.935 3.935a.26.26 0 0 1 0 .364l-3.93 3.931a.278.278 0 0 1-.187.075.25.25 0 0 1-.174-.429l.003-.002 2.653-2.653.854-.854H9.75a.25.25 0 1 1 0-.5h9.898l-.854-.854-2.653-2.653-.001-.001a.252.252 0 0 1 .176-.432ZM4 19.5v.5h5.75a.25.25 0 1 1 0 .5H4.5a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1h5.25a.25.25 0 0 1 0 .5H4v15.5Z"
    />
  </SvgIconContainer>
);

export const SignOut = React.memo(Icon);
