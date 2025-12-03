import { Link } from 'react-router-dom';
import '../../../styles/dashboard/dashboard-head.css';
import LangDrop from '../../common/LangDrop';
import ProfilePlaceholder from '../../../assets/profile-placeholder.svg';
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const Header = () => {
    return (
        <nav className='dashboard-nav'>
            <header className='dashboard-header'>
                <div className='left-profile-box'>

                    <Link to={'/dashboard/profile'} className='profile-image-box'>
                        <img src={ProfilePlaceholder} alt='profile' className='profile-image'/>
                        <div className='online-indicator'/>
                    </Link>

                    <div className='left-name-company-box'>
                        <p> John Andre</p>
                        <p className='company-name'> Stortford AS</p>
                    </div>
                </div>

                <HiOutlineMenuAlt2 className='hamburger-dashboard'/>

                <LangDrop/>
            </header>
        </nav>
    )
}

export default Header;