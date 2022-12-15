import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { MdPersonOutline } from 'react-icons/md';
import useSWR from 'swr';
import { IAllPatientsResData } from '../all-patients-table-max/AllPatientsPage';
import styles from './Widget.module.scss';

const Widget = () => {
  const { data } = useSWR<IAllPatientsResData>('/api/patient');

  return (
    <div className={`styledbox ${styles.box}`}>
      <p>TOTAL NUMBER OF PATIENTS</p>
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
        <p className={styles.total}>{data.patients.length}</p>
      )}
      <div className={styles.bottom}>
        <Link href="/dashboard/patients">
          <a>See all patients</a>
        </Link>
        <MdPersonOutline />
      </div>
    </div>
  );
};

export default Widget;
