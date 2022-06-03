import "./Header.scss";
import { Link } from 'react-router-dom';
import RestAndEatLogo from '../../images/restandeatlogo.png';

const Header = () => {
  return (
    <header className='header'>
      <Link to='/'>  
        <img
          className='header-logo' 
          src={RestAndEatLogo} 
          alt="Rest and Eat's logo" 
        />
      </Link>
      
      <nav>
        <ul className='header__list'>
          <li className='header__list-elm'><Link to='/'> Home </Link></li>
          <li className='header__list-elm'><Link to='/menu'> Menu </Link></li>
          <li className='header__list-elm'><Link to='/reservation'> Make a Reservation </Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
