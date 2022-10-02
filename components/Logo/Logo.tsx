import Image from 'next/image';
import Link from 'next/link';
import styles from './Logo.module.scss';
import { motion } from 'framer-motion';
import { scaleDown } from '../../animations/animations';

const Logo = () => {
  return (
    <motion.div
      className={styles.companyInfo}
      variants={scaleDown}
      initial="initial"
      animate="animate"
    >
      <div className={styles.logo}>
        <Link href="/">
          <a className="center">
            <Image
              src="/assets/cover/logo.png"
              alt="Obeyeyie Medical Center logo"
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
    </motion.div>
  );
};

export default Logo;
