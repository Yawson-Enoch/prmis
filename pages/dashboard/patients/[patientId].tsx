import SinglePatientPage from '@/components/dashboard/single-patient/SinglePatientPage';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import Head from 'next/head';
import { useRouter } from 'next/router';

const SinglePatient = () => {
  const { asPath } = useRouter();
  const cleanPath = asPath.split('#')[0].split('?')[0];
  const canonicalUrl = asPath === '/' ? '' : cleanPath;

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <SinglePatientPage />
    </>
  );
};

SinglePatient.PageLayout = DashboardLayout;
export default SinglePatient;
