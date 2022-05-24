import React from 'react';
import { Text } from 'react-native';

import { fireEvent, render, RenderAPI } from '@testing-library/react-native';

import Passcode from './Passcode';

const getPressKey =
  (getByTestId: RenderAPI['getByTestId']) => (keyValue: string) => {
    fireEvent(getByTestId(`passcode-key-${keyValue}`), 'pressIn');
    fireEvent(getByTestId(`passcode-key-${keyValue}`), 'pressOut');
  };

const getPressDeleteKey = (getByTestId: RenderAPI['getByTestId']) => () => {
  fireEvent(getByTestId('passcode-key-delete'), 'pressIn');
  fireEvent(getByTestId('passcode-key-delete'), 'pressOut');
};

it('renders correctly', async () => {
  const { getByTestId } = render(
    <Passcode value="" onChange={jest.fn()} testID="passcode" />,
  );

  expect(getByTestId('passcode')).toBeTruthy();
  expect(getByTestId('passcode-key-delete')).toBeTruthy();
  for (let i = 0; i < 9; i++)
    expect(getByTestId(`passcode-key-${i}`)).toBeTruthy();
});

it('calls onChange when key is pressed', async () => {
  const onChange = jest.fn();
  const { getByTestId, rerender } = render(
    <Passcode value="" onChange={onChange} testID="passcode" />,
  );

  const pressKey = getPressKey(getByTestId);
  const pressDeleteKey = getPressDeleteKey(getByTestId);

  for (let i = 0; i < 9; i++) {
    pressKey(i.toString());
    expect(onChange).toHaveBeenCalledWith(i.toString());
  }

  rerender(<Passcode value="123" onChange={onChange} testID="passcode" />);

  for (let i = 0; i < 9; i++) {
    pressKey(i.toString());
    expect(onChange).toHaveBeenCalledWith(`123${i}`);
  }

  pressDeleteKey();
  expect(onChange).toHaveBeenCalledWith('12');
});

it('updates value when key is pressed', async () => {
  const PasscodeWithState = () => {
    const [value, setValue] = React.useState('');

    return (
      <>
        <Text testID="value">{value}</Text>
        <Passcode value={value} onChange={setValue} testID="passcode" />
      </>
    );
  };

  const { getByTestId } = render(<PasscodeWithState />);

  const pressKey = getPressKey(getByTestId);
  const pressDeleteKey = getPressDeleteKey(getByTestId);

  const expectValueToBe = (value: string) => {
    expect(getByTestId('value').props.children).toBe(value);
  };

  let currentValue = '';
  for (let i = 0; i < 9; i++) {
    pressKey(i.toString());
    currentValue += i.toString();
    expectValueToBe(currentValue);
  }

  // Press delete more times than the length of the value.
  for (let i = 0; i < 15; i++) pressDeleteKey();
  expectValueToBe('');
});
