import { Link } from 'react-router-dom';
import '../../styles/footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer-top'>
                <p className='footer-fekturera'>
                    123 Fakturera
                </p>
                <div className='footer-menu'>
                    {
                        [
                            {opt: 'Home',href: '/home'},
                            {opt: 'Order',href: '/order'},
                            {opt: 'Contact Us',href: '/contact'},
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