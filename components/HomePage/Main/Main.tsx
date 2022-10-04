import styles from './Main.module.scss';
import { slides } from '../../../data/slides';
import ImageSlider from '../../ImageSlider/ImageSlider';

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
