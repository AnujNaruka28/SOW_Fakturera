import '../../../../styles/dashboard/pricelist.css';
import { FiSearch } from "react-icons/fi";

const SearchInput = ({placeholder}) => {
  return (
    <div className='search-input-container'>
        <FiSearch className='search-input-icon'/>
        <input
        placeholder={placeholder}
        name="search-input"
        className='pricelist-search-input'
        />
    </div>
  );
};

export default SearchInput;
