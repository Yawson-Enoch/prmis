import AllPatientsDataTable from '../AllPatientsDataTable/AllPatientsDataTable';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import styles from './AllPatientsPage.module.scss';

const AllPatientsPage = () => {
  return (
    <>
      <div className={styles.list}>
        <Sidebar />
        <div className={styles.listContainer}>
          <Navbar />
          <AllPatientsDataTable />
        </div>
      </div>
    </>
  );
};

export default AllPatientsPage;
