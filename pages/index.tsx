import Slider from '@/components/home/Slider';
import IndexLayout from '@/components/layout/home/IndexLayout';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <link rel='canonical' href='/' />
      </Head>
      <Slider />
    </>
  );
};

Home.PageLayout = IndexLayout;
export default Home;
