import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import exchangeES from '../screens/exchange/locales/es.json';
import ScanES from '../screens/scan/locales/es.json';
import loginES from '../screens/login/locales/es.json';
import splashES from '../screens/splash/locales/es.json';
import walletES from '../screens/wallet/locales/es.json';
import cryptolistES from '../screens/cryptolist/locales/es.json';
import homeES from '../screens/home/locales/es.json';

i18n.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'es',
  resources: {
    es: {
      exchange: exchangeES,
      scan: ScanES,
      login: loginES,
      splash: splashES,
      wallet: walletES,
      cryptolist: cryptolistES,
      home: homeES,
    },
  },
  ns: [
    'common',
    'exchange',
    'scan',
    'login',
    'splash',
    'wallet',
    'cryptolist',
    'home',
  ],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  returnNull: false,
  returnEmptyString: false,
});

export default i18n;
