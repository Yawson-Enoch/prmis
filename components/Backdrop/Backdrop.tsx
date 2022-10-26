import styles from './Backdrop.module.scss';
import { motion } from 'framer-motion';
import { flash } from '../../animations/animations';

const Backdrop = () => {
  return (
    <motion.div
      variants={flash}
      animate="animate"
      initial="initial"
      className={styles.backdrop}
    ></motion.div>
  );
};

export default Backdrop;
