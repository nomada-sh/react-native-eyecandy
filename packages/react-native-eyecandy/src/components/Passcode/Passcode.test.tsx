import React from 'react';
import { Pressable, Text } from 'react-native';

import { fireEvent, render, RenderAPI } from '@testing-library/react-native';

import TextInput from '../TextInput';

import { KeyProps } from './Key';
import { DELETE_KEY_VALUE, EMPTY_KEY_VALUE } from './KeyInjector';
import Passcode from './Passcode';

// TODO: Create tests for each prop.

describe('With default Key component', () => {
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

describe('With custom Key component', () => {
  const CustomKeyValue = ({
    keyValue,
    isDeleteKey,
    onPressIn,
    onPressOut,
    testID,
  }: KeyProps) => {
    let deleteKeyValue = 'Delete';
    if (isDeleteKey && keyValue !== null) deleteKeyValue = keyValue;

    return (
      <Pressable testID={testID} onPressIn={onPressIn} onPressOut={onPressOut}>
        <Text>{isDeleteKey ? deleteKeyValue : keyValue}</Text>
      </Pressable>
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

function expectToRenderCorrectly(KeyComponent?: React.ComponentType<KeyProps>) {
  const { getByTestId, getByText, rerender, debug } = render(
    <Passcode
      value=""
      onChange={jest.fn()}
      testID="passcode"
      KeyComponent={KeyComponent}
      deleteKeyValue="*"
      emptyKeyValue="."
    />,
  );

  expect(getByTestId('passcode-key-delete')).toBeTruthy();
  expect(getByText('*')).toBeTruthy();
  expect(getByTestId('passcode-key-empty')).toBeTruthy();
  expect(getByText('.')).toBeTruthy();

  rerender(
    <Passcode
      value=""
      onChange={jest.fn()}
      testID="passcode"
      KeyComponent={KeyComponent}
    />,
  );

  expect(getByTestId('passcode')).toBeTruthy();
  expect(getByTestId('passcode-key-delete')).toBeTruthy();
  for (let i = 0; i < 9; i++) {
    expect(getByTestId(`passcode-key-${i}`)).toBeTruthy();
    expect(getByText(i.toString())).toBeTruthy();
  }

  return { getByTestId, getByText, debug };
}

function expectToCallOnChange(KeyComponent?: React.ComponentType<KeyProps>) {
  const onChange = jest.fn();
  const { getByTestId, rerender } = render(
    <Passcode
      value=""
      onChange={onChange}
      testID="passcode"
      KeyComponent={KeyComponent}
    />,
  );

  const pressKey = getPressKey(getByTestId);
  const pressDeleteKey = getPressDeleteKey(getByTestId);
  const pressEmptyKey = getPressEmptyKey(getByTestId);

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
      KeyComponent={KeyComponent}
    />,
  );

  for (let i = 0; i < 9; i++) {
    pressKey(i.toString());
    expect(onChange).toHaveBeenCalledWith(`123${i}`);
  }

  pressDeleteKey();
  expect(onChange).toHaveBeenCalledWith('12');

  // Custom empty key value.

  onChange.mockClear();

  rerender(
    <Passcode
      value=""
      onChange={onChange}
      testID="passcode"
      KeyComponent={KeyComponent}
      emptyKeyValue="."
    />,
  );

  pressEmptyKey();
  expect(onChange).toHaveBeenCalledWith('.');

  onChange.mockClear();

  rerender(
    <Passcode
      value=""
      onChange={onChange}
      testID="passcode"
      KeyComponent={KeyComponent}
      emptyKeyValue="longer-empty-key-value"
    />,
  );

  pressEmptyKey();
  expect(onChange).toHaveBeenCalledWith('longer-empty-key-value');

  // Custom delete key value.

  onChange.mockClear();

  rerender(
    <Passcode
      value=""
      onChange={onChange}
      testID="passcode"
      KeyComponent={KeyComponent}
      deleteKeyValue="*"
    />,
  );

  pressDeleteKey();
  expect(onChange).toHaveBeenCalledWith('*');

  onChange.mockClear();

  rerender(
    <Passcode
      value=""
      onChange={onChange}
      testID="passcode"
      KeyComponent={KeyComponent}
      deleteKeyValue="longer-delete-key-value"
    />,
  );

  pressDeleteKey();
  expect(onChange).toHaveBeenCalledWith('longer-delete-key-value');

  onChange.mockClear();

  // Even if delete key value is the same as internal delete key value, onChange should be called with custom delete key value.

  rerender(
    <Passcode
      value=""
      onChange={onChange}
      testID="passcode"
      KeyComponent={KeyComponent}
      deleteKeyValue={DELETE_KEY_VALUE}
    />,
  );

  pressDeleteKey();
  expect(onChange).toHaveBeenCalledWith(DELETE_KEY_VALUE);

  onChange.mockClear();

  // Even if empty key value is the same as internal empty key value, onChange should be called with custom empty key value.

  rerender(
    <Passcode
      value=""
      onChange={onChange}
      testID="passcode"
      KeyComponent={KeyComponent}
      emptyKeyValue={EMPTY_KEY_VALUE}
    />,
  );

  pressEmptyKey();
  expect(onChange).toHaveBeenCalledWith(EMPTY_KEY_VALUE);
}

function expectToUpdateValue(KeyComponent?: React.ComponentType<KeyProps>) {
  const PasscodeWithState = ({ emptyKeyValue, deleteKeyValue }: any) => {
    const [value, setValue] = React.useState('');

    return (
      <>
        <Text testID="value">{value}</Text>
        <TextInput value={value} onChangeText={setValue} testID="input" />
        <Passcode
          value={value}
          onChange={setValue}
          testID="passcode"
          KeyComponent={KeyComponent}
          emptyKeyValue={emptyKeyValue}
          deleteKeyValue={deleteKeyValue}
        />
      </>
    );
  };

  const { getByTestId, rerender } = render(<PasscodeWithState />);

  const pressKey = getPressKey(getByTestId);
  const pressDeleteKey = getPressDeleteKey(getByTestId);
  const pressEmptyKey = getPressEmptyKey(getByTestId);
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

  // Custom empty key value.

  rerender(<PasscodeWithState emptyKeyValue="," />);
  writeInputValue('');

  pressKey('9');
  pressKey('9');
  pressKey('9');
  pressEmptyKey();
  pressKey('9');
  pressKey('9');
  pressKey('9');
  pressEmptyKey();
  pressKey('9');
  pressKey('9');
  pressKey('9');

  expectValueToBe('999,999,999');

  // Custom delete key value.

  rerender(<PasscodeWithState deleteKeyValue="-" />);
  writeInputValue('');

  pressKey('9');
  pressKey('9');
  pressKey('9');
  pressDeleteKey();
  pressKey('9');
  pressKey('9');
  pressKey('9');
  pressDeleteKey();
  pressKey('9');
  pressKey('9');
  pressKey('9');

  expectValueToBe('999-999-999');

  // Custom empty key value and delete key value.

  rerender(<PasscodeWithState emptyKeyValue="." deleteKeyValue="*" />);
  writeInputValue('');

  pressKey('9');
  pressKey('9');
  pressKey('9');
  pressEmptyKey();
  pressKey('9');
  pressKey('9');
  pressKey('9');
  pressDeleteKey();
  pressKey('9');
  pressKey('9');
  pressKey('9');

  expectValueToBe('999.999*999');
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

function getPressEmptyKey(getByTestId: RenderAPI['getByTestId']) {
  return () => {
    fireEvent(getByTestId('passcode-key-empty'), 'pressIn');
    fireEvent(getByTestId('passcode-key-empty'), 'pressOut');
    // fireEvent.press(getByTestId('passcode-key-delete'));
  };
}
