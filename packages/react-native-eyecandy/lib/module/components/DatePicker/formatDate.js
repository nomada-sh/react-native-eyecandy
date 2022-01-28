import getLocale from './getLocale';
import { format as formatDateBase } from 'date-fns';
export default function formatDate(date, format, locale) {
  return formatDateBase(date, format, {
    locale: getLocale(locale)
  });
}
//# sourceMappingURL=formatDate.js.map