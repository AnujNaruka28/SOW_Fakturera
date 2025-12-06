import { useState } from 'react';
import '../../styles/navbar.css';
import global from '../../assets/GB.png';
import sweden from '../../assets/SE.png';
import { useLocation } from 'react-router-dom';
import { useMobilePortrait } from '../../hooks/useMobilePortrait';
import { useTranslation } from '../../context/TranslationContext.jsx';
const LangDrop = () => {
    const languages = [
            {
                lang:'English',flag: global, code: 'en'
            },
            {
                lang:'Svenska',flag: sweden, code: 'sv'
            }
    ];
    const [language,setLanguage] = useState(JSON.parse(localStorage.getItem("lang")) ||{lang:'English',flag: global, code: "en"});
    const [langdropDown,setlangdropDown] = useState(false);
    const {pathname} = useLocation();
    const isMobilePortrait = useMobilePortrait();
    const toggleDropDown = () => setlangdropDown((prev) => (!prev));

    const {changeLang} = useTranslation();
    return (
        <div className='lang-box' onClick={() => toggleDropDown()}>
            <div id='nav-end'>
                <p className={`${(pathname.split('/')[1] === 'dashboard' && isMobilePortrait) ? 'hidden-lang-text' : ""} lang-text `}>
                    {language.lang} 
                </p>

                <img src={language.flag} alt={language.lang} id='flag' />                        
            </div>

            {
                !!langdropDown && 
                <div id='drop-down' className={`${(pathname.split('/')[1] === 'dashboard' && isMobilePortrait) && 'dropdown-posfix'}`}>
                {
                    languages.map((lng,i) => (
                        <div key={i} id='drop-item' onClick={() => {
                            setLanguage({lang: lng.lang,flag: lng.flag,code: lng.code})
                            changeLang({lang: lng.lang,code: lng.code, flag: lng.flag})
                        }}>
                            <p id='lang-drop-text'>
                                {lng.lang} 
                            </p>

                            <img src={lng.flag} alt={lng.lang} id='flag' /> 
                        </div>
                    ))
                }
                </div>
            }
        </div>
    )
}

export default LangDrop;