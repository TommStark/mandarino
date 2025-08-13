// src/i18n/index.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// importa tus recursos (ES) una sola vez acá
import exchangeES from '../screens/exchange/locales/es.json'; // el que usamos hoy
// importa más namespaces cuando los tengas (cryptolistES, loginES, etc.)

i18n.use(initReactI18next).init({
  lng: 'es',
  fallbackLng: 'es',
  resources: {
    es: {
      exchange: exchangeES, // <-- importante
      // cryptolist: cryptolistES,
      // login: loginES,
    },
  },
  ns: ['common', 'exchange'], // lista completa de namespaces disponibles
  defaultNS: 'common', // o 'exchange' si querés ese como default global
  interpolation: { escapeValue: false },
  returnNull: false,
  returnEmptyString: false,
});

export default i18n;
