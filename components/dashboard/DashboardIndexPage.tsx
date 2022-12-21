import Chart from './chart/Chart';
import Table from './all-patients-table-min/Table';
import Widget from './patient-total-widget/Widget';

const DashboardIndexPage = () => {
  const topStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '0.6rem',
  };

  return (
    <div className="flow">
      <div style={topStyle}>
        <Widget />
        <Chart />
      </div>
      <Table />
    </div>
  );
};

export default DashboardIndexPage;
