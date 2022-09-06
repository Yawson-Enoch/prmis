import type { NextPage } from 'next';
import Head from 'next/head';

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
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
          recusandae maxime illum, temporibus quos non dicta cum quidem. Ab
          ducimus ipsam quod impedit sapiente accusantium tempore amet natus
          eveniet dolore.
        </p>
      </div>
    </main>
  );
};

export default Home;
