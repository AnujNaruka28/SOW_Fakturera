import { createContext, useContext, useEffect, useState } from "react";
import { translationService } from "../services/translationService";
import global from '../assets/GB.png';
import sweden from '../assets/SE.png';

export const TranslationContext = createContext();

export const TranslationProvider = ({children}) => {
    const stored = JSON.parse(localStorage.getItem("lang")) || { lang: "English", code: "en", flag: global};
    const [lang,setLang] = useState(stored);
    const [translations,setTranslations] = useState({});

    useEffect(() => {
        (async() => {
            const data = await translationService.getLanguage(lang.code);
            setTranslations(data);
        })();
    },[lang])

    const changeLang = (langObj) => {
        setLang(langObj);
        localStorage.setItem("lang",JSON.stringify(langObj));
    }

    const t = (key) => translations[key] || key;

    return (
        <TranslationContext.Provider value={{lang,t,changeLang,translations}}>
            {children}
        </TranslationContext.Provider>
    )
}

export const useTranslation = () => useContext(TranslationContext);