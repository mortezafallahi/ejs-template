import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import './styles/index.scss';

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

const schema = Yup.object().shape({
  fullName: Yup.string().required('نام و نام خانوادگی الزامی است'),
  email: Yup.string()
    .email('ایمیل وارد شده صحیح نیست')
    .required('ایمیل الزامی است'),
  phone: Yup.string()
    .matches(/^(\+98|0)?9\d{9}$/, 'شماره تلفن وارد شده صحیح نیست')
    .required('شماره تلفن الزامی است'),
  checkbox: Yup.boolean().oneOf([true], 'لطفا قوانین و مقررات را تایید کنید'),
  subject: Yup.string().required('موضوع الزامی است'),
  message: Yup.string()
    .min(10, 'پیام باید حداقل 10 کاراکتر باشد')
    .required('پیام الزامی است'),
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.my-form').forEach((form) => {
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach((input) => {
      input.addEventListener('input', (e) => {
        const errorElement = document.querySelector(`#${e.target.name}-error`);
        let inputValue =
          e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        if (e.target.name === 'phone') {
          inputValue = inputValue.replace(/[\u06F0-\u06F90-9]/g, (d) =>
            '۰۱۲۳۴۵۶۷۸۹'.indexOf(d) > -1 ? '۰۱۲۳۴۵۶۷۸۹'.indexOf(d) : d,
          );
          e.target.value = inputValue;
        }

        schema
          .validateAt(e.target.name, { [e.target.name]: inputValue })
          .then(() => {
            errorElement.innerHTML = '';
          })
          .catch((err) => {
            errorElement.innerHTML = err.message;
          });
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formElements = form.elements;
      const formData = {};

      for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        if (element.name && element.type !== 'submit') {
          formData[element.name] = element.value || element.checked;
        }
      }

      // const formData = {
      //   fullName: document.querySelector("#fullName").value,
      //   email: document.querySelector("#email").value,
      //   phone: document.querySelector("#phone").value,
      //   subject: document.querySelector("#subject").value,
      //   message: document.querySelector("#message").value,
      //   checkbox: document.querySelector("#checkbox").checked,
      // };

      schema
        .validate(formData, { abortEarly: false })
        .then((validData) => {
          // console.log(validData);
        })
        .catch((err) => {
          err.inner.forEach((error) => {
            const errorElement = document.querySelector(
              '#' + error.path + '-error',
            );
            errorElement.innerHTML = error.message;
          });
        });
    });
  });
});
