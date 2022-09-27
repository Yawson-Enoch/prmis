import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './SignUp.module.scss';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [passwordInputType, setPasswordInputType] = useState<
    'password' | 'text'
  >('password');

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

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    // send data to DB and redirect to login: no need to reset fields on submit
  };

  return (
    <main className={styles.main}>
      <section className={`flow ${styles.formContainer}`}>
        <div>
          <p className={styles.formTitle}>Patient Sign Up</p>
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
                First name must be 2-16 characters long.
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
                Last name must be 2-16 characters long.
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
              name="phoneNumber"
              id="phoneNumber"
              placeholder="+233 000 000 000"
              required
              value={formData.phoneNumber}
              onChange={changeHandler}
              pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
            />
            <label htmlFor="phoneNumber">Phone Number</label>
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
        </form>
        <div className={styles.loginOption}>
          <Link href="/">Already have an account? Log In.</Link>
        </div>
      </section>
    </main>
  );
};

export default SignUp;
