import '../../styles/navbar.css';
import { Link } from 'react-router-dom';
import diamond from '../../assets/diamond.png';
import global from '../../assets/GB.png';
import sweden from '../../assets/SE.png';
import { FiMenu } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";
import { useState } from 'react';

const Navbar = () => {

    const navOptions = [
        {
            name: 'Home',
            href: '/home'
        },
        {
            name: 'Order',
            href: '/order'
        },
        {
            name: 'Our Customers',
            href: '/customers'
        },
        {
            name: 'About Us',
            href: '/about'
        },
        {
            name: 'Contact Us',
            href: '/contact'
        },
        {
            name: 'Terms',
            href: '/terms'
        }
    ]
    const languages = [
        {
            lang:'English',flag: global
        },
        {
            lang:'Svenska',flag: sweden
        }
    ]
    const [language,setLanguage] = useState({lang:'English',flag: global});
    const [langdropDown,setlangdropDown] = useState(false);
    const [menu,setMenu] = useState(false);
    const toggleDropDown = () => setlangdropDown((prev) => (!prev));
    const toggleHamBurger = () => setMenu((prev) => (!prev));
    const fetchLang = () => {
        //here await fetch in useeffect hook for language
    }
    return (
        <nav className='navbar'>
            <header className='nav-header'>
                <Link to={'/'} id='diamond-link'>
                    <img src={diamond} alt="diamond" id='diamond' />
                </Link>

                <div className='hamburger-menu'>
                    {
                        menu ? <TfiClose id='hamburger-icon' onClick={() => toggleHamBurger()}/> : <FiMenu id='hamburger-icon' onClick={() => toggleHamBurger()}/>
                    }
                    {
                        menu &&
                        <div className='menu-nav'>
                            {
                                navOptions.map((opt,i) => (
                                    <Link to={opt.href} key={i} className={`menu-item ${(opt.name === 'Terms') ? 'hidden-term' : 'block'} `}>
                                        {opt.name}
                                    </Link>
                                ))
                            }
                        </div>
                    }
                </div>

                <div id='right-nav'>
                    {/* Navbar Options */}
                    <div id='nav-options'>
                        {
                            navOptions.map((opt,i) => (
                                (opt.name !== 'Terms') &&
                                <Link to={opt.href} key={i} className='nav-option'>
                                    {opt.name}
                                </Link>
                            ))
                        }
                    </div>

                    {/* Language Drop Down */}
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
                </div>
                
            </header>
        </nav>
    )
}

export default Navbar;