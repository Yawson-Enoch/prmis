import styles from './ChangePasswordPage.module.scss';
import { IMessageFromResData } from '@/lib/types';
import { useAppContext } from '@/store/appContext';
import { FormEvent, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BASE_URL } from 'utils';

const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [passwordInputType, setPasswordInputType] = useState<
    'password' | 'text'
  >('password');

  const canSubmit = [oldPassword, newPassword].every(Boolean);

  const { dispatch } = useAppContext();

  const togglePasswordType = () => {
    setPasswordInputType(
      passwordInputType === 'password' ? 'text' : 'password'
    );
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (oldPassword === newPassword) {
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          active: true,
          description: 'Passwords are the same.',
          theme: 'info',
        },
      });
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/admin/change-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      const { message }: IMessageFromResData = await response.json();

      if (!response.ok) {
        throw new Error(message || 'Something went wrong!');
      } else {
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            active: true,
            description: message || 'Password changed successfully.',
            theme: 'success',
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          active: true,
          description: error.message,
          theme: 'error',
        },
      });
    }
  };

  return (
    <div className='flow'>
      <h1 className='styledbox' style={{ textAlign: 'center' }}>
        Change Password
      </h1>
      <form onSubmit={submitHandler} className={`flow ${styles.form}`}>
        <div className={styles.formField}>
          <label htmlFor='oldPassword'>Old Password</label>
          <input
            type={passwordInputType}
            name='oldPassword'
            id='oldPassword'
            placeholder='Enter Old Password'
            required
            autoComplete='off'
            autoCapitalize='off'
            autoCorrect='off'
            pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
            title='Minimum eight characters, at least one upper case English
                letter, one lower case English letter, one number and one
                special character.'
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
          <p className={styles.errorMessage}>
            Minimum eight characters, at least one upper case English letter,
            one lower case English letter, one number and one special character.
          </p>
        </div>
        <div className={styles.formField}>
          <label htmlFor='newPassword'>New Password</label>
          <input
            type={passwordInputType}
            name='newPassword'
            id='newPassword'
            placeholder='Enter New Password'
            required
            pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
            title='Minimum eight characters, at least one upper case English
                letter, one lower case English letter, one number and one
                special character.'
            autoComplete='off'
            autoCapitalize='off'
            autoCorrect='off'
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span onClick={togglePasswordType}>
            {passwordInputType === 'password' ? (
              <FaEyeSlash />
            ) : (
              <FaEye style={{ color: '#137aca' }} />
            )}
          </span>
          <p className={styles.errorMessage}>
            Minimum eight characters, at least one upper case English letter,
            one lower case English letter, one number and one special character.
          </p>
        </div>
        <button type='submit' className='btn' disabled={!canSubmit}>
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
