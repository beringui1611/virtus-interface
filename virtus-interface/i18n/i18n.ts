import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector'; // Importando o detector de idioma


import translationEn from "./lang/en-us.json";
import translationBr from './lang/pt-br.json';
import translationEs from './lang/es.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEn,
      },
      pt: {
        translation: translationBr
      },
      es:{
        translation: translationEs
      }
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
        order: ['querystring', 'cookie', 'localStorage', 'navigator'],
        caches: ['cookie'],
    }
  });

export default i18n;
