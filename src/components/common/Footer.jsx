import { Link } from 'react-router-dom';
import '../../styles/footer.css'
import { useTranslation } from '../../context/TranslationContext';

const Footer = () => {

    const {t} = useTranslation();
    return (
        <footer className='footer'>
            <div className='footer-top'>
                <p className='footer-fekturera'>
                    123 Fakturera
                </p>
                <div className='footer-menu'>
                    {
                        [
                            {opt: t("navbar.home"),href: '/home'},
                            {opt: t("navbar.order"),href: '/order'},
                            {opt: t("navbar.contact"),href: '/contact'},
                        ].map((item,i) => (
                            <Link to={item.href} key={i} className='footer-menu-item'>
                                {item.opt}
                            </Link>
                        ))
                    }
                </div>
            </div>
            <div className='footer-copyright'>
                <p>
                    © Lättfaktura, CRO no. 638537, 2025. All rights reserved. 
                </p>
            </div>
        </footer>
    )
}

export default Footer;