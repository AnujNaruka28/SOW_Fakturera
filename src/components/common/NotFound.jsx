import { useLocation } from 'react-router-dom';
import '../../styles/not-found.css';
const NotFound = () => {
    const {pathname} = useLocation();
    return (
        <div className={`not-found ${pathname.split('/')[1] === 'dashboard' ? 'width-custom' : 'width-full' }`}>
            <header className='not-found-head'>
                404 
                <p className='not-found-text'>Not Found</p> 
            </header>
        </div>
    )
};

export default NotFound;