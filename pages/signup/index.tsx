import SignUpPage from '@/components/auth/SignUpPage';
import { NextPage } from 'next';
import Head from 'next/head';

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <link rel='canonical' href='/signup' />
      </Head>
      <SignUpPage />
    </>
  );
};

export default SignUp;
