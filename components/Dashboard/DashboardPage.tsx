import { useAppContext } from '@/store/appContext';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
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
      {state.confirmDialog.active && <ConfirmDialog />}
    </DashboardLayout>
  );
};

export default DashboardPage;
