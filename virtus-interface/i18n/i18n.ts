import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "./lang/en-us.json";
import translationBr from './lang/pt-br.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEn,
      },
      pt: {
        translation: translationBr
      }
    },
    lng: navigator.language.split("-")[0] || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React já faz escaping
    },
  });

export default i18n;
