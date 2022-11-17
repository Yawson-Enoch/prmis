import ChangePasswordPage from '@/components/Dashboard/ChangePasswordPage/ChangePasswordPage';
import NotificationModal from '@/components/NotificationModal/NotificationModal';
import { useAppContext } from '@/store/appContext';

const ChangePassword = () => {
  const { state } = useAppContext();

  return (
    <>
      <ChangePasswordPage />
      {state.notification.active && <NotificationModal />}
    </>
  );
};

export default ChangePassword;
