import { slideLeft } from '../../../animations/animations';
import NotificationIcon, { notificationColors } from './NotificationIcon';
import styles from './NotificationModal.module.scss';
import { useAppContext } from '@/store/appContext';
import { motion } from 'framer-motion';
import ReactDOM from 'react-dom';
import { MdCancel } from 'react-icons/md';

const NotificationModal = () => {
  const {
    state: {
      notification: { title, description, style },
    },
    dispatch,
  } = useAppContext();

  return ReactDOM.createPortal(
    <motion.div
      className={styles.box}
      variants={slideLeft}
      initial='hide'
      animate='show'
      exit='hide'
    >
      <NotificationIcon />
      <div className={styles.textBox}>
        <p
          style={{
            textTransform: 'capitalize',
            color: `${notificationColors(style)}`,
            fontSize: '1.3rem',
            marginBottom: '0.2rem',
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
