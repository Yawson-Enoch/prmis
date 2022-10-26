import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import DashboardPage from '../../components/Dashboard/DashboardPage';

const Dashboard = () => {
  return <DashboardPage />;
};

export default Dashboard;

// check auth state on server and redirect swiftly on client - prevents protected route flash
// redirect to login if not logged since dashboard is a protected route
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
