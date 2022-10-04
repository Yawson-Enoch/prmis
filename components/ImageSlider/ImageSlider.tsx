import { MouseEvent, useState } from 'react';
import {
  FaCircle,
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa';
import styles from './ImageSlider.module.scss';

interface ISliderInfoProps {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface ISliderProps {
  slides: ISliderInfoProps[];
}

const ImageSlider = ({ slides }: ISliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(2);

  const currSlide = slides[currentIndex];

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={`center ${styles.sliderContainer}`}>
      <div
        className={`center ${styles.leftArrow} ${styles.arrow}`}
        onClick={goToPrevious}
      >
        <FaRegArrowAltCircleLeft />
      </div>
      <div
        style={{
          backgroundImage: `url(${currSlide.image})`,
        }}
        className={styles.slider}
      >
        <h2>{currSlide.title}</h2>
        <p>{currSlide.description}</p>
      </div>
      <div
        className={`center ${styles.rightArrow} ${styles.arrow}`}
        onClick={goToNext}
      >
        <FaRegArrowAltCircleRight />
      </div>
      <ul className={`center ${styles.dots}`}>
        {slides.map((_, slideIndex) => {
          return (
            <li
              key={slideIndex}
              onClick={(e: MouseEvent<HTMLLIElement>) => {
                setCurrentIndex(slideIndex);
              }}
            >
              <FaCircle />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ImageSlider;
