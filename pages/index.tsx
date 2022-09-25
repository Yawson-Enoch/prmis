import type { NextPage } from 'next';
import Head from 'next/head';
import Login from '../components/UserAuth/Login';
// import Logo from '../components/Logo/Logo';

const Home: NextPage = () => {
  return (
    <main>
      <div className='wrapper'>
        <Head>
          <title>Obeyeyie Medical Center</title>
          <meta
            name='description'
            content='Welcome to Obeyeyie Medical Center.'
          />
          <link rel='icon' href='/favicon.png' />
        </Head>
        {/* <Logo /> */}
        <Login />
      </div>
    </main>
  );
};

export default Home;
