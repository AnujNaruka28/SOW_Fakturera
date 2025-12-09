import '../../../App.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useMobilePortrait } from '../../../hooks/useMobilePortrait';
import bgImage from '../../../assets/sverige43.jpg';

const PublicLayout = () => {
    const {pathname} = useLocation();
    const isCheckMobilePortriat = useMobilePortrait();
    return (
        <main className={`app-main ${(pathname === '/terms') && 'app-padding'}`}>

            <img src={bgImage} alt="" className='app-bg-image' loading='eager'/>
            <Navbar/>
                <Outlet/>
            {
                ( pathname !== '/terms' ) ? <Footer/>
                : (isCheckMobilePortriat ? null : <Footer/>)
            }
        </main>
    )
}

export default PublicLayout;