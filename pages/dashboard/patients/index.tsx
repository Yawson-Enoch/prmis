import AllPatientsPage from '@/components/dashboard/all-patients-table-max/AllPatientsPage';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
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

AllPatients.PageLayout = DashboardLayout;
export default AllPatients;
