import { enUS, es } from 'date-fns/locale';
export default function (locale) {
  switch (locale) {
    case 'en-US':
      return enUS;

    case 'es':
      return es;

    default:
      console.warn(`Unsupported locale: ${locale} falling back to en-US`);
      return enUS;
  }
}
//# sourceMappingURL=getLocale.js.map