import { useAppContext } from '@/store/appContext';
import {
  MdOutlineCheckCircle,
  MdOutlineErrorOutline,
  MdOutlineInfo,
} from 'react-icons/md';

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
  } = useAppContext();

  let notificationIcon = <MdOutlineInfo />;

  if (style === 'success') {
    notificationIcon = <MdOutlineCheckCircle />;
  }

  if (style === 'error') {
    notificationIcon = <MdOutlineErrorOutline />;
  }

  if (style === 'info') {
    notificationIcon = <MdOutlineInfo />;
  }

  return (
    <div
      style={{
        color: `${notificationColors(style)}`,
        fontSize: '3rem',
      }}
    >
      {notificationIcon}
    </div>
  );
};

export default NotificationIcon;
