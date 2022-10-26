import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './AllPatientsDataTable.module.scss';
import useSWR from 'swr';
import { MdOutlineSearch } from 'react-icons/md';
import { useState } from 'react';
import { useAppContext } from '../../../store/appContext';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 70,
    renderCell: (params) => {
      return <>{`${params.row._id}`}</>;
    },
  },
  {
    field: 'patient',
    headerName: 'Patient Info',
    width: 200,
    renderCell: (params) => {
      return (
        <div className={styles.cellUserInfo}>
          <Image
            src={params.row.image || '/assets/patients/user.png'}
            alt={`${params.row.firstName} ${params.row.lastName}`}
            width={30}
            height={30}
            className={styles.cellImage}
          />
          {`${params.row.firstName} ${params.row.lastName}`}
        </div>
      );
    },
  },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'age', headerName: 'Age', width: 50 },
  { field: 'gender', headerName: 'Gender', width: 70 },
  { field: 'phone', headerName: 'Phone', width: 120 },
  {
    field: 'dateAdded',
    headerName: 'Date Added',
    width: 82,
    renderCell: (params) => {
      return <>{`${params.row.createdAt}`}</>;
    },
  },
];

const AllPatientsDataTable = () => {
  // const [patients, setData] = useState([] as any);
  // const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAppContext();

  const [query, setQuery] = useState('');

  const { data } = useSWR('/api/patient');
  const router = useRouter();

  // const patientDeleteHandler = (id: string) => {
  //   setData(patients.filter((patient: any) => patient._id !== id));

  //   const deletePatientFromDb = async () => {
  //     try {
  //       const response = await fetch(`/api/patient/${id}`, {
  //         method: 'DELETE',
  //       });

  //       const { message }: any = await response.json();

  //       if (!response.ok) {
  //         throw new Error(message);
  //       }
  //     } catch (error: any) {}
  //   };
  //   deletePatientFromDb();
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch('/api/patient');
  //       const { patients }: any = await response.json();

  //       if (!response.ok) {
  //         throw new Error('Something went wrong.');
  //       }

  //       setData(patients);
  //     } catch (error: any) {
  //       console.log(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const actionsColumn = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params: any) => {
        return (
          <div className={styles.cellActions}>
            <button
              className={`btn ${styles.viewBtn}`}
              onClick={() => {
                dispatch({ type: 'API_PATIENT_ID', payload: params.row._id });
                router.push(`/dashboard/patients/${params.row._id}`);
              }}
            >
              View
            </button>
            <button
              className={`btn ${styles.delBtn}`}
              onClick={() => {
                // patientDeleteHandler(params.row._id);
                dispatch({ type: 'API_PATIENT_ID', payload: params.row._id });
                dispatch({
                  type: 'SHOW_BACKDROP',
                  payload: true,
                });
                dispatch({
                  type: 'SHOW_PATIENT_DELETE_DIALOG',
                  payload: true,
                });
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  // if (!patients || isLoading) {
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

  const keys = ['firstName', 'lastName', 'email', 'gender'];

  const searchResults = data.patients.filter((patient: any) => {
    return keys.some((key: any) => patient[key].toLowerCase().includes(query));
  });

  return (
    <div className={`flow ${styles.dataTable}`}>
      <div className={styles.tableHeader}>
        <h1>Available Patients</h1>
        <form>
          <div className={styles.searchForm}>
            <input
              type="search"
              name="search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <MdOutlineSearch />
          </div>
        </form>
        <button
          className={`btn ${styles.btn}`}
          onClick={() => {
            router.push('/dashboard/add-new-patient');
          }}
        >
          Add Patient
        </button>
      </div>
      <DataGrid
        // rows={patients}
        rows={searchResults}
        columns={columns.concat(actionsColumn)}
        pageSize={6}
        rowsPerPageOptions={[6]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default AllPatientsDataTable;
