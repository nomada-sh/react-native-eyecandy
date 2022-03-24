import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';

import { Body } from '../../typography';

import type { RadioGroupItemProps } from '../RadioGroupItem';

type Child<V> = React.ReactElement<RadioGroupItemProps<V>>;

export interface RadioGroupProps<V> extends Omit<ViewProps, 'children'> {
  children: Child<V> | Child<V>[];
  label: string;
  value?: V;
  onPress?: (value: V) => void;
  gap?: number;
  margin?: number;
  itemsPerRow?: number;
  labelStyle?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

function RadioGroup<V>({
  children,
  label,
  onPress,
  value,
  testID,
  style,
  gap = 10,
  itemsPerRow = 3,
  labelStyle,
  numberOfLines,
  ...props
}: RadioGroupProps<V>) {
  if (itemsPerRow < 1) throw new Error('itemsPerRow must be greater than 0');

  const childrenCount = React.Children.count(children);
  const rowCount = childrenCount / itemsPerRow;
  const gapCount = itemsPerRow - 1;
  const margin = gap / (1 + 1 / gapCount);

  const [width, setWidth] = React.useState(0);
  const itemWidth = width / itemsPerRow - margin;

  let row = 0;
  const injectedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      const i = index % itemsPerRow;

      const isEnd = i === itemsPerRow - 1;
      const isEndRow = row === rowCount - 1;

      if (isEnd) row++;

      return React.cloneElement(child, {
        containerStyle: [
          styles.itemContainer,
          {
            width: itemWidth,
            marginEnd: !isEnd ? gap : 0,
            marginBottom: !isEndRow ? gap : 0,
          },
        ],
        selected: value !== undefined && child.props.value === value,
        onPress: () => onPress?.(child.props.value),
        testID: child.props.testID ?? `${testID}-item-${index}`,
        numberOfLines: child.props.numberOfLines ?? numberOfLines,
      });
    }

    return child;
  });

  return (
    <View testID={testID} style={[styles.root, style]} {...props}>
      <Body numberOfLines={1} style={[styles.label, labelStyle]} weight="bold">
        {label}
      </Body>
      <View
        onLayout={event => {
          const { width } = event.nativeEvent.layout;
          setWidth(width);
        }}
        style={styles.itemsContainer}>
        {injectedChildren}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {},
  label: {
    marginBottom: 10,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemContainer: {},
});

export default RadioGroup;
