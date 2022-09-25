import styles from '../Hero/Hero.module.scss';
import Logo from '../Logo/Logo';

const Hero = () => {
  return (
    <section className={`center ${styles.heroWrapper}`}>
      <div className="flow">
        <Logo />
        <p className={styles.heroText}>
          Obeyeyie Medical Center. <br />
          The home of absolute healing. <br /> Your health is always our
          priority.
        </p>
      </div>
    </section>
  );
};

export default Hero;
