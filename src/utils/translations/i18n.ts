import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import huTranslation from './hu.json';
import enTranslation from './en.json';

i18n.use(initReactI18next).init({
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    resources: {
      hu: huTranslation,
      en: enTranslation
    }
  });

  
export default i18n;
