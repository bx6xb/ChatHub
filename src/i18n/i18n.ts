import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(HttpBackend) // loads translations from the server
  .use(LanguageDetector) // detect language
  .use(initReactI18next) // React integration
  .init({
    fallbackLng: 'en', // default language
    supportedLngs: ['en', 'ru'], // supported languages
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/ChatHub/locales/{{lng}}/{{ns}}.json' // path to files with translations
    }
  })

export default i18n
