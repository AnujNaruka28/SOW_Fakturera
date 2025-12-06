import '../../styles/navbar.css';
import { Link } from 'react-router-dom';
import diamond from '../../assets/diamond.png';

import { FiMenu } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";
import { useState } from 'react';
import LangDrop from './LangDrop';
import { useMobilePortrait } from '../../hooks/useMobilePortrait';
import { useTranslation } from '../../context/TranslationContext.jsx';

const Navbar = () => {
    const {t} = useTranslation();
    const navOptions = [
        {
            name: t("navbar.home"),
            href: '/home'
        },
        {
            name: t("navbar.order"),
            href: '/order'
        },
        {
            name: t("navbar.customers"),
            href: '/customers'
        },
        {
            name: t("navbar.about"),
            href: '/about'
        },
        {
            name: t("navbar.contact"),
            href: '/contact'
        },
        {
            name: t("terms.title"),
            href: '/terms'
        }
    ]
    
    const [menu,setMenu] = useState(false);
    const toggleHamBurger = () => setMenu((prev) => (!prev));
    const restricted = useMobilePortrait();
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
                                    <Link to={opt.href} key={i} className={`menu-item ${((restricted === false) && opt.href === '/terms') ? 'hidden-term' : ''} `}>
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

                    <LangDrop/>
                </div>
                
            </header>
        </nav>
    )
}

export default Navbar;