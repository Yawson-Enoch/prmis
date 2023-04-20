import { scaleUp } from '../../../animations/animations';
import styles from './ConfirmDialog.module.scss';
import { IAllPatientsResData, IMessageFromResData } from '@/lib/types';
import { useAppContext } from '@/store/appContext';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import ReactDOM from 'react-dom';
import useSWR, { useSWRConfig } from 'swr';
import { BASE_URL } from 'utils';

const ConfirmDialog = () => {
  const { dispatch, state } = useAppContext();

  const { data } = useSWR<IAllPatientsResData>(`${BASE_URL}/patients`);
  const { mutate } = useSWRConfig();

  const logOutHandler = () => {
    signOut();
  };

  const deletePatient = async (id: string) => {
    const newData = {
      ...data,
      patients: data?.patients.filter((patient) => patient._id !== id),
    };
    await mutate(`${BASE_URL}/patients`, newData, false);

    try {
      const response = await fetch(`${BASE_URL}/patients/${id}`, {
        method: 'DELETE',
      });

      const { message }: IMessageFromResData = await response.json();

      if (!response.ok) {
        throw new Error(message || 'Something went wrong!');
      } else {
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            active: true,
            description: message || 'Patient deleted.',
            theme: 'success',
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          active: true,
          description: error.message,
          theme: 'error',
        },
      });
    }
  };

  return ReactDOM.createPortal(
    <motion.form
      className={styles.form}
      variants={scaleUp}
      initial='hide'
      animate='show'
      exit='hide'
    >
      <p className={styles.desc}>{state.confirmDialog.description}</p>
      <div className={styles.btnsContainer}>
        <button
          type='button'
          className='btn'
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
                description: '',
                type: null,
              },
            });
          }}
        >
          no
        </button>
        <button
          type='button'
          className='btn'
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
                description: '',
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
