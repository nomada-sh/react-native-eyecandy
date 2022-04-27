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

export interface RadioGroupProps<V = any> extends Omit<ViewProps, 'children'> {
  children:
    | React.ReactElement<RadioGroupItemProps>
    | React.ReactElement<RadioGroupItemProps>[];
  title?: string;
  value?: V;
  onChange?: (value: V) => void;
  gap?: number;
  itemsPerRow?: number;
  titleStyle?: StyleProp<TextStyle>;
  itemLabelNumberOfLines?: number;
}

function RadioGroup<V>({
  children,
  title,
  onChange,
  value,
  testID,
  style,
  gap = 10,
  itemsPerRow = 3,
  titleStyle,
  itemLabelNumberOfLines,
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
    if (React.isValidElement<RadioGroupItemProps>(child)) {
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
        onPress: (value: any) => {
          onChange && onChange(value);
          child.props.onPress && child.props.onPress(value);
        },
        testID: child.props.testID ?? `${testID}-item-${index}`,
        numberOfLines: child.props.numberOfLines ?? itemLabelNumberOfLines,
      });
    }

    return child;
  });

  return (
    <View testID={testID} style={[styles.root, style]} {...props}>
      {title ? (
        <Body
          numberOfLines={1}
          style={[styles.label, titleStyle]}
          weight="bold"
        >
          {title}
        </Body>
      ) : null}
      <View
        onLayout={event => {
          const { width } = event.nativeEvent.layout;
          setWidth(width);
        }}
        style={styles.itemsContainer}
      >
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
