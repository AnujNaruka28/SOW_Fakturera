import '../../../App.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Outlet } from 'react-router-dom';
const PublicLayout = () => {
    return (
        <main className='app-main'>
            <Navbar/>
                <Outlet/>
            <Footer/>
        </main>
    )
}

export default PublicLayout;