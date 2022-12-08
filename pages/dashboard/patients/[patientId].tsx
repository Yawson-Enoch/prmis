import SinglePatientPage from '@/components/Dashboard/SinglePatientPage/SinglePatientPage';
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

export default SinglePatient;
