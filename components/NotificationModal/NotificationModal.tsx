import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { MdCancel } from 'react-icons/md';
import { slideLeft } from '../../animations/animations';
import { useAppContext } from '@/store/appContext';
import styles from './NotificationModal.module.scss';
import NotificationIcon, { notificationColors } from './NotificationIcon';

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
      initial="hide"
      animate="show"
    >
      <NotificationIcon />
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
