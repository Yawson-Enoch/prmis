import Backdrop from '../../../components/Backdrop/Backdrop';
import SinglePatientPage from '../../../components/Dashboard/SinglePatientPage/SinglePatientPage';
import EditPatientDetailsForm from '../../../components/EditPatientDetailsForm/EditPatientDetailsForm';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import { useAppContext } from '../../../store/appContext';

const SinglePatient = () => {
  const { state } = useAppContext();
  return (
    <>
      <SinglePatientPage />
      {state.showPatientDetailsEditForm && <EditPatientDetailsForm />}
      {state.showBackdrop && <Backdrop />}
      {state.notification.active && <NotificationModal />}
    </>
  );
};

export default SinglePatient;
