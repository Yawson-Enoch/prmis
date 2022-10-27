import { useSession } from 'next-auth/react';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <header className={styles.box}>
      <ul>
        <li>
          <p className={styles.name}>
            Hi <span>{session?.user?.name ?? 'admin'}</span>
          </p>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
