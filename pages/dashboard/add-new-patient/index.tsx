import AddNewPatientPage from '@/components/dashboard/add-new-patient/AddNewPatientPage';
import DashboardLayout from '@/components/layout/dashboard/DashboardLayout';
import Head from 'next/head';

const AddNewPatient = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href="/dashboard/add-new-patient" />
      </Head>
      <AddNewPatientPage />
    </>
  );
};

AddNewPatient.PageLayout = DashboardLayout;
export default AddNewPatient;
