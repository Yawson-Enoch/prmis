import { useAppContext } from '@/store/appContext';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import Chart from './Chart/Chart';
import DashboardLayout from './DashboardLayout/DashboardLayout';
import Table from './Table/Table';

const DashboardPage = () => {
  const { state } = useAppContext();

  return (
    <DashboardLayout>
      <div className="flow">
        <Chart />
        <Table />
      </div>
      {state.confirmDialog.active && <DeleteDialog />}
    </DashboardLayout>
  );
};

export default DashboardPage;
