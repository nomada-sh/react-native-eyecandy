import type { ReactNode } from 'react';
import { ViewProps } from 'react-native';
export interface CardProps extends ViewProps {
    children?: ReactNode;
}
declare function Card({ style, ...props }: CardProps): JSX.Element;
export default Card;
