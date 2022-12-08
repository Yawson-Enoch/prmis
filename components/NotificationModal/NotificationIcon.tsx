import { MdInfo, MdCheckCircle, MdError } from 'react-icons/md';
import { useAppContext } from '@/store/appContext';

export const notificationColors = (
  colorDesc: 'success' | 'error' | 'info' | null
) => {
  if (colorDesc === 'success') {
    return 'green';
  }
  if (colorDesc === 'error') {
    return 'red';
  }
  if (colorDesc === 'info') {
    return 'blue';
  }
};

const NotificationIcon = () => {
  const {
    state: {
      notification: { style },
    },
    dispatch,
  } = useAppContext();

  let notificationIcon = <MdCheckCircle />;

  if (style === 'success') {
    notificationIcon = <MdCheckCircle />;
  }

  if (style === 'error') {
    notificationIcon = <MdError />;
  }

  if (style === 'info') {
    notificationIcon = <MdInfo />;
  }

  return (
    <div
      style={{
        color: `${notificationColors(style)}`,
        fontSize: '3.5rem',
      }}
    >
      {notificationIcon}
    </div>
  );
};

export default NotificationIcon;
