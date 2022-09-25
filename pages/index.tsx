import type { NextPage } from 'next';
import Head from 'next/head';
import HomePage from '../components/HomePage/HomePage';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Obeyeyie Medical Center</title>
        <meta
          name="description"
          content="Welcome to Obeyeyie Medical Center."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <HomePage />
    </>
  );
};

export default Home;
