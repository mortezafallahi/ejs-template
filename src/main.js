import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import './styles/index.css';
import './validate';

window.toast = function ({
  text,
  type,
  duration,
  vertically,
  className,
  closeIcon,
  stopOnFocus,
  horizontally,
}) {
  Toastify({
    text: text,
    duration: duration,
    className: `${type} flex items-center gap-4 ${className}`,
    newWindow: true,
    close: closeIcon,
    gravity: vertically,
    position: horizontally,
    stopOnFocus: stopOnFocus,
  }).showToast();
};
