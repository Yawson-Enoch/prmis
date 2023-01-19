import styles from './AddNewPatientPage.module.scss';
import { IMessageFromResData } from '@/lib/types';
import { useAppContext } from '@/store/appContext';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { MdDriveFolderUpload } from 'react-icons/md';

interface IFormData {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  gender: string;
  phone: string;
  image: string;
}

const AddNewPatientPage = () => {
  const [formData, setFormData] = useState<IFormData>({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    gender: '',
    phone: '',
    image: '',
  });

  const { dispatch } = useAppContext();

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [_, setSelectedFile] = useState<File | null>(null);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const handleFilePicker = () => {
    filePickerRef.current?.click();
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const type = e.target.type;
    const name = e.target.name;

    const value = type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const response = await fetch('/api/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
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
            description: message || 'Patient added.',
            theme: 'success',
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
        image: '',
      });
      setSelectedFile(null);
    } catch (error: any) {
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          active: true,
          description: error.message,
          theme: 'error',
        },
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className='flow'>
      <h1 className='styledbox'>Add New Patient</h1>

      <div className={styles.formContainer}>
        <button className={styles.imgContainer} onClick={handleFilePicker}>
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt='Image preview'
              width={150}
              height={150}
              className={styles.img}
            />
          ) : (
            <p style={{ padding: '0.5rem' }}>Select Image</p>
          )}
        </button>
        <form className={`flow ${styles.form}`} onSubmit={submitHandler}>
          <div className={styles.formInput}>
            <label
              htmlFor='image'
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title='Upload image'
            >
              Image:{' '}
              <MdDriveFolderUpload
                style={{ fontSize: '2rem', marginLeft: '0.2rem' }}
              />
            </label>
            <input
              type='file'
              id='image'
              accept='.jpg,.jpeg,.png'
              style={{ display: 'none' }}
              ref={filePickerRef}
              onChange={(e) => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                  setSelectedFile(file);
                }
              }}
            />
          </div>
          <div className={styles.wrapper}>
            <div className={styles.formInput}>
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={changeHandler}
                placeholder='Enoch'
                required
                pattern='^[a-z0-9_-]{2,15}$'
                title='First name must be 2-16 characters long - all lowercase.'
              />
            </div>
            <div className={styles.formInput}>
              <label htmlFor='lastName'>Last Name</label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                value={formData.lastName}
                required
                onChange={changeHandler}
                placeholder='Gybex'
                pattern='^[a-z0-9_-]{2,15}$'
                title='Last name must be 2-16 characters long - all lowercase.'
              />
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.formInput}>
              <label htmlFor='age'>Age</label>
              <input
                type='number'
                required
                id='age'
                value={formData.age}
                onChange={changeHandler}
                name='age'
                placeholder='20'
                min={1}
              />
            </div>
            <div className={styles.formInput}>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                required
                name='email'
                value={formData.email}
                onChange={changeHandler}
                placeholder='user@gmail.com'
                pattern='[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+'
                title='Invalid email!'
              />
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.formInput}>
              <label htmlFor='phone'>Phone</label>
              <input
                type='tel'
                required
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={changeHandler}
                placeholder='+233000000000'
                pattern='^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'
                title='Incorrect format! Example: 000-000-0000'
              />
            </div>
            <div className={styles.formInputRadioOptions}>
              <p>Gender:</p>

              <div className={styles.formInputRadio}>
                <input
                  type='radio'
                  required
                  name='gender'
                  value='male'
                  id='male'
                  onChange={changeHandler}
                />
                <label htmlFor='male'>Male</label>
              </div>

              <div className={styles.formInputRadio}>
                <input
                  type='radio'
                  required
                  name='gender'
                  value='female'
                  id='female'
                  onChange={changeHandler}
                />
                <label htmlFor='female'>Female</label>
              </div>
            </div>
          </div>

          <button
            type='submit'
            className={`btn ${styles.btn}`}
            disabled={uploading}
          >
            {uploading ? 'Adding Patient...' : 'Add Patient'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewPatientPage;
