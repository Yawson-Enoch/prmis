import { ReactNode } from 'react';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import styles from './DashboardLayout.module.scss';
import { useAppContext } from '@/store/appContext';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const ConfirmDialog = dynamic(
  () => import('@/components/common/confirm-dialog/ConfirmDialog'),
  {
    ssr: false,
  }
);
const NotificationModal = dynamic(
  () => import('@/components/common/notification/NotificationModal'),
  {
    ssr: false,
  }
);
const EditPatientDetailsForm = dynamic(
  () =>
    import(
      '@/components/dashboard/edit-patient-details/EditPatientDetailsForm'
    ),
  {
    ssr: false,
  }
);
const Backdrop = dynamic(
  () => import('@/components/common/backdrop/Backdrop'),
  {
    ssr: false,
  }
);

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { state } = useAppContext();
  return (
    <>
      <Sidebar />
      <Navbar />
      <main className={styles.children}>{children}</main>
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
    </>
  );
};

export default DashboardLayout;
