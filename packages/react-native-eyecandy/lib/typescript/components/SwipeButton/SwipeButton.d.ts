/// <reference types="react" />
import { Props as SwipeButtonBaseProps } from 'rn-swipe-button';
export interface SwipeButtonProps extends Omit<SwipeButtonBaseProps, 'thumbIconComponent'> {
}
declare function SwipeButton({ titleStyles, containerStyles, thumbIconStyles, title, ...props }: SwipeButtonProps): JSX.Element;
export default SwipeButton;
