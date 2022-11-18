import Backdrop from '@/components/Backdrop/Backdrop';
import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';
import AllPatientsPage from '@/components/Dashboard/AllPatientsPage/AllPatientsPage';
import NotificationModal from '@/components/NotificationModal/NotificationModal';
import { useAppContext } from '@/store/appContext';

const AllPatients = () => {
  const { state } = useAppContext();

  return (
    <>
      <AllPatientsPage />
      {state.showBackdrop && <Backdrop />}
      {state.confirmDialog.active && <ConfirmDialog />}
      {state.notification.active && <NotificationModal />}
    </>
  );
};

export default AllPatients;
