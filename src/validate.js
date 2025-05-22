// Persian text validation function
function isPersianText(value) {
  const persianLettersPattern = /^[\u0600-\u06FF\s]+$/;
  return persianLettersPattern.test(value);
}

// English text validation function
function isEnglishText(value) {
  const englishLettersPattern = /^[a-zA-Z\s]+$/;
  return englishLettersPattern.test(value);
}


// Password validation function
function isValidPassword(password) {
  // Check if password is at least 8 characters long
  if (password.length < 8) {
      return false;
  }
  
  // Check if password contains at least one uppercase letter
  const hasUppercase = /[A-Z]/.test(password);
  
  // Check if password contains at least one number
  const hasNumber = /[0-9]/.test(convertInvalidCharacter(password));
  
  // Check if password contains at least one special character
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  // Check if password contains only English characters, numbers and special characters
  const validChars = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(password);
  
  // Return true only if all conditions are met
  return hasUppercase && hasNumber && hasSpecialChar && validChars;
}


// National ID Validation Function
function validator(val) { 
var allDigitEqual = ["0000000000", "1111111111", "2222222222", "3333333333", "4444444444", "5555555555", "6666666666", "7777777777", "8888888888", "9999999999"];
var codeMelliPattern = /^([0-9]{10})+$/;
if (allDigitEqual.indexOf(val) != -1 || !codeMelliPattern.test(val)) {
    return false;
}
var chArray = Array.from(val);
var num0 = parseInt(chArray[0]) * 10;
var num2 = parseInt(chArray[1]) * 9;
var num3 = parseInt(chArray[2]) * 8;
var num4 = parseInt(chArray[3]) * 7;
var num5 = parseInt(chArray[4]) * 6;
var num6 = parseInt(chArray[5]) * 5;
var num7 = parseInt(chArray[6]) * 4;
var num8 = parseInt(chArray[7]) * 3;
var num9 = parseInt(chArray[8]) * 2;
var a = parseInt(chArray[9]);
var b = (((((((num0 + num2) + num3) + num4) + num5) + num6) + num7) + num8) + num9;
var c = b % 11;
return (((c < 2) && (a == c)) || ((c >= 2) && ((11 - c) == a)));
}


// Convert Persian/Arabic characters and numbers to standard format
function convertInvalidCharacter (text){
const numbers = [
  '۰',
  '۱',
  '۲',
  '۳',
  '۴',
  '۵',
  '۶',
  '۷',
  '۸',
  '۹',
  '٠',
  '١',
  '٢',
  '٣',
  '٤',
  '٥',
  '٦',
  '٧',
  '٨',
  '٩',
];
const output = [];
const chars = {
  ك: 'ک',
  دِ: 'د',
  بِ: 'ب',
  زِ: 'ز',
  ذِ: 'ذ',
  شِ: 'ش',
  سِ: 'س',
  ى: 'ی',
  ي: 'ی',
};
text.split('').forEach((char) => {
  output.push(
    numbers.includes(char)
      ? numbers.indexOf(char) % 10
      : char in chars
        ? chars[char]
        : char,
  );
});
return output.join('');
}

// Mobile Number Validation Function
function validateMobileNumber(mobileNumber) {
  // Check if the input is a string and convert it if it's a number
  if (typeof mobileNumber === 'number') {
      mobileNumber = mobileNumber.toString();
  }
  
  // Check if the input is empty
  if (!mobileNumber || mobileNumber.trim() === '') {
      return false;
  }

  // Iranian mobile number pattern: starts with 09 followed by 9 digits
  const mobilePattern = /^09[\d]{9}$/;
  
  // Test the pattern
  return mobilePattern.test(mobileNumber);
}





