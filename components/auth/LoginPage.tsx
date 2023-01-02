import styles from './LoginPage.module.scss';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordInputType, setPasswordInputType] = useState<
    'password' | 'text'
  >('password');

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 2000);

      return () => clearInterval(timer);
    }
  }, [errorMessage]);

  const router = useRouter();

  const canSubmit = [email, password].every(Boolean);

  const togglePasswordType = () => {
    setPasswordInputType(
      passwordInputType === 'password' ? 'text' : 'password'
    );
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    result?.error
      ? setErrorMessage(result?.error)
      : router.replace('/dashboard');
  };

  return (
    <main className={`center ${styles.main}`}>
      <div className={`flow ${styles.formContainer}`}>
        <div className={styles.details}>
          <div className={`center ${styles.icon}`}>
            <FaLock />
          </div>
          <p className={styles.title}>Log In</p>
        </div>

        <form className={`flow ${styles.form}`} onSubmit={submitHandler}>
          <div className={styles.formField}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              required
              pattern='[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+'
              onChange={(e) => setEmail(e.target.value)}
              placeholder='enter email'
              autoFocus
            />
            <div className={styles.errorMessage}>Invalid email!</div>
          </div>

          <div className={styles.formField}>
            <label htmlFor='password'>Password</label>
            <div className={styles.passwordControl}>
              <input
                type={passwordInputType}
                id='password'
                required
                onChange={(e) => setPassword(e.target.value)}
                pattern='\S{8,}'
                placeholder='enter password'
              />
              <span onClick={togglePasswordType}>
                {passwordInputType === 'password' ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye style={{ color: '#137aca' }} />
                )}
              </span>
              <div className={styles.errorMessage}>
                Password should be at least 8 characters long. <br /> Must not
                contain whitespace.
              </div>
            </div>
          </div>
          <button type='submit' className='btn' disabled={!canSubmit}>
            Login
          </button>
          {errorMessage && (
            <p
              style={{ color: 'hsla(0, 100%, 50%, 0.8)', marginTop: '0.5rem' }}
            >
              {errorMessage}
            </p>
          )}
        </form>
        <div></div>
        <div className={styles.optionsContainer}>
          <Link href='/signup'>Don&#39;t have an account? Sign Up.</Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
