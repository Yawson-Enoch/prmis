import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import DashboardIndexPage from '@/components/dashboard/DashboardIndexPage';
import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '@/components/common/error/Error';

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
      <ErrorBoundary fallback={<Error text="Could not fetch data." />}>
        <Suspense
          fallback={
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              mt={4}
            >
              <CircularProgress color="info" />
            </Stack>
          }
        >
          <DashboardIndexPage />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

Dashboard.PageLayout = DashboardLayout;
export default Dashboard;
