import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaEdit } from 'react-icons/fa';
import useSWR from 'swr';
import { useAppContext } from '@/store/appContext';
import { IPatient } from '../AllPatientsPage/AllPatientsPage';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import styles from './SinglePatientPage.module.scss';

interface ISinglePatientResData {
  message: string;
  patient: IPatient;
}

const SinglePatientPage = () => {
  const router = useRouter();
  const { patientId } = router.query;

  const { dispatch } = useAppContext();

  const { data } = useSWR<ISinglePatientResData>(`/api/patient/${patientId}`);

  if (!data) {
    return (
      <Stack
        sx={{ color: 'grey.500' }}
        spacing={4}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress color="success" />
      </Stack>
    );
  }

  const {
    patient: { image, firstName, email, age, gender, phone, createdAt },
  } = data;

  return (
    <DashboardLayout>
      <div className="flow">
        <div className={styles.top}>
          <h1 className="styledbox">Patient Information</h1>
          <button
            type="button"
            className={`btn ${styles.editButton}`}
            onClick={() => {
              dispatch({
                type: 'SHOW_BACKDROP',
                payload: true,
              });
              dispatch({
                type: 'SHOW_PATIENT_DETAILS_EDIT_FORM',
                payload: true,
              });
            }}
          >
            <FaEdit />
            Edit Details
          </button>
        </div>
        <div className={styles.info}>
          <div className="center">
            <Image
              src={image || '/assets/patients/user.png'}
              alt="patient image"
              width={200}
              height={200}
              className={styles.patientImg}
            />
          </div>
          <div className={styles.infoDetails}>
            <p className={styles.username}>{firstName}</p>
            <p>Email: {email}</p>
            <p>Age: {age}</p>
            <p>Gender: {gender}</p>
            <p>Phone: {phone}</p>
            <p>Date Added: {createdAt}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SinglePatientPage;
