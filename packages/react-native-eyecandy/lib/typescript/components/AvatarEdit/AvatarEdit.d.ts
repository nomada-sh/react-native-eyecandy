/// <reference types="react" />
import { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import { AvatarProps } from '../Avatar';
export interface AvatarEditProps extends Omit<PressableProps, 'style'> {
    size?: number;
    source: AvatarProps['source'];
    style?: StyleProp<ViewStyle>;
    onChange?: (assets: ImagePickerResponse['assets']) => void;
}
declare function AvatarEdit({ style, size, source, onPress, onChange, ...props }: AvatarEditProps): JSX.Element;
export default AvatarEdit;
