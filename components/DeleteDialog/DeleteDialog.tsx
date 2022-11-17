import { motion } from 'framer-motion';
import useSWR, { useSWRConfig } from 'swr';
import { scaleUp } from '../../animations/animations';
import { useAppContext } from '@/store/appContext';
import { IAllPatientsResData } from '../Dashboard/AllPatientsPage/AllPatientsPage';
import styles from './DeleteDialog.module.scss';

const DeleteDialog = () => {
  const { dispatch, state } = useAppContext();

  const { data } = useSWR<IAllPatientsResData>('/api/patient');
  const { mutate } = useSWRConfig();

  const deletePatient = async (id: string) => {
    const newData = {
      ...data,
      patients: data?.patients.filter((patient) => patient._id !== id),
    };
    await mutate('/api/patient', newData, false);

    try {
      const response = await fetch(`/api/patient/${id}`, {
        method: 'DELETE',
      });

      const { message }: { message: string } = await response.json();

      if (!response.ok) {
        throw new Error(message || 'Something went wrong!');
      } else {
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            active: true,
            title: 'success',
            description: message || 'Patient deleted.',
            style: 'success',
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          active: true,
          title: 'error',
          description: error.message,
          style: 'error',
        },
      });
    }
  };

  return (
    <motion.form
      className={styles.form}
      variants={scaleUp}
      initial="hide"
      animate="show"
    >
      <p>Are you sure you want to delete?</p>
      <div className={styles.btnsContainer}>
        <button
          type="button"
          className="btn"
          autoFocus
          onClick={() => {
            dispatch({
              type: 'SHOW_BACKDROP',
              payload: false,
            });
            dispatch({
              type: 'SHOW_PATIENT_DELETE_DIALOG',
              payload: false,
            });
          }}
        >
          no
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            deletePatient(state.apiPatientId);
            dispatch({
              type: 'SHOW_BACKDROP',
              payload: false,
            });
            dispatch({
              type: 'SHOW_PATIENT_DELETE_DIALOG',
              payload: false,
            });
          }}
        >
          yes
        </button>
      </div>
    </motion.form>
  );
};

export default DeleteDialog;
