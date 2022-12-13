import { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import styles from './DashboardLayout.module.scss';
import { useAppContext } from '@/store/appContext';
import ConfirmDialog from '@/components/ConfirmDialog/ConfirmDialog';
import NotificationModal from '@/components/NotificationModal/NotificationModal';
import EditPatientDetailsForm from '@/components/EditPatientDetailsForm/EditPatientDetailsForm';
import Backdrop from '@/components/Backdrop/Backdrop';
import { AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { state } = useAppContext();
  return (
    <div>
      <Sidebar />
      <Navbar />
      <div className={styles.children}>{children}</div>
      {state.showBackdrop && <Backdrop />}
      <AnimatePresence key="notification-modal">
        {state.notification.active && <NotificationModal />}
      </AnimatePresence>
      <AnimatePresence key="confirm-dialog">
        {state.confirmDialog.active && <ConfirmDialog />}
      </AnimatePresence>
      <AnimatePresence key="edit-patient-details">
        {state.showPatientDetailsEditForm && <EditPatientDetailsForm />}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
