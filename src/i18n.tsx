import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import httpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const configI18n = () => {
    i18n.use(detector)
        .use(httpBackend)
        .use(initReactI18next)
        .init({
            debug: true,
            fallbackLng: "ru",
            backend: {
                loadPath: "/locales/{{lng}}/{{ns}}.json",
            },
        });
};
