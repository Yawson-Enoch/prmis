import styles from './Widget.module.scss';
import { IAllPatientsResData } from '@/lib/types';
import Link from 'next/link';
import { MdPersonOutline } from 'react-icons/md';
import useSWR from 'swr';
import { BASE_URL } from 'utils';

const Widget = () => {
  const { data } = useSWR<IAllPatientsResData>(`${BASE_URL}/patients`, {
    suspense: true,
  });

  return (
    <div className={`styledbox ${styles.box}`}>
      <p>TOTAL NUMBER OF PATIENTS</p>
      <p className={styles.total}>{data?.patients.length}</p>
      <div className={styles.bottom}>
        <Link href='/dashboard/patients'>
          <a>See all patients</a>
        </Link>
        <MdPersonOutline />
      </div>
    </div>
  );
};

export default Widget;
