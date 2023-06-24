import Toastify from 'toastify-js';

export const deleteResToast = () => {
  return Toastify({
    text: 'Registro eliminado con éxito',
    duration: 3000,
    close: true,
    gravity: 'bottom', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    stopOnFocus: true,
    style: {
      background:
      `linear-gradient(
        40deg,
        hsl(0deg 100% 44%) 0%,
        hsl(0deg 100% 45%) 11%,
        hsl(0deg 100% 46%) 25%,
        hsl(0deg 100% 46%) 49%,
        hsl(0deg 100% 47%) 79%,
        hsl(0deg 100% 48%) 92%,
        hsl(0deg 100% 49%) 100%
      )`
    },
  }).showToast();
};

export const successResToast = (msg) => {
  return Toastify({
    text: `Registro ${msg} con éxito`,
    duration: 3000,
    close: true,
    gravity: 'bottom', // `top` or `bottom`
    position: 'right', // `left`, `center` or `right`
    stopOnFocus: true,
    style: {
      background: `linear-gradient(
        40deg,
        hsl(117deg 99% 39%) 0%,
        hsl(118deg 98% 40%) 11%,
        hsl(119deg 97% 42%) 25%,
        hsl(119deg 95% 44%) 49%,
        hsl(121deg 95% 46%) 79%,
        hsl(122deg 98% 47%) 92%,
        hsl(123deg 100% 48%) 100%
          )`,
    },
  }).showToast();
};
