import styles from './Footer.module.scss';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={`center ${styles.footer}`}>
      <div className={`wrapper ${styles.footerWrapper}`}>
        <div className={styles.socialMedia}>
          <p>Connect with us:</p>
          <div className={styles.icons}>
            <FaFacebookF />
            <FaTwitter />
            <FaYoutube />
            <FaInstagram />
          </div>
        </div>
        <p className={styles.copyrightInfo}>
          &copy; {new Date().getFullYear()} PRMIS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
