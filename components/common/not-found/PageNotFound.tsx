import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './PageNotFound.module.scss';

const PageNotFound = () => {
  const router = useRouter();

  const goToHome = () => {
    router.replace('/');
  };

  return (
    <section className={styles.mainBox}>
      <div className={styles.imgBox}>
        <Image
          src={'/assets/others/404-error.png'}
          alt="Page not found"
          width={250}
          height={250}
          objectFit="cover"
          objectPosition="center"
          className={styles.image}
        />
      </div>
      <div className={styles.descBox}>
        <p>This is definitely not the page your are looking for.</p>
        <button
          type="button"
          className={`btn ${styles.btn}`}
          onClick={goToHome}
        >
          Go To Home
        </button>
      </div>
    </section>
  );
};

export default PageNotFound;
