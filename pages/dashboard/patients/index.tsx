import AllPatientsPage from '@/components/dashboard/all-patients-table-max/AllPatientsPage';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import Head from 'next/head';
import { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '@/components/common/error/Error';

const AllPatients = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="/dashboard/patients" />
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
          <AllPatientsPage />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

AllPatients.PageLayout = DashboardLayout;
export default AllPatients;
