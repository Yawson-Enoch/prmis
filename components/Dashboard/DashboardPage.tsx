import Chart from './Chart/Chart';
import DashboardLayout from './DashboardLayout/DashboardLayout';
import Table from './Table/Table';
import Widget from './Widget/Widget';

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
