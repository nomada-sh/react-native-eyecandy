import { format as formatDateBase, Locale } from 'date-fns';

export default function formatDate(date: Date, format: string, locale: Locale) {
  return formatDateBase(date, format, {
    locale,
  });
}
