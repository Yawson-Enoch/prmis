import AddNewPatientPage from '@/components/Dashboard/AddNewPatientPage/AddNewPatientPage';
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

export default AddNewPatient;
