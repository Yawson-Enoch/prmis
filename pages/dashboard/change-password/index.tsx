import ChangePasswordPage from '@/components/Dashboard/ChangePasswordPage/ChangePasswordPage';
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

export default ChangePassword;
