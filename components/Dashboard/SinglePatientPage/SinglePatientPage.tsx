import Image from 'next/image';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import useSWR from 'swr';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import styles from './SinglePatientPage.module.scss';
import { FaEdit } from 'react-icons/fa';
import { useAppContext } from '../../../store/appContext';

const SinglePatientPage = () => {
  const router = useRouter();
  const { patientId } = router.query;

  const { dispatch } = useAppContext();

  const { data } = useSWR(`/api/patient/${patientId}`);

  // const [data, setData] = useState({} as any);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(`/api/patient/${patientId}`);
  //       const { patient }: any = await response.json();

  //       if (!response.ok) {
  //         throw new Error('Something went wrong.');
  //       }

  //       setData(patient);
  //     } catch (error: any) {
  //       console.log(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
    <div className={styles.list}>
      <Sidebar />
      <div className={styles.listContainer}>
        <Navbar />
        <div className={styles.infoContainer}>
          <div className={styles.top}>
            <h1>Information</h1>
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
      </div>
    </div>
  );
};

export default SinglePatientPage;
