import ChangePasswordPage from '@/components/dashboard/change-password/ChangePasswordPage';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import Head from 'next/head';

const ChangePassword = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="/dashboard/change-password" />
      </Head>
      <ChangePasswordPage />
    </>
  );
};

ChangePassword.PageLayout = DashboardLayout;
export default ChangePassword;
