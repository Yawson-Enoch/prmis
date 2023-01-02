import styles from './Logo.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <div className={`center ${styles.companyInfo}`}>
      <div className={styles.logo}>
        <Link href='/'>
          <a className='center'>
            <Image
              src='/assets/cover/logo.png'
              alt='PRMIS logo'
              width={40}
              height={40}
              priority
            ></Image>
          </a>
        </Link>
      </div>

      <div className={`${styles.nameAndMotto} flow`}>
        <p>PRMIS</p>

        <p>We prioritize your health</p>
      </div>
    </div>
  );
};

export default Logo;
