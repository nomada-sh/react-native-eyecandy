import { View } from 'react-native';

export interface BottomSheetV2Props {
  children?: React.ReactNode;
}

function BottomSheetV2({
  children
}: BottomSheetV2Props) {
  return (
    <View>
      {children}
    </View>
  );
}

export default BottomSheetV2;
