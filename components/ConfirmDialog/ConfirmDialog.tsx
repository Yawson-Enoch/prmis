import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import useSWR, { useSWRConfig } from 'swr';
import { scaleUp } from '../../animations/animations';
import { useAppContext } from '@/store/appContext';
import { IAllPatientsResData } from '../Dashboard/AllPatientsPage/AllPatientsPage';
import styles from './ConfirmDialog.module.scss';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const ConfirmDialog = () => {
  const { dispatch, state } = useAppContext();
  const router = useRouter();

  const { data } = useSWR<IAllPatientsResData>('/api/patient');
  const { mutate } = useSWRConfig();

  const logOutHandler = () => {
    signOut();
    router.replace('/');
  };

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

  return ReactDOM.createPortal(
    <motion.form
      className={styles.form}
      variants={scaleUp}
      initial="hide"
      animate="show"
      exit="hide"
    >
      <p className={styles.desc}>{state.confirmDialog.description}</p>
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
              type: 'CONFIRM_DIALOG',
              payload: {
                active: false,
                description: null,
                type: null,
              },
            });
          }}
        >
          no
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            if (state.confirmDialog.type === 'deleteUser') {
              state.apiPatientId && deletePatient(state.apiPatientId);
            } else if (state.confirmDialog.type === 'logOut') {
              logOutHandler();
            }

            dispatch({
              type: 'SHOW_BACKDROP',
              payload: false,
            });

            dispatch({
              type: 'CONFIRM_DIALOG',
              payload: {
                active: false,
                description: null,
                type: null,
              },
            });
          }}
        >
          yes
        </button>
      </div>
    </motion.form>,
    document.getElementById('confirm-dialog') as HTMLDivElement
  );
};

export default ConfirmDialog;
