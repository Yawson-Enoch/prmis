import { NextPage } from 'next';
import Head from 'next/head';
import HomePage from '@/components/HomePage/HomePage';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="/" />
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
