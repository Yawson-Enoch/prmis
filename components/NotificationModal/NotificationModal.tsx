import ReactDOM from 'react-dom';
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

  const notificationColors = (colorDesc: string | null) => {
    if (colorDesc === 'success') {
      return 'green';
    }
    if (colorDesc === 'error') {
      return 'red';
    }
    return 'blue';
  };

  return ReactDOM.createPortal(
    <motion.div
      className={styles.box}
      variants={slideLeft}
      initial="hide"
      animate="show"
    >
      <div
        style={{
          color: `${notificationColors(style)}`,
          fontSize: '3.5rem',
        }}
      >
        {style === 'success' ? <MdCheckCircle /> : <MdError />}
      </div>
      <div className={styles.textBox}>
        <p
          style={{
            textTransform: 'capitalize',
            color: `${notificationColors(style)}`,
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
              title: null,
              description: null,
              style: null,
            },
          });
        }}
      >
        <MdCancel />
      </div>
    </motion.div>,
    document.getElementById('notification') as HTMLDivElement
  );
};

export default NotificationModal;
