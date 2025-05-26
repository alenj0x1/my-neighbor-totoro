import { translations } from "./translations.js";

export const i18n = {
  defaultLang: "es",
  currentLang: localStorage.getItem("lang"),
  setLang(lang) {
    localStorage.setItem("lang", lang);
    this.currentLang = lang;
  },
  render() {
    const elements = document.querySelectorAll("[data-i18n]");

    elements.forEach((e) => {
      const key = e.getAttribute("data-i18n");

      const translationsLang = translations[this.currentLang];
      if (!translationsLang) {
        e.textContent = "lang_not_found";
        return;
      }
      const translation = translationsLang[key] ? translationsLang[key] : key;

      const keyReplacements = e.getAttribute("data-i18n-replacements");
      if (keyReplacements) {
        try {
          const keyReplacementJSON = JSON.parse(keyReplacements);

          e.innerHTML = translation;

          for (const [key, value] of Object.entries(keyReplacementJSON)) {
            e.innerHTML = e.innerHTML.replace(`__${key}__`, value);
          }
        } catch (error) {
          e.textContent = translation;
        }
      } else {
        e.textContent = translation;
      }
    });
  },
};
