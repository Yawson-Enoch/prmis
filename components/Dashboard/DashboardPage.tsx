import styles from './DashboardPage.module.scss';
import Sidebar from './Sidebar/Sidebar';
import SideContainer from './SideContainer/SideContainer';

const DashboardPage = () => {
  return (
    <section className={styles.dashContainer}>
      <Sidebar />
      <SideContainer />
    </section>
  );
};

export default DashboardPage;
