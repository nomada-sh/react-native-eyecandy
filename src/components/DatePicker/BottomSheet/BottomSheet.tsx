import { View } from 'react-native';

export interface BottomSheetProps {
  children?: React.ReactNode;
}

function BottomSheet({
  children
}: BottomSheetProps) {
  return (
    <View>
      {children}
    </View>
  );
}

export default BottomSheet;
