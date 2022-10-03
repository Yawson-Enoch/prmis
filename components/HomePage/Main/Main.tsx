import Image from 'next/image';
import styles from './Main.module.scss';

const services = [
  {
    id: 1,
    image: '/assets/services/service-image',
    title: 'Emergency Service',
    description:
      'Obeyeyie Medical Center provide 24/7 quick response to your emergencies with world-class ambulances distributed accross the city.',
  },
  {
    id: 2,
    image: '/assets/services/service-image',
    title: 'Counseling',
    description: `Obeyeyie Medical Center have the best counselors available in the country. We provide world-class treatment services for our patients with any health-related problems.`,
  },
  {
    id: 3,
    image: '/assets/services/service-image',
    title: 'Lab Tests',
    description: `Obeyeyie Medical Center have the best laboratories available in the country. We have super-talented laboratory technicians who make sure that there is thorough checks on lab samples to provide accurate results.`,
  },
  {
    id: 4,
    image: '/assets/services/service-image',
    title: 'Health Checkups',
    description: `We provide 24/7 checkups.`,
  },
];

const Main = () => {
  return (
    <main>
      <div className={`wrapper flow ${styles.mainWrapper}`}>
        <h1 style={{ textAlign: 'center' }}>Services We Offer</h1>
        <ul className={styles.servicesContainer}>
          {services.map(({ id, image, title, description }) => {
            return (
              <li key={id} className={`flow ${styles.serviceContainer}`}>
                <div className={styles.imageContainer}>
                  <Image
                    src={`${image}${id}.jpg`}
                    width={500}
                    height={300}
                    alt={title}
                  />
                </div>
                <h2>{title}</h2>
                <p>{description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default Main;
