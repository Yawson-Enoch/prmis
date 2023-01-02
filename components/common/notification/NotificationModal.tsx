import { slideLeft } from '../../../animations/animations';
import styles from './NotificationModal.module.scss';
import { useAppContext } from '@/store/appContext';
import { motion } from 'framer-motion';
import ReactDOM from 'react-dom';
import { FiX } from 'react-icons/fi';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { TiInfoLarge, TiTick, TiWarningOutline } from 'react-icons/ti';

const NotificationModal = () => {
  const {
    state: {
      notification: { title, description, style },
    },
    dispatch,
  } = useAppContext();

  return ReactDOM.createPortal(
    <motion.div
      className={styles[style]}
      variants={slideLeft}
      initial='hide'
      animate='show'
      exit='hide'
    >
      <div className={styles.iconContainer}>
        {style === 'success' && <TiTick className={styles.icon} />}
        {style === 'error' && <MdOutlineErrorOutline className={styles.icon} />}
        {style === 'info' && <TiInfoLarge className={styles.icon} />}
        {style === 'warning' && <TiWarningOutline className={styles.icon} />}
      </div>
      <div className={styles.textBox}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div
        className={styles.close}
        onClick={() => {
          dispatch({
            type: 'NOTIFICATION',
            payload: {
              style,
              active: false,
              title: 'info',
              description: '',
            },
          });
        }}
      >
        <FiX />
      </div>
    </motion.div>,
    document.getElementById('notification') as HTMLDivElement
  );
};

export default NotificationModal;
