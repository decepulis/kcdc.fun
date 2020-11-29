let layers = [];
let frame;

export const initialize = (selector) => {
  layers = document.querySelectorAll(selector);
  frame = requestAnimationFrame(update);
};

export const clear = () => {
  cancelAnimationFrame(frame);
};

const update = () => {
  frame = requestAnimationFrame(update);
  const y = window.pageYOffset;
  for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
    const offset = (-y * layerIndex) / (layers.length - 1);
    const transform = `translate3d(0,${offset.toFixed(2)}px, 0)`;
    layers[layerIndex].style.transform = transform;
  }
};
