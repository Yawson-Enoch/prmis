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
      notification: { description, theme },
    },
    dispatch,
  } = useAppContext();

  return ReactDOM.createPortal(
    <motion.div
      className={styles[theme]}
      variants={slideLeft}
      initial='hide'
      animate='show'
      exit='hide'
    >
      <div className={styles.iconContainer}>
        {theme === 'success' && <TiTick className={styles.icon} />}
        {theme === 'error' && <MdOutlineErrorOutline className={styles.icon} />}
        {theme === 'info' && <TiInfoLarge className={styles.icon} />}
        {theme === 'warning' && <TiWarningOutline className={styles.icon} />}
      </div>
      <div className={styles.textBox}>
        <p className={styles.title}>{theme}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div
        className={styles.close}
        onClick={() => {
          dispatch({
            type: 'NOTIFICATION',
            payload: {
              theme,
              active: false,
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
