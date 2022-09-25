import type { NextPage } from 'next';
import Head from 'next/head';
import Hero from '../components/Hero/Hero';

const Home: NextPage = () => {
  return (
    <main>
      <div className="wrapper">
        <Head>
          <title>Obeyeyie Medical Center</title>
          <meta
            name="description"
            content="Welcome to Obeyeyie Medical Center."
          />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Hero />
      </div>
    </main>
  );
};

export default Home;
