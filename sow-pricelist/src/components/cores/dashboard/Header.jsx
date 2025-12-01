import { Link } from 'react-router-dom';
import '../../../styles/dashboard/dashboard-head.css';
import LangDrop from '../../common/LangDrop';
import { CgProfile } from "react-icons/cg";
const Header = () => {
    return (
        <nav className='dashboard-nav'>
            <header className='dashboard-header'>
                <div className='left-profile-box'>

                    <Link to={'/dashboard/profile'} className='profile-image-box'>
                        <CgProfile className='profile-image'/>
                        <div className='online-indicator'/>
                    </Link>

                    <div className='left-name-company-box'>
                        <p> John Andre</p>
                        <p className='company-name'> Storfjord AS</p>
                    </div>
                </div>

                <LangDrop/>
            </header>
        </nav>
    )
}

export default Header;