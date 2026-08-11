import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en.json";
import ptTranslations from "./locales/pt.json";

const savedLanguage = localStorage.getItem("language");
const browserLanguage = navigator.language.split("-")[0];
const defaultLanguage =
  savedLanguage ||
  (browserLanguage === "en" || browserLanguage === "pt"
    ? browserLanguage
    : "pt");

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    pt: { translation: ptTranslations },
  },
  lng: defaultLanguage,
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
