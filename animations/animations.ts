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

export const slideRight = {
  initial: {
    x: -20,
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export const flash = {
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
