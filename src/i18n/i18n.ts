import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import exchangeES from '../features/exchange/locales/es.json';
import ScanES from '../features/scan/locales/es.json';
import loginES from '../features/login/locales/es.json';
import splashES from '../features/splash/locales/es.json';
import walletES from '../features/wallet/locales/es.json';
import cryptolistES from '../features/cryptolist/locales/es.json';
import homeES from '../features/home/locales/es.json';
import sharedES from '../locales/es.json';

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
      shared: sharedES,
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
    'shared',
  ],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  returnNull: false,
  returnEmptyString: false,
});

export default i18n;
