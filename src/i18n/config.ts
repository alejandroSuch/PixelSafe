import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import de from './locales/de.json';
import cs from './locales/cs.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
      it: { translation: it },
      pt: { translation: pt },
      de: { translation: de },
      cs: { translation: cs },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

// Sync <html lang="..."> with current language
const updateHtmlLang = (lng: string) => {
  document.documentElement.lang = lng.split('-')[0];
};
updateHtmlLang(i18n.language);
i18n.on('languageChanged', updateHtmlLang);

export default i18n;
