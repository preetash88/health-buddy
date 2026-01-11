import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/english.json";
import hi from "./locales/hindi.json";
import ta from "./locales/tamil.json";
import te from "./locales/telugu.json";
import bn from "./locales/bengali.json";
import as from "./locales/assamese.json";
import kn from "./locales/kannada.json";
import mr from "./locales/marathi.json";
import or from "./locales/odia.json";
import pa from "./locales/punjabi.json";
import sa from "./locales/sanskrit.json";



i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        hi: { translation: hi },
        ta: { translation: ta },
        te: { translation: te },
        bn: { translation: bn },
        as: { translation: as },
        kn: { translation: kn },
        mr: { translation: mr },
        or: { translation: or },
        pa: { translation: pa },
        sa: { translation: sa },
    },
    lng: localStorage.getItem("lang") || "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false,
    },
});

export default i18n;
