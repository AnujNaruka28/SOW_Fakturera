import { useState } from 'react';
import '../../styles/navbar.css';
import global from '../../assets/GB.png';
import sweden from '../../assets/SE.png';
const LangDrop = () => {
    const languages = [
            {
                lang:'English',flag: global
            },
            {
                lang:'Svenska',flag: sweden
            }
    ];
    const [language,setLanguage] = useState({lang:'English',flag: global});
    const [langdropDown,setlangdropDown] = useState(false);
    const toggleDropDown = () => setlangdropDown((prev) => (!prev));
    const fetchLang = () => {
        //here await fetch in useeffect hook for language
    }
    return (
        <div className='lang-box' onClick={() => toggleDropDown()}>
            <div id='nav-end'>
                <p id='lang-text'>
                    {language.lang} 
                </p>

                <img src={language.flag} alt={language.lang} id='flag' />                        
            </div>

            {
                !!langdropDown && 
                <div id='drop-down'>
                {
                    languages.map((lng,i) => (
                        <div key={i} id='drop-item' onClick={() => setLanguage({lang: lng.lang,flag: lng.flag})}>
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