import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './SignUpPage.module.scss';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [passwordInputType, setPasswordInputType] = useState<
    'password' | 'text'
  >('password');

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }

    return () => clearInterval(timer);
  }, [errorMessage]);

  const router = useRouter();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.type;
    const name = e.target.name;

    const value = type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const togglePasswordType = () => {
    setPasswordInputType(
      passwordInputType === 'password' ? 'text' : 'password'
    );
  };

  const canSubmit = [...Object.values(formData)].every(Boolean);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const { message }: any = await response.json();

      if (!response.ok) {
        throw new Error(message || 'Something went wrong!');
      } else {
        router.replace('/login');
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <main className={`center ${styles.main}`}>
      <div className={`flow ${styles.formContainer}`}>
        <div>
          <p className={styles.formTitle}>Sign Up</p>
        </div>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.userNames}>
            <div className={styles.formField}>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter First Name"
                required
                autoFocus
                value={formData.firstName}
                onChange={changeHandler}
                pattern="^[a-z0-9_-]{2,15}$"
              />
              <label htmlFor="firstName">First Name</label>
              <p className={styles.errorMessage}>
                First name must be 2-16 characters long - all lowercase.
              </p>
            </div>
            <div className={styles.formField}>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter Last Name"
                required
                value={formData.lastName}
                onChange={changeHandler}
                pattern="^[a-z0-9_-]{2,15}$"
              />
              <label htmlFor="lastName">Last Name</label>
              <p className={styles.errorMessage}>
                Last name must be 2-16 characters long - all lowercase.
              </p>
            </div>
          </div>
          <div className={styles.formField}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="name@example.com"
              required
              value={formData.email}
              onChange={changeHandler}
              pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
            />
            <label htmlFor="email">Email</label>
            <p className={styles.errorMessage}>Invalid email!</p>
          </div>
          <div className={styles.formField}>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="+233000000000"
              required
              value={formData.phone}
              onChange={changeHandler}
              pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
            />
            <label htmlFor="phone">Phone Number</label>
            <p className={styles.errorMessage}>
              Incorrect format! <br />
              Example: 000-000-0000
            </p>
          </div>
          <div className={styles.formField}>
            <input
              type={passwordInputType}
              name="password"
              id="password"
              placeholder="Enter Password"
              required
              value={formData.password}
              onChange={changeHandler}
              pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
            />
            <label htmlFor="password">Password</label>
            <span onClick={togglePasswordType}>
              {passwordInputType === 'password' ? (
                <FaEyeSlash />
              ) : (
                <FaEye style={{ color: '#137aca' }} />
              )}
            </span>
            <p className={styles.errorMessage}>
              Minimum eight characters, at least one upper case English letter,
              one lower case English letter, one number and one special
              character.
            </p>
          </div>
          <div className={styles.formField}>
            <input
              type={passwordInputType}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Entered Password"
              required
              pattern={formData.password}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <span onClick={togglePasswordType}>
              {passwordInputType === 'password' ? (
                <FaEyeSlash />
              ) : (
                <FaEye style={{ color: '#137aca' }} />
              )}
            </span>
            <p className={styles.errorMessage}>Passwords do not match!</p>
          </div>
          <button type="submit" className="btn" disabled={!canSubmit}>
            Sign Up
          </button>
          <p
            style={{
              color: 'hsla(0, 100%, 50%, 0.8)',
              marginTop: '0.5rem',
              display: `${errorMessage ? 'block' : 'none'}`,
            }}
          >
            {errorMessage}
          </p>
        </form>
        <div className={styles.loginOption}>
          <Link href="/login">Already have an account? Log In.</Link>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
