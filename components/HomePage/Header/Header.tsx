import { useRouter } from 'next/router';
import { FaPhoneAlt } from 'react-icons/fa';
import Logo from '../../Logo/Logo';
import styles from './Header.module.scss';

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={`wrapper ${styles.headerWrapper}`}>
        <Logo />
        <section className={`center ${styles.linksContainer}`}>
          <div className={`flow ${styles.emergencyServiceContainer}`}>
            <p>Emergency Service</p>
            <a
              className={`center ${styles.callLink}`}
              href="tel: +233000000000"
            >
              <FaPhoneAlt />
              <span>+233 000000000</span>
            </a>
          </div>
          <div className={`center ${styles.btnsContainer}`}>
            <button
              className="btn"
              onClick={() => {
                router.replace('/login');
              }}
            >
              Sign In
            </button>
            <button
              className="btn"
              onClick={() => {
                router.replace('/signup');
              }}
            >
              Sign Up
            </button>
          </div>
        </section>
      </div>
    </header>
  );
};

export default Header;
