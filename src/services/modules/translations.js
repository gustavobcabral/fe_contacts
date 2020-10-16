import api from "../apiTranslations";

export default {
  get(language, file) {
    return api.get(`/locales/${language}/${file}.json`);
  },
};
