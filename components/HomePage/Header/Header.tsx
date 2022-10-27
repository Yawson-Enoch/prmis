import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FaPhoneAlt } from 'react-icons/fa';
import Logo from '../../Logo/Logo';
import styles from './Header.module.scss';

const Header = () => {
  const router = useRouter();
  const { status } = useSession();

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

          {status === 'authenticated' && (
            <button
              className={`btn ${styles.dash}`}
              onClick={() => {
                router.push('/dashboard');
              }}
            >
              Dashboard
            </button>
          )}

          {status === 'unauthenticated' && (
            <button
              className={`btn ${styles.login}`}
              onClick={() => {
                router.push('/login');
              }}
            >
              Sign In
            </button>
          )}
          <button
            className={`btn ${styles.signup}`}
            onClick={() => {
              router.push('/signup');
            }}
          >
            Sign Up
          </button>
        </section>
      </div>
    </header>
  );
};

export default Header;
