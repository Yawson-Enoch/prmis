import Chart from '../Chart/Chart';
import Navbar from '../Navbar/Navbar';
import Table from '../Table/Table';
import Widget from '../Widget/Widget';
import styles from './SideContainer.module.scss';

const SideContainer = () => {
  return (
    <div className={styles.box}>
      <Navbar />
      <Widget />
      <div className={styles.chart}>
        <Chart />
      </div>
      <div className={styles.usersList}>
        <Table />
      </div>
    </div>
  );
};

export default SideContainer;
