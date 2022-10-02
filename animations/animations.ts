export const bumpEffect = {
  hover: {
    scale: 1.1,
  },
  tap: {
    scale: 0.9,
  },
};

export const scaleUp = {
  hide: {
    translateX: '-30%',
    translateY: '-30%',
    scale: 0.5,
    opacity: 0,
  },
  show: {
    translateX: '-50%',
    translateY: '-50%',
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};

export const scaleDown = {
  initial: {
    y: -20,
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export const slideLeft = {
  initial: {
    x: 20,
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'tween',
      delay: 0.4,
      duration: 0.3,
    },
  },
};
