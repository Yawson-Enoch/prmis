import ChangePasswordPage from '@/components/dashboard/change-password/ChangePasswordPage';
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
