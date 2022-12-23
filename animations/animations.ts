import { Variants } from 'framer-motion';

export const scaleUp: Variants = {
  hide: {
    translateX: '100%',
    translateY: '-50%',
    scale: 0.5,
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
  show: {
    translateX: '-50%',
    translateY: '-50%',
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export const slideLeft: Variants = {
  hide: {
    x: 100,
    opacity: 0,
    scale: 0.9,
  },
  show: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
};

export const flash: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.05,
    },
  },
};
