import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <div className={styles.homePageLayout}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default HomePage;
