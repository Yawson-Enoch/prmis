import styles from '../Hero/Hero.module.scss';
import Logo from '../Logo/Logo';
import { motion } from 'framer-motion';
import { slideLeft } from '../../animations/animations';

const Hero = () => {
  return (
    <section className={styles.heroWrapper}>
      <div className="flow">
        <Logo />
        <motion.p
          className={styles.heroText}
          variants={slideLeft}
          initial="initial"
          animate="animate"
        >
          Obeyeyie Medical Center. <br />
          The home of absolute healing. <br /> Your health is always our
          priority.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
