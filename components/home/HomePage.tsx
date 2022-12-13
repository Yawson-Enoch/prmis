import Footer from './footer/Footer';
import Header from './header/Header';
import Main from './main/Main';
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
