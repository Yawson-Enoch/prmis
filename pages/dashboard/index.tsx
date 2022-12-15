import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import DashboardIndexPage from '@/components/dashboard/DashboardIndexPage';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
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

const Dashboard = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="/dashboard" />
      </Head>
      <DashboardIndexPage />
    </>
  );
};

Dashboard.PageLayout = DashboardLayout;
export default Dashboard;
