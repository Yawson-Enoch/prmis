import { NextPage } from 'next';
import LoginPage from '@/components/home/auth/LoginPage';
import Head from 'next/head';

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="/login" />
      </Head>
      <LoginPage />
    </>
  );
};

export default Login;
