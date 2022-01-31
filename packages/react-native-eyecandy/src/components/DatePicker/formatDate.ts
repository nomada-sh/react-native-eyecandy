import getLocale from './getLocale';
import {format as formatDateBase} from 'date-fns';

export default function formatDate(date: Date, format: string, locale: string) {
  return formatDateBase(date, format, {
    locale: getLocale(locale),
  });
}
