/// <reference types="react" />
import { ImageBackgroundProps } from 'react-native';
export interface AvatarProps extends ImageBackgroundProps {
    size?: number;
}
declare function Avatar({ size, style, ...props }: AvatarProps): JSX.Element;
export default Avatar;
