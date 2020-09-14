import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getUserSettings } from "./utils/loginDataManager";
import { getOr } from "lodash/fp";

const lng = getOr('en-US','language',getUserSettings()) ;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(Backend)
  .use(LanguageDetector)
  .init({
    lng,
    debug: false,
    fallbackLng: "en-US",
    defaultNS: "common",
    ns: "common",
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
