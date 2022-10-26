import styles from './DashboardPage.module.scss';
import Sidebar from './Sidebar/Sidebar';
import SideContainer from './SideContainer/SideContainer';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';

const DashboardPage = () => {
  // const { status } = useSession();
  // const router = useRouter();

  // if (status === 'loading') {
  //   return (
  //     <div
  //       className="center"
  //       style={{
  //         position: 'fixed',
  //         inset: 0,
  //         backgroundColor: 'white',
  //         color: 'black',
  //       }}
  //     >
  //       <p style={{ fontSize: '3rem', textAlign: 'center' }}>
  //         Checking Auth State! Please wait a while...
  //       </p>
  //     </div>
  //   );
  // }

  // if (status === 'unauthenticated') {
  // window.location.href = '/login'; //this option resets the entire app state - only ideal for initial load
  // router.replace('/login');
  // }

  return (
    <section className={styles.dashContainer}>
      <Sidebar />
      <SideContainer />
    </section>
  );
};

export default DashboardPage;
