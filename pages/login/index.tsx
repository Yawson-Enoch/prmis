import LoginPage from '@/components/auth/LoginPage';
import { NextPage } from 'next';
import Head from 'next/head';

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <link rel='canonical' href='/login' />
      </Head>
      <LoginPage />
    </>
  );
};

export default Login;
