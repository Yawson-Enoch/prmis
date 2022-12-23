import styles from './IndexLayout.module.scss';
import Footer from './footer/Footer';
import Header from './header/Header';
import { ReactNode } from 'react';

const IndexLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.indexLayout}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default IndexLayout;
