import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { flash } from '../../animations/animations';
import styles from './Backdrop.module.scss';

const Backdrop = () => {
  return ReactDOM.createPortal(
    <motion.div
      variants={flash}
      animate="animate"
      initial="initial"
      className={styles.backdrop}
    ></motion.div>,
    document.getElementById('backdrop') as HTMLDivElement
  );
};

export default Backdrop;
