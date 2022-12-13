import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { ChangeEvent, FormEvent, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { scaleUp } from '../../../animations/animations';
import { useAppContext } from '@/store/appContext';
import styles from './EditPatientDetailsForm.module.scss';
import { ISinglePatientResData } from '../single-patient/SinglePatientPage';

const EditPatientDetailsForm = () => {
  const { dispatch, state } = useAppContext();
  const { data } = useSWR<ISinglePatientResData>(
    `/api/patient/${state.apiPatientId}`
  );
  const { mutate } = useSWRConfig();

  const { firstName, lastName, email, phone } = data!.patient;

  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email,
    phone,
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.type;
    const name = e.target.name;

    const value = type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    const newData = {
      ...data,
      patient: { ...data?.patient, ...formData },
    };

    await mutate(`/api/patient/${state.apiPatientId}`, newData, false);

    try {
      const response = await fetch(`/api/patient/${state.apiPatientId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const { message }: { message: string } = await response.json();

      if (!response.ok) {
        throw new Error(message || 'Something went wrong!');
      } else {
        dispatch({
          type: 'SHOW_BACKDROP',
          payload: false,
        });
        dispatch({
          type: 'SHOW_PATIENT_DETAILS_EDIT_FORM',
          payload: false,
        });
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            active: true,
            title: 'success',
            description: message || 'Patient info updated successfully',
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

  return ReactDOM.createPortal(
    <motion.section
      className={`flow ${styles.formContainer}`}
      variants={scaleUp}
      initial="hide"
      animate="show"
      exit="hide"
    >
      <p>Edit Patient Details</p>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.box}>
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
              title="First name must be 2-16 characters long - all lowercase."
            />
            <label htmlFor="firstName">First Name</label>
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
              title="Last name must be 2-16 characters long - all lowercase."
            />
            <label htmlFor="lastName">Last Name</label>
          </div>
        </div>
        <div className={styles.box}>
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
              title="Invalid email!"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles.formField}>
            <input
              type="tel"
              required
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={changeHandler}
              placeholder="+233000000000"
              pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
              title="Incorrect format! Example: 000-000-0000"
            />
            <label htmlFor="phone">Phone</label>
          </div>
        </div>
        <div className={styles.btnsBox}>
          <button
            type="button"
            className="btn"
            onClick={() => {
              dispatch({
                type: 'SHOW_BACKDROP',
                payload: false,
              });
              dispatch({
                type: 'SHOW_PATIENT_DETAILS_EDIT_FORM',
                payload: false,
              });
            }}
          >
            Cancel
          </button>
          <button type="submit" className="btn">
            Change Details
          </button>
        </div>
      </form>
    </motion.section>,
    document.getElementById('edit-patient-form') as HTMLDivElement
  );
};

export default EditPatientDetailsForm;
