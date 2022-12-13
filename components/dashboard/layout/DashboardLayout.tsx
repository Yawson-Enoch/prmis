import { ReactNode } from 'react';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import styles from './DashboardLayout.module.scss';
import { useAppContext } from '@/store/appContext';
import ConfirmDialog from '@/components/common/confirm-dialog/ConfirmDialog';
import NotificationModal from '@/components/common/notification/NotificationModal';
import EditPatientDetailsForm from '@/components/dashboard/edit-patient-details/EditPatientDetailsForm';
import Backdrop from '@/components/common/backdrop/Backdrop';
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
