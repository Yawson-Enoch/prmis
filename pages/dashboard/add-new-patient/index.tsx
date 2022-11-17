import AddNewPatientPage from '@/components/Dashboard/AddNewPatientPage/AddNewPatientPage';
import NotificationModal from '@/components/NotificationModal/NotificationModal';
import { useAppContext } from '@/store/appContext';

const AddNewPatient = () => {
  const { state } = useAppContext();

  return (
    <>
      <AddNewPatientPage />
      {state.notification.active && <NotificationModal />}
    </>
  );
};

export default AddNewPatient;
