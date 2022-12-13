import AllPatientsPage from '@/components/dashboard/all-patients-table-max/AllPatientsPage';
import Head from 'next/head';

const AllPatients = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="/dashboard/patients" />
      </Head>
      <AllPatientsPage />
    </>
  );
};

export default AllPatients;
