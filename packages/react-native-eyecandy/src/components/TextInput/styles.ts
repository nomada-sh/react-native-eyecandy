import { Platform, StyleSheet } from 'react-native';

const inputWebStyle =
  Platform.OS === 'web'
    ? {
        outline: 'none',
      }
    : {};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    borderStyle: 'solid',
  },
  input: {
    flex: 1,
    height: '100%',
    ...inputWebStyle,
  },
  iconContainer: {
    justifyContent: 'center',
  },
  leftIconContainer: {
    paddingHorizontal: 16,
  },
  rightIconContainer: {
    paddingHorizontal: 16,
  },
  disabled: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default styles;
