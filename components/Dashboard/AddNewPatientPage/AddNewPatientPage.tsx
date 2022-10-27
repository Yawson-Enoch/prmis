import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import { MdCameraAlt, MdDriveFolderUpload } from 'react-icons/md';
import { useAppContext } from '../../../store/appContext';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import styles from './AddNewPatientPage.module.scss';

const AddNewPatientPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    gender: '',
    phone: '',
  });

  const [imagePreview, setImagePreview] = useState({} as any);
  const [imageUrl, setImageUrl] = useState('');
  const { dispatch } = useAppContext();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.type;
    const name = e.target.name;

    const value = type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
          age: Number(formData.age),
        }),
      });

      const { message }: any = await response.json();

      if (!response.ok) {
        throw new Error(message || 'Something went wrong!');
      } else {
        dispatch({
          type: 'NOTIFICATION',
          payload: {
            active: true,
            title: 'success',
            description: message || 'Patient added.',
            style: 'success',
          },
        });
      }

      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        gender: '',
        phone: '',
      });
      setImageUrl('');
      setImagePreview({});
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
          <h1>Add New Patient</h1>

          <div className={styles.formContainer}>
            <div className={styles.imgContainer}>
              {imagePreview[0] ? (
                <Image
                  src={URL.createObjectURL(imagePreview[0])}
                  alt="image preview"
                  width={150}
                  height={150}
                  className={styles.img}
                />
              ) : (
                <MdCameraAlt className={styles.picPlaceholder} />
              )}
            </div>
            <form className={`flow ${styles.form}`} onSubmit={submitHandler}>
              <div className={styles.formInput}>
                <label
                  htmlFor="imagePreview"
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Upload image"
                >
                  Image:{' '}
                  <MdDriveFolderUpload
                    style={{ fontSize: '2rem', marginLeft: '0.2rem' }}
                  />
                </label>
                <input
                  type="file"
                  id="imagePreview"
                  accept=".jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    setImagePreview(e.target.files);
                    setImageUrl(`/assets/patients/${e.target.files![0]?.name}`);
                  }}
                />
              </div>
              <div className={styles.wrapper}>
                <div className={styles.formInput}>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={changeHandler}
                    placeholder="Enoch"
                    required
                    pattern="^[a-z0-9_-]{2,15}$"
                    title="First name must be 2-16 characters long - all lowercase."
                  />
                </div>
                <div className={styles.formInput}>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    required
                    onChange={changeHandler}
                    placeholder="Gybex"
                    pattern="^[a-z0-9_-]{2,15}$"
                    title="Last name must be 2-16 characters long - all lowercase."
                  />
                </div>
              </div>
              <div className={styles.wrapper}>
                <div className={styles.formInput}>
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    required
                    id="age"
                    value={formData.age}
                    onChange={changeHandler}
                    name="age"
                    placeholder="20"
                    min={1}
                  />
                </div>
                <div className={styles.formInput}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder="user@gmail.com"
                    pattern="[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+"
                    title="Invalid email!"
                  />
                </div>
              </div>
              <div className={styles.wrapper}>
                <div className={styles.formInput}>
                  <label htmlFor="phone">Phone</label>
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
                </div>
                <div className={styles.formInputRadioOptions}>
                  <p>Gender:</p>

                  <div className={styles.formInputRadio}>
                    <input
                      type="radio"
                      required
                      name="gender"
                      value="male"
                      id="male"
                      onChange={changeHandler}
                    />
                    <label htmlFor="male">Male</label>
                  </div>

                  <div className={styles.formInputRadio}>
                    <input
                      type="radio"
                      required
                      name="gender"
                      value="female"
                      id="female"
                      onChange={changeHandler}
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
              </div>

              <button type="submit" className={`btn ${styles.btn}`}>
                Add Patient
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewPatientPage;
