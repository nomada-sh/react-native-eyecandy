import React from 'react';
import { View, ViewProps } from 'react-native';

import { CheckListOptionProps } from '../CheckListOption';

export interface CheckListProps extends Omit<ViewProps, 'children'> {
  children:
    | React.ReactElement<CheckListOptionProps>
    | React.ReactElement<CheckListOptionProps>[];
  selected: string[];
  onSelectedChange: (selected: string[]) => void;
  onPress?: (props: { id: string; value: any }) => void;
  marginBottom?: number;
  maxSelected?: number;
}

function CheckList({
  testID,
  children,
  selected,
  marginBottom = 20,
  onPress,
  onSelectedChange,
  maxSelected,
  ...props
}: CheckListProps) {
  const isMaxSelected =
    maxSelected !== undefined &&
    maxSelected > 1 &&
    selected.length >= maxSelected;
  const childrenCount = React.Children.count(children);

  const injectedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement<CheckListOptionProps>(child)) {
      const isSelected = selected.includes(child.props.id);
      const disabled = isMaxSelected && !isSelected;

      return React.cloneElement(child, {
        style: [
          {
            marginBottom: index - 1 !== childrenCount ? marginBottom : 0,
          },
        ],
        selected: isSelected,
        onPress: ({ id, value }: { id: string; value: any }) => {
          let newSelected: string[] = [];
          if (maxSelected === 1) {
            newSelected = [id];
          } else {
            newSelected = selected.includes(id)
              ? selected.filter(item => item !== id)
              : [...selected, id];
          }

          onSelectedChange(newSelected);

          onPress?.({ id, value });
        },
        disabled: disabled || child.props.disabled,
        testID:
          child.props.testID ?? testID ? `${testID}-item-${index}` : undefined,
      });
    }

    return child;
  });

  return <View {...props}>{injectedChildren}</View>;
}

export default CheckList;