document.addEventListener("DOMContentLoaded", () => {
 const forms = document.querySelectorAll("form");

 // Function to validate a single field
 const validateField = (field) => {
  // delete recent errors
  const errorEl = field.nextElementSibling;
  if (errorEl && errorEl.classList.contains("error-message")) {
    errorEl.remove();
  }

  // Check for validation attributes
  const value = field.value.trim();
  let isValid = true;
  
  // Create error message element
  const createErrorMessage = (message) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '14px'; 
    errorDiv.style.marginTop = '8px'; 
    errorDiv.textContent = message;
    return errorDiv;
  };
  
  // Check each validation type
  if (field.hasAttribute('data-validate-required') && field.getAttribute('data-validate-required') === 'true') {
    if (!value) {
      isValid = false;
      const message = field.getAttribute('data-validate-required-message');
      field.insertAdjacentElement('afterend', message ? createErrorMessage(message) : createErrorMessage('این فیلد الزامی است'));
      return false;
    }
  }
  
  if (field.hasAttribute('data-validate-persian') && field.getAttribute('data-validate-persian') === 'true') {
    if (value && !isPersianText(value)) {
      isValid = false;
      const message = field.getAttribute('data-validate-persian-message');
      field.insertAdjacentElement('afterend', message ? createErrorMessage(message) : createErrorMessage('لطفا فقط متن فارسی وارد کنید'));
      return false;
    }
  }
  if (field.hasAttribute('data-validate-english') && field.getAttribute('data-validate-english') === 'true') {
    if (value && !isEnglishText(value)) {
      isValid = false;
      const message = field.getAttribute('data-validate-english-message');
      field.insertAdjacentElement('afterend', message ? createErrorMessage(message) : createErrorMessage('لطفا فقط متن انگلیسی وارد کنید'));
      return false;
    }
  }
  
  if (field.hasAttribute('data-validate-national-id') && field.getAttribute('data-validate-national-id') === 'true' ) {
    field.value = convertInvalidCharacter(value);
    if (value && !validator(field.value)) {
      isValid = false;
      const message = field.getAttribute('data-validate-national-id-message');
      field.insertAdjacentElement('afterend', message ? createErrorMessage(message) : createErrorMessage('کد ملی نامعتبر است'));
      return false;
    }
  }
  
  if (field.hasAttribute('data-validate-mobile') && field.getAttribute('data-validate-mobile') === 'true') {
    field.value = convertInvalidCharacter(value);
    if (value && !validateMobileNumber(field.value)) {
      isValid = false;
      const message = field.getAttribute('data-validate-mobile-message');
      field.insertAdjacentElement('afterend', message ? createErrorMessage(message) : createErrorMessage('شماره موبایل نامعتبر است'));
      return false;
    }
  }
  
  if (field.hasAttribute('data-validate-email') && field.getAttribute('data-validate-email') === 'true') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailPattern.test(value)) {
      isValid = false;
      const message = field.getAttribute('data-validate-email-message');
      field.insertAdjacentElement('afterend', message ? createErrorMessage(message) : createErrorMessage('ایمیل نامعتبر است'));
      return false;
    }
  }

  if (field.hasAttribute('data-validate-password') && field.getAttribute('data-validate-password') === 'true') {
    if (value && !isValidPassword(value)) {
      isValid = false;
      const message = field.getAttribute('data-validate-password-message');
      field.insertAdjacentElement('afterend', message ? createErrorMessage(message) : createErrorMessage('رمز باید حداقل یک حرف خاص و یک حرف بزرگ و یک عدد داشته باشد و هشت رقمی باشد'));
      return false;
    }
  }


  if (field.hasAttribute('data-validate-number') && field.getAttribute('data-validate-number') === 'true') {
    field.value = convertInvalidCharacter(value);
    if (value && isNaN(field.value)) {
      isValid = false;
      const message = field.getAttribute('data-validate-number-message');
      field.insertAdjacentElement('afterend', message ? createErrorMessage(message) : createErrorMessage('فقط عدد وارد کنید'));
      return false;
    }
  }
  
  return isValid;
};

// Add live validation to all form fields
  forms.forEach((form) => {
  const fields = form.querySelectorAll("input, textarea, select");
  
  // Add input event listener for live validation
  fields.forEach((field) => {
    field.addEventListener("input", function() {
      validateField(field);
    });
    
    field.addEventListener("blur", function() {
      validateField(field);
    });
  });

  // Form submission validation
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    let formIsValid = true;

    fields.forEach((field) => {
      const fieldIsValid = validateField(field);
      if (!fieldIsValid) {
        formIsValid = false;
      }
    });

    // If form is valid, submit it
    if (formIsValid) {
      console.log('Form is valid, submitting...'); 
      form.submit();
    }
  });
  });
});