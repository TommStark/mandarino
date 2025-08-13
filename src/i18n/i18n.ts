import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import exchangeES from '../screens/exchange/locales/es.json';
import ScanES from '../screens/scan/locales/es.json';

i18n.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'es',
  resources: {
    es: {
      exchange: exchangeES,
      scan: ScanES,
    },
  },
  ns: ['common', 'exchange', 'scan'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  returnNull: false,
  returnEmptyString: false,
});

export default i18n;
