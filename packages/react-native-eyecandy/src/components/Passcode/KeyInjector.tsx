import React from 'react';

import { Key, KeyProps } from './Key';

export const DELETE_KEY_VALUE = '<';
export const EMPTY_KEY_VALUE = '';

export interface KeyInjectorProps {
  testIDPrefix?: string;
  onPressIn: (keyValue: string) => void;
  onPressOut: () => void;
  keyValue: string;
  KeyComponent?: React.ComponentType<KeyProps>;
  hideDeleteKey?: boolean;
  emptyKeyValue?: string;
  deleteKeyValue?: string;
}

export function KeyInjector({
  onPressIn,
  onPressOut,
  keyValue,
  KeyComponent = Key,
  hideDeleteKey,
  testIDPrefix,
  emptyKeyValue,
  deleteKeyValue,
}: KeyInjectorProps) {
  const isDeleteKey = keyValue === DELETE_KEY_VALUE;
  const isEmptyKey = keyValue === EMPTY_KEY_VALUE;

  // newKeyValue

  let newKeyValue: string | null = keyValue;
  if (isDeleteKey)
    newKeyValue = deleteKeyValue !== undefined ? deleteKeyValue : null;
  else if (isEmptyKey)
    newKeyValue = emptyKeyValue !== undefined ? emptyKeyValue : null;

  // testID

  let keyValueTestIDName = keyValue;
  if (isDeleteKey) keyValueTestIDName = 'delete';
  else if (isEmptyKey) keyValueTestIDName = 'empty';

  const keyTestID = testIDPrefix
    ? `${testIDPrefix}-${keyValueTestIDName}`
    : undefined;

  return (
    <KeyComponent
      keyValue={newKeyValue}
      isDeleteKey={isDeleteKey}
      isEmptyKey={isEmptyKey}
      hideDeleteKey={!!hideDeleteKey}
      onPressIn={() => {
        onPressIn(newKeyValue !== null ? newKeyValue : keyValue);
      }}
      onPressOut={onPressOut}
      testID={keyTestID}
      testIDPrefix={testIDPrefix}
    />
  );
}
