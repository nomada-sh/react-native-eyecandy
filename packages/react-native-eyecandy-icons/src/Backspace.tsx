import React from 'react';

import { Path } from 'react-native-svg';

import Icon, { IconProps } from './Icon';

const Backspace = (props: IconProps) => (
  <Icon {...props}>
    <Path d="m17 9-6 6m6 0-6-6 6 6Z" strokeWidth={1.5} strokeLinecap="round" />
    <Path
      d="M7.4 4.8A2 2 0 0 1 9 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9a2 2 0 0 1-1.6-.8l-4.5-6a2 2 0 0 1 0-2.4l4.5-6v0Z"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

export default React.memo(Backspace);
