import Image from 'next/image';
import Link from 'next/link';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <div className={styles.companyInfo}>
      <div className={styles.logo}>
        <Link href='/'>
          <a className='center'>
            <Image
              src='/assets/cover/logo.png'
              alt='Obeyeyie Medical Center logo'
              width={45}
              height={45}
            ></Image>
          </a>
        </Link>
      </div>

      <div className={`${styles.nameAndMotto} flow`}>
        <p>Obeyeyie Medical Center</p>

        <p>We prioritize your health</p>
      </div>
    </div>
  );
};

export default Logo;