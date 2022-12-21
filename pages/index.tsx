import Head from 'next/head';
import Slider from '@/components/home/Slider';
import IndexLayout from '@/components/layout/home/IndexLayout';

const Home = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="/" />
      </Head>
      <Slider />
    </>
  );
};

Home.PageLayout = IndexLayout;
export default Home;
