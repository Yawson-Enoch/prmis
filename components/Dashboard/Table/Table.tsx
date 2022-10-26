import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Image from 'next/image';
import useSWR from 'swr';
import styles from './Table.module.scss';

const Table = () => {
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

  const newData = data.patients.slice(-3);

  return (
    <>
      <p>RECENTLY ADDED PATIENTS</p>
      <TableContainer component={Paper} className={styles.table}>
        <MTable sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={styles.tableCell}>ID</TableCell>
              <TableCell className={styles.tableCell}>Patient Info</TableCell>
              <TableCell className={styles.tableCell}>Email</TableCell>
              <TableCell className={styles.tableCell}>Age</TableCell>
              <TableCell className={styles.tableCell}>Gender</TableCell>
              <TableCell className={styles.tableCell}>Phone</TableCell>
              <TableCell className={styles.tableCell}>Date Added</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newData.map((row: any) => (
              <TableRow key={row._id}>
                <TableCell className={styles.tableCell}>{row._id}</TableCell>
                <TableCell className={styles.tableCell}>
                  <div className={styles.cellWrapper}>
                    <Image
                      src={row?.image || '/assets/patients/user.png'}
                      alt={row.firstName}
                      width={30}
                      height={30}
                      className={styles.cellImage}
                    />
                    {row.name}
                  </div>
                </TableCell>
                <TableCell className={styles.tableCell}>{row.email}</TableCell>
                <TableCell className={styles.tableCell}>{row.age}</TableCell>
                <TableCell className={styles.tableCell}>{row.gender}</TableCell>
                <TableCell className={styles.tableCell}>{row.phone}</TableCell>
                <TableCell className={styles.tableCell}>
                  {row.createdAt}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MTable>
      </TableContainer>
    </>
  );
};

export default Table;