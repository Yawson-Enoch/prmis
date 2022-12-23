import Error from '@/components/common/error/Error';
import SinglePatientPage from '@/components/dashboard/single-patient/SinglePatientPage';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const SinglePatient = () => {
  const { asPath } = useRouter();
  const cleanPath = asPath.split('#')[0].split('?')[0];
  const canonicalUrl = asPath === '/' ? '' : cleanPath;

  return (
    <>
      <Head>
        <link rel='canonical' href={canonicalUrl} />
      </Head>
      <ErrorBoundary fallback={<Error text='Could not fetch data.' />}>
        <Suspense
          fallback={
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='center'
              mt={4}
            >
              <CircularProgress color='info' />
            </Stack>
          }
        >
          <SinglePatientPage />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

SinglePatient.PageLayout = DashboardLayout;
export default SinglePatient;
