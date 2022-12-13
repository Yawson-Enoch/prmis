import Chart from './chart/Chart';
import DashboardLayout from './layout/DashboardLayout';
import Table from './all-patients-table-min/Table';
import Widget from './patient-total-widget/Widget';

const DashboardPage = () => {
  const topStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '0.6rem',
  };

  return (
    <DashboardLayout>
      <div className="flow">
        <div style={topStyle}>
          <Widget />
          <Chart />
        </div>
        <Table />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
