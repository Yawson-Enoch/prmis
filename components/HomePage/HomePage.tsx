import Hero from '../Hero/Hero';
import Login from '../UserAuth/Login';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <main className={styles.main}>
      <Login />
      <Hero />
    </main>
  );
};

export default HomePage;
