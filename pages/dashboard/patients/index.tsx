import Backdrop from '@/components/Backdrop/Backdrop';
import AllPatientsPage from '@/components/Dashboard/AllPatientsPage/AllPatientsPage';
import DeleteDialog from '@/components/DeleteDialog/DeleteDialog';
import NotificationModal from '@/components/NotificationModal/NotificationModal';
import { useAppContext } from '@/store/appContext';

const AllPatients = () => {
  const { state } = useAppContext();

  return (
    <>
      <AllPatientsPage />
      {state.showBackdrop && <Backdrop />}
      {state.showPatientDeleteDialog && <DeleteDialog />}
      {state.notification.active && <NotificationModal />}
    </>
  );
};

export default AllPatients;
