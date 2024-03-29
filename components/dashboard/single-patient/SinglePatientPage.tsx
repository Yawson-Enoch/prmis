import styles from './SinglePatientPage.module.scss';
import { ISinglePatientResData } from '@/lib/types';
import { useAppContext } from '@/store/appContext';
import Image from 'next/image';
import { FaEdit } from 'react-icons/fa';
import useSWR from 'swr';
import { BASE_URL } from 'utils';

const SinglePatientPage = () => {
  const { state, dispatch } = useAppContext();

  const { data } = useSWR<ISinglePatientResData>(
    `${BASE_URL}/patients/${state.apiPatientId}`,
    { suspense: true }
  );

  const { image, firstName, email, age, gender, createdAt, phone } =
    data!.patient;

  return (
    <div className='flow'>
      <div className={styles.top}>
        <h1 className='styledbox'>Patient Information</h1>
        <button
          type='button'
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
        <div className='center'>
          <Image
            src={image || '/assets/patients/user.png'}
            alt='patient image'
            width={200}
            height={200}
            objectFit='cover'
            objectPosition='center'
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
  );
};

export default SinglePatientPage;
