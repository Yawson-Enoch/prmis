import { NextPage } from 'next';
import SignUpPage from '@/components/UserAuth/SignUpPage';
import Head from 'next/head';

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="/signup" />
      </Head>
      <SignUpPage />
    </>
  );
};

export default SignUp;
