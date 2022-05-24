import React from 'react';

import { render } from '@testing-library/react-native';

import Passcode from './Passcode';

it('renders correctly', () => {
  const { getByTestId } = render(
    <Passcode value="1234" onChange={jest.fn()} testID="passcode" />,
  );
});
