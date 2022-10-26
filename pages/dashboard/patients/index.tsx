import Backdrop from '../../../components/Backdrop/Backdrop';
import AllPatientsPage from '../../../components/Dashboard/AllPatientsPage/AllPatientsPage';
import DeleteDialog from '../../../components/DeleteDialog/DeleteDialog';
import { useAppContext } from '../../../store/appContext';

const index = () => {
  const { state } = useAppContext();

  return (
    <>
      <AllPatientsPage />
      {state.showBackdrop && <Backdrop />}
      {state.showPatientDeleteDialog && <DeleteDialog />}
    </>
  );
};

export default index;
