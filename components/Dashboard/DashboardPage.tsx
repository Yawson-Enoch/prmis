import Chart from './Chart/Chart';
import DashboardLayout from './DashboardLayout/DashboardLayout';
import Table from './Table/Table';

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div className="flow">
        <Chart />
        <Table />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
