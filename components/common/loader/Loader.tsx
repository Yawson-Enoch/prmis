import styles from './Loader.module.scss';

const Loader = ({ size }: { size?: number }) => {
  return (
    <div className={styles.box}>
      <div className={styles.loader}>
        <div style={{ width: `${size}px` }}></div>
        <div style={{ width: `${size}px` }}></div>
        <div style={{ width: `${size}px` }}></div>
      </div>
    </div>
  );
};

export default Loader;
