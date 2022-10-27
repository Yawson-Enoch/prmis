import { FormEvent, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAppContext } from '../../../store/appContext';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import styles from './ChangePasswordPage.module.scss';

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [passwordInputType, setPasswordInputType] = useState<
    'password' | 'text'
  >('password');

  const { dispatch } = useAppContext();

  const togglePasswordType = () => {
    setPasswordInputType(
      passwordInputType === 'password' ? 'text' : 'password'
    );
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const { message }: any = await response.json();

      if (!response.ok) {
        throw new Error(message || 'Something went wrong!');
      } else {
        // router.replace('/login');
        // alert('Password Changed Successfully');
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            active: true,
            title: 'success',
            description: message || 'Password changed successfully.',
            style: 'success',
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          active: true,
          title: 'error',
          description: error.message,
          style: 'error',
        },
      });
    }
  };

  return (
    <div className={styles.list}>
      <Sidebar />
      <div className={styles.listContainer}>
        <Navbar />
        <div className={styles.container}>
          <h1>Change Password</h1>
          <form onSubmit={submitHandler} className={`flow ${styles.form}`}>
            <div className={styles.formField}>
              <label htmlFor="oldPassword">Old Password</label>
              <input
                type={passwordInputType}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Old Password"
                required
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
                title="Minimum eight characters, at least one upper case English
                letter, one lower case English letter, one number and one
                special character."
                autoFocus
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span onClick={togglePasswordType}>
                {passwordInputType === 'password' ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye style={{ color: '#137aca' }} />
                )}
              </span>
            </div>
            <div className={styles.formField}>
              <label htmlFor="newPassword">New Password</label>
              <input
                type={passwordInputType}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                required
                pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
                title="Minimum eight characters, at least one upper case English
                letter, one lower case English letter, one number and one
                special character."
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span onClick={togglePasswordType}>
                {passwordInputType === 'password' ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye style={{ color: '#137aca' }} />
                )}
              </span>
            </div>
            <button
              type="submit"
              className="btn"
              style={{ marginLeft: 'auto' }}
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
