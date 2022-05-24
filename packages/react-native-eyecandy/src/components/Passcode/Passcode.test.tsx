import React from 'react';
import { Text, View } from 'react-native';

import { fireEvent, render, RenderAPI } from '@testing-library/react-native';

import TextInput from '../TextInput';

import { KeyValueProps } from './KeyValue';
import Passcode from './Passcode';

describe('With default KeyValue component', () => {
  it('renders correctly', async () => {
    expectToRenderCorrectly();
  });
  it('calls onChange when key is pressed', async () => {
    expectToCallOnChange();
  });
  it('updates value when key is pressed', async () => {
    expectToUpdateValue();
  });
});

describe('With custom KeyValue component', () => {
  const CustomKeyValue = ({ keyValue, isDeleteKey }: KeyValueProps) => {
    return (
      <View>
        <Text>{isDeleteKey ? 'Delete' : keyValue}</Text>
      </View>
    );
  };

  it('renders correctly', async () => {
    const { getByText } = expectToRenderCorrectly(CustomKeyValue);
    expect(getByText('Delete')).toBeTruthy();
  });

  it('calls onChange when key is pressed', async () => {
    expectToCallOnChange(CustomKeyValue);
  });

  it('updates value when key is pressed', async () => {
    expectToUpdateValue(CustomKeyValue);
  });
});

/**
 * Helpers
 */

function expectToRenderCorrectly(
  KeyValueComponent?: React.ComponentType<KeyValueProps>,
) {
  const { getByTestId, getByText } = render(
    <Passcode
      value=""
      onChange={jest.fn()}
      testID="passcode"
      KeyValueComponent={KeyValueComponent}
    />,
  );

  expect(getByTestId('passcode')).toBeTruthy();
  expect(getByTestId('passcode-key-delete')).toBeTruthy();
  for (let i = 0; i < 9; i++) {
    expect(getByTestId(`passcode-key-${i}`)).toBeTruthy();
    expect(getByText(i.toString())).toBeTruthy();
  }

  return { getByTestId, getByText };
}

function expectToCallOnChange(
  KeyValueComponent?: React.ComponentType<KeyValueProps>,
) {
  const onChange = jest.fn();
  const { getByTestId, rerender } = render(
    <Passcode
      value=""
      onChange={onChange}
      testID="passcode"
      KeyValueComponent={KeyValueComponent}
    />,
  );

  const pressKey = getPressKey(getByTestId);
  const pressDeleteKey = getPressDeleteKey(getByTestId);

  for (let i = 0; i < 9; i++) {
    pressKey(i.toString());
    expect(onChange).toHaveBeenCalledWith(i.toString());
  }

  // Pressing delete with no value should not change the value.
  pressDeleteKey();
  expect(onChange).toHaveBeenCalledWith('');

  rerender(
    <Passcode
      value="123"
      onChange={onChange}
      testID="passcode"
      KeyValueComponent={KeyValueComponent}
    />,
  );

  for (let i = 0; i < 9; i++) {
    pressKey(i.toString());
    expect(onChange).toHaveBeenCalledWith(`123${i}`);
  }

  pressDeleteKey();
  expect(onChange).toHaveBeenCalledWith('12');
}

function expectToUpdateValue(
  KeyValueComponent?: React.ComponentType<KeyValueProps>,
) {
  const PasscodeWithState = () => {
    const [value, setValue] = React.useState('');

    return (
      <>
        <Text testID="value">{value}</Text>
        <TextInput value={value} onChangeText={setValue} testID="input" />
        <Passcode
          value={value}
          onChange={setValue}
          testID="passcode"
          KeyValueComponent={KeyValueComponent}
        />
      </>
    );
  };

  const { getByTestId } = render(<PasscodeWithState />);

  const pressKey = getPressKey(getByTestId);
  const pressDeleteKey = getPressDeleteKey(getByTestId);
  const writeInputValue = (value: string) => {
    fireEvent.changeText(getByTestId('input'), value);
  };

  const expectValueToBe = (value: string) => {
    expect(getByTestId('value').props.children).toBe(value);
    expect(getByTestId('input').props.value).toBe(value);
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

  writeInputValue('123456789');
  currentValue = '123456789';
  for (let i = 0; i < 9; i++) {
    pressKey(i.toString());
    currentValue += i.toString();
    expectValueToBe(currentValue);
  }
}

function getPressKey(getByTestId: RenderAPI['getByTestId']) {
  return (keyValue: string) => {
    fireEvent(getByTestId(`passcode-key-${keyValue}`), 'pressIn');
    fireEvent(getByTestId(`passcode-key-${keyValue}`), 'pressOut');
    // fireEvent.press(getByTestId(`passcode-key-${keyValue}`));
  };
}

function getPressDeleteKey(getByTestId: RenderAPI['getByTestId']) {
  return () => {
    fireEvent(getByTestId('passcode-key-delete'), 'pressIn');
    fireEvent(getByTestId('passcode-key-delete'), 'pressOut');
    // fireEvent.press(getByTestId('passcode-key-delete'));
  };
}
