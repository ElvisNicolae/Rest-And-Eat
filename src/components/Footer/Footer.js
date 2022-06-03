import { Link } from 'react-router-dom';
import "./Footer.scss";
import RestAndEatLogo from '../../images/restandeatlogo.png';
import twitterLogo from '../../images/twittericon-lowres.png';
import facebookLogo from '../../images/facebookicon-lowres.png';
import youtubeLogo from '../../images/youtubeicon-lowres.png';

const Footer = () => {
  return (
    <footer id='footer'>
      <Link to='/'>  
        <img
          className='footer-logo' 
          src={RestAndEatLogo} 
          alt="Rest and Eat's logo" 
        />
      </Link>

      <nav>
        <ul className='footer__list'>
          <li className='footer__list-elm'>
            <a href="https://www.twitter.com/">
              <img src={twitterLogo} alt="twitter logo" />
            </a>
          </li>
          <li className='footer__list-elm'>
            <a href="https://www.facebook.com/">
              <img src={facebookLogo} alt="facebook logo" />
            </a>
          </li>
          <li className='footer__list-elm'>
            <a href="https://www.youtube.com/">
              <img src={youtubeLogo} alt="youtube logo" />
            </a>
          </li>  
        </ul>
      </nav>
      
      <p className="footer__copyright">© Copyright</p>
    </footer>
  )
}

export default Footer;
