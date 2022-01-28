/// <reference types="react" />
declare type Error = [boolean | undefined | null, string];
export interface TextInputErrorsProps {
    errors?: Error[];
    error?: Error;
}
declare function TextInputErrors({ errors, error }: TextInputErrorsProps): JSX.Element;
export default TextInputErrors;
