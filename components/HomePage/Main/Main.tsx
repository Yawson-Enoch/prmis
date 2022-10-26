import styles from './Main.module.scss';
import ImageSlider from '../../ImageSlider/ImageSlider';

const slides = [
  {
    id: 1,
    image: '/assets/services/service-image1.jpg',
    title: 'Emergency Service',
    description:
      'Obeyeyie Medical Center provide 24/7 quick response to your emergencies with world-class ambulances distributed accross the city.',
  },
  {
    id: 2,
    image: '/assets/services/service-image2.jpg',
    title: 'Counseling',
    description: `Obeyeyie Medical Center have the best counselors available in the country. We provide world-class treatment services for our patients with any health-related problems.`,
  },
  {
    id: 3,
    image: '/assets/services/service-image3.jpg',
    title: 'Lab Tests',
    description: `We have super-talented laboratory technicians who make sure that there is thorough checks on lab samples to provide accurate results.`,
  },
  {
    id: 4,
    image: '/assets/services/service-image4.jpg',
    title: 'Health Checkups',
    description: `We provide 24/7 checkups.`,
  },
];

const Main = () => {
  return (
    <main>
      <div className="wrapper">
        <div className={styles.sliderContainer}>
          <ImageSlider slides={slides} />
        </div>
      </div>
    </main>
  );
};

export default Main;
