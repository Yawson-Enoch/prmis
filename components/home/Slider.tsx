import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Slider.module.scss';

const slides = [
  {
    id: 1,
    image: '/assets/services/service-image1.jpg',
    title: 'Emergency Service',
    description:
      'PRMIS provides 24/7 quick response to your emergencies with world-class ambulances distributed accross the city.',
  },
  {
    id: 2,
    image: '/assets/services/service-image2.jpg',
    title: 'Counseling',
    description: `PRMIS have the best counselors available in the country. We provide world-class treatment services for our patients with any health-related problems.`,
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

const Slider = () => {
  return (
    <section className="wrapper">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        className={styles.swiper}
      >
        {slides.map((slide) => {
          return (
            <SwiperSlide key={slide.id}>
              <div
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
                className={styles.sliderContent}
              >
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Slider;
