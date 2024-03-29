import { BASE_URL, formatDate } from '../../../utils';
import styles from './AllPatientsPage.module.scss';
import { IAllPatientsResData, IReqPatient } from '@/lib/types';
import { useAppContext } from '@/store/appContext';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import useSWR from 'swr';

type DynamicSearchKeys = Pick<
  IReqPatient,
  'firstName' | 'lastName' | 'email' | 'gender'
>;

const AllPatientsPage = () => {
  const { dispatch } = useAppContext();

  const [query, setQuery] = useState('');

  const { data } = useSWR<IAllPatientsResData>(`${BASE_URL}/patients`, {
    suspense: true,
  });

  const router = useRouter();

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 30,
      renderCell: (params) => {
        return <>{`${params.row._id}`}</>;
      },
    },
    {
      field: 'patient',
      headerName: 'Patient Info',
      width: 170,
      renderCell: (params) => {
        return (
          <div className={styles.cellUserInfo}>
            <Image
              src={params.row.image || '/assets/patients/user.png'}
              alt={`${params.row.firstName} ${params.row.lastName}`}
              width={30}
              height={30}
              objectFit='cover'
              objectPosition='center'
              className={styles.cellImage}
            />
            {`${params.row.firstName} ${params.row.lastName}`}
          </div>
        );
      },
    },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'age', headerName: 'Age', width: 10 },
    { field: 'gender', headerName: 'Gender', width: 60 },
    { field: 'phone', headerName: 'Phone', width: 110 },
    {
      field: 'dateAdded',
      headerName: 'Date Added',
      width: 220,
      renderCell: (params) => {
        return <>{`${params.row.createdAt}`}</>;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 190,
      renderCell: (params) => {
        return (
          <div className={styles.cellActions}>
            <button
              className={`btn ${styles.viewBtn}`}
              onClick={() => {
                dispatch({ type: 'API_PATIENT_ID', payload: params.row._id });
                router.push(
                  `/dashboard/patients/${params.row._id}?firstName=${params.row.firstName}&lastName=${params.row.lastName}&date=${params.row.createdAt}`
                );
              }}
            >
              View
            </button>
            <button
              className={`btn ${styles.delBtn}`}
              onClick={() => {
                dispatch({ type: 'API_PATIENT_ID', payload: params.row._id });
                dispatch({
                  type: 'CONFIRM_DIALOG',
                  payload: {
                    active: true,
                    description: 'Are you sure you want to delete?',
                    type: 'deleteUser',
                  },
                });
                dispatch({
                  type: 'SHOW_BACKDROP',
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

  const keys = ['firstName', 'lastName', 'email', 'gender'];
  const newDataWithFormattedDate = data!.patients
    .map((patient) => {
      return {
        ...patient,
        createdAt: formatDate('UK', 'full', new Date(patient.createdAt)),
      };
    })
    .filter((patient) => {
      return keys.some((key) =>
        patient[key as keyof DynamicSearchKeys].toLowerCase().includes(query)
      );
    });

  return (
    <div className={`flow ${styles.dataTable}`}>
      <div className={`styledbox ${styles.tableHeader}`}>
        <h1>Available Patients</h1>
        <form>
          <div className={styles.searchForm}>
            <input
              type='search'
              name='search'
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
        rows={newDataWithFormattedDate}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default AllPatientsPage;
