import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Legend,
  Bar,
} from 'recharts';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import useSWR from 'swr';

const DAYS_OF_THE_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Chart = () => {
  const { data } = useSWR('/api/patient');

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

  const weeklyTotalNumberOfPatients = (day: string): number => {
    return data.patients
      .map((user: any) => ({
        name: DAYS_OF_THE_WEEK[new Date(user.createdAt).getDay()],
      }))
      .filter((user: any) => user.name === day).length;
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
    <>
      <p style={{ marginBottom: '1.5rem' }}>WEEKLY COUNT OF PATIENTS</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={730} height={250} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#137aca" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
