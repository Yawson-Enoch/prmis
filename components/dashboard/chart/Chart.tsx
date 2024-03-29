import styles from './Chart.module.scss';
import { IAllPatientsResData } from '@/lib/types';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import useSWR from 'swr';
import { BASE_URL } from 'utils';

const DAYS_OF_THE_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Chart = () => {
  const { data } = useSWR<IAllPatientsResData>(`${BASE_URL}/patients`, {
    suspense: true,
  });

  const weeklyTotalNumberOfPatients = (day: string): number => {
    return data!.patients
      .map((patient) => {
        return { name: DAYS_OF_THE_WEEK[new Date(patient.createdAt).getDay()] };
      })
      .filter((patient) => patient.name === day).length;
  };

  const chartData = [
    {
      name: 'Sun',
      total: weeklyTotalNumberOfPatients('Sun'),
    },
    {
      name: 'Mon',
      total: weeklyTotalNumberOfPatients('Mon'),
    },
    {
      name: 'Tue',
      total: weeklyTotalNumberOfPatients('Tue'),
    },
    {
      name: 'Wed',
      total: weeklyTotalNumberOfPatients('Wed'),
    },
    {
      name: 'Thu',
      total: weeklyTotalNumberOfPatients('Thu'),
    },
    {
      name: 'Fri',
      total: weeklyTotalNumberOfPatients('Fri'),
    },
    {
      name: 'Sat',
      total: weeklyTotalNumberOfPatients('Sat'),
    },
  ];

  return (
    <div className={`styledbox ${styles.box}`}>
      <p style={{ marginBottom: '0.7rem' }}>WEEKLY COUNT OF PATIENTS</p>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart width={730} height={250} data={chartData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey='total' fill='#9999ff' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
