import { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import styles from './DashboardLayout.module.scss';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default DashboardLayout;
