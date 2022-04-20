import { StyleSheet } from 'react-native';

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
});

export default styles;
