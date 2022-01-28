import type { Fields, Errors, Messages } from './types';
export default function useMessages<T extends Fields>(fields: T, errors: Errors<T>): Messages<T>;
