import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import DashboardPage from '@/components/Dashboard/DashboardPage';
import Head from 'next/head';

const Dashboard = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="/dashboard" />
      </Head>
      <DashboardPage />
    </>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
