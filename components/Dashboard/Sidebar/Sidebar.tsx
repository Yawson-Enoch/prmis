import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  MdDashboard,
  MdExitToApp,
  MdOutlineAccountCircle,
  MdPersonOutline,
} from 'react-icons/md';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const router = useRouter();

  const logOutHandler = () => {
    signOut();
    router.replace('/');
  };
  return (
    <aside className={`flow ${styles.sidebarContainer}`}>
      <Link href="/">
        <a className={styles.logoSecondary}>OMC</a>
      </Link>
      <div className={styles.sidebarLinks}>
        <ul>
          <p>MAIN</p>
          <li>
            <MdDashboard />
            <Link href="/dashboard">Dashboard</Link>
          </li>

          <p>LIST</p>
          <li>
            <MdPersonOutline />
            <Link href="/dashboard/patients">Patients</Link>
          </li>
          <p>PATIENT</p>
          <li>
            <MdOutlineAccountCircle />
            <Link href="/dashboard/change-password">Profile</Link>
          </li>
          <li>
            <MdExitToApp />
            <p onClick={logOutHandler} className={styles.logOut}>
              Logout
            </p>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
