import { motion } from 'framer-motion';
import { MdCancel, MdCheckCircle, MdError } from 'react-icons/md';
import { slideLeft } from '../../animations/animations';
import { useAppContext } from '@/store/appContext';
import styles from './NotificationModal.module.scss';

const NotificationModal = () => {
  const {
    state: {
      notification: { title, description, style },
    },
    dispatch,
  } = useAppContext();

  return (
    <motion.div
      className={styles.box}
      variants={slideLeft}
      initial="hide"
      animate="show"
    >
      <div
        style={{
          color: `${style === 'success' ? 'green' : 'red'}`,
          fontSize: '3.5rem',
        }}
      >
        {style === 'success' ? <MdCheckCircle /> : <MdError />}
      </div>
      <div className={styles.textBox}>
        <p
          style={{
            textTransform: 'capitalize',
            color: `${style === 'success' ? 'green' : 'red'}`,
            fontSize: '1.5rem',
            marginBottom: '0.5rem',
          }}
        >
          {title}
        </p>
        <p>{description}</p>
      </div>
      <div
        className={styles.cancelBtn}
        onClick={() => {
          dispatch({
            type: 'NOTIFICATION',
            payload: {
              active: false,
              title: 'success',
              description: '',
              style: 'success',
            },
          });
        }}
      >
        <MdCancel />
      </div>
    </motion.div>
  );
};

export default NotificationModal;
