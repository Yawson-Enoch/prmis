import { flash } from '../../../animations/animations';
import styles from './Backdrop.module.scss';
import { motion } from 'framer-motion';
import ReactDOM from 'react-dom';

const Backdrop = () => {
  return ReactDOM.createPortal(
    <motion.div
      variants={flash}
      animate='animate'
      initial='initial'
      className={styles.backdrop}
    ></motion.div>,
    document.getElementById('backdrop') as HTMLDivElement
  );
};

export default Backdrop;
