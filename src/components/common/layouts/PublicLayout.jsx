import '../../../App.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useMobilePortrait } from '../../../hooks/useMobilePortrait';
const PublicLayout = () => {
    const {pathname} = useLocation();
    const isCheckMobilePortriat = useMobilePortrait();
    return (
        <main className='app-main'>
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