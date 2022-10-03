import Link from 'next/link';
import { useRef, useState } from 'react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import styles from '../UserAuth/LoginPage.module.scss';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordInputType, setPasswordInputType] = useState<
    'password' | 'text'
  >('password');

  const passwordInputRef = useRef<HTMLInputElement>(null);

  const canSubmit = [email, password].every(Boolean);

  const togglePasswordType = () => {
    setPasswordInputType(
      passwordInputType === 'password' ? 'text' : 'password'
    );
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

        <form className={`flow ${styles.form}`}>
          <div className={styles.formField}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter email"
              autoFocus
            />
            <div className={styles.errorMessage}>Invalid email!</div>
          </div>

          <div className={styles.formField}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordControl}>
              <input
                type={passwordInputType}
                id="password"
                required
                ref={passwordInputRef}
                onChange={(e) => setPassword(e.target.value)}
                pattern="\S{8,}"
                placeholder="enter password"
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
          <div className={styles.trustDevice}>
            <label htmlFor="trust">Trust this device</label>
            <input type="checkbox" name="trust" id="trust" />
          </div>
          <button className="btn" disabled={!canSubmit}>
            Login
          </button>
        </form>
        <div></div>
        <div className={styles.optionsContainer}>
          <a href="#">Forgot password?</a>
          <Link href="/signup">Don't have an account? Sign Up.</Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
