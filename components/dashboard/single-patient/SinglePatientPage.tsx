import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';
import useSWR from 'swr';
import { useAppContext } from '@/store/appContext';
import styles from './SinglePatientPage.module.scss';
import { ISinglePatientResData } from '@/lib/types';

const SinglePatientPage = () => {
  const { state, dispatch } = useAppContext();

  const { data } = useSWR<ISinglePatientResData>(
    `/api/patient/${state.apiPatientId}`
  );

  return (
    <>
      {!data ? (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          mt={4}
        >
          <CircularProgress color="info" />
        </Stack>
      ) : (
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
                src={data.patient.image || '/assets/patients/user.png'}
                alt="patient image"
                width={200}
                height={200}
                objectFit="cover"
                objectPosition="center"
                className={styles.patientImg}
              />
            </div>
            <div className={styles.infoDetails}>
              <p className={styles.username}>{data.patient.firstName}</p>
              <p>Email: {data.patient.email}</p>
              <p>Age: {data.patient.age}</p>
              <p>Gender: {data.patient.gender}</p>
              <p>Phone: {data.patient.phone}</p>
              <p>Date Added: {data.patient.createdAt}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePatientPage;
