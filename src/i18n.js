import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import translationEN from "./locales/en/"
import translationES from "./locales/es/"
import translationFR from "./locales/fr/"
import translationDE from "./locales/de/"
import translationIT from "./locales/it/"
import translationRU from "./locales/ru/"
import translationPT from "./locales/pt/"
import translationNL from "./locales/nl/"
import translationSV from "./locales/sv/"


i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    es: { translation: translationES },
    fr: { translation: translationFR },
    de: { translation: translationDE },
    it: { translation: translationIT },
    ru: { translation: translationRU },
    pt: { translation: translationPT },
    nl: { translation: translationNL },
    sv: { translation: translationSV },
  },
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
  resource: {
    loadPath: "src/locale/{{lng}}/{{ns}}.json", 
    savePath: "src/locale/{{lng}}/{{ns}}.json", 
  },
  parse: {
    list: ["i18next.t"], // Funciones de traducción que deseas analizar
  },
})

export default i18n
