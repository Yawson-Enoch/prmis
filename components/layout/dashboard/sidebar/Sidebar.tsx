import styles from './Sidebar.module.scss';
import Logo from '@/components/common/logo/Logo';
import { useAppContext } from '@/store/appContext';
import Link from 'next/link';
import {
  MdDashboard,
  MdExitToApp,
  MdOutlineAccountCircle,
  MdPersonOutline,
} from 'react-icons/md';

const Sidebar = () => {
  const { dispatch } = useAppContext();

  return (
    <aside className={`flow ${styles.sidebarContainer}`}>
      <Link href='/'>
        <div className={`center ${styles.logo}`}>
          <Logo />
        </div>
      </Link>
      <div className={styles.sidebarLinks}>
        <ul>
          <p>MAIN</p>
          <li>
            <MdDashboard />
            <Link href='/dashboard'>Dashboard</Link>
          </li>

          <p>LIST</p>
          <li>
            <MdPersonOutline />
            <Link href='/dashboard/patients'>Patients</Link>
          </li>
          <p>PATIENT</p>
          <li>
            <MdOutlineAccountCircle />
            <Link href='/dashboard/change-password'>Profile</Link>
          </li>
          <li>
            <MdExitToApp />
            <p
              onClick={() => {
                dispatch({
                  type: 'CONFIRM_DIALOG',
                  payload: {
                    active: true,
                    description: 'Are you sure you want to log out?',
                    type: 'logOut',
                  },
                });
                dispatch({
                  type: 'SHOW_BACKDROP',
                  payload: true,
                });
              }}
              className={styles.logOut}
            >
              Logout
            </p>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
