import styles from './Error.module.scss';
import { MdOutlineErrorOutline } from 'react-icons/md';

const Error = ({ text }: { text: string }) => {
  return (
    <div className={styles.box}>
      <span className={styles.icon}>
        <MdOutlineErrorOutline />
      </span>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Error;
