// ASSETS
import './assets.js';

// EXTERNALS
import axios from 'axios';
import validator from 'validator';
import showAlert from './views/alerts.js';
import dom from './views/dom.js';

// CODE
let EnteredEmail = 'notEntered';

// for focus:
dom.formGroupInputs.forEach((input) => {
   input.addEventListener('focusin', (e) => {
      e.target.parentNode.classList.add('focus-input');
      e.target.parentNode.querySelector(':scope > label').classList.add('focus-label');
   });
   input.addEventListener('focusout', (e) => {
      e.target.parentNode.classList.remove('focus-input');
      e.target.parentNode.querySelector(':scope > label').classList.remove('focus-label');
   });
});
// for hover:
dom.formGroupEmail.addEventListener('mouseenter', () => {
   const email = dom.emailInput.value;
   if (email.length === 0) {
      dom.formGroupEmail.classList.add('hover-input');
      dom.emailLabel.classList.add('hover-label');
   }
});
dom.formGroupEmail.addEventListener('mouseleave', () => {
   dom.formGroupEmail.classList.remove('hover-input');
   dom.emailLabel.classList.remove('hover-label');
});

// checking input:
dom.emailInput.addEventListener('input', () => {
   const email = dom.emailInput.value;
   if (email.length === 0) {
      EnteredEmail = 'notEntered';
      dom.formGroupEmail.removeAttribute('style');
      dom.emailLabel.removeAttribute('style');
   } else if (validator.isEmail(email)) {
      EnteredEmail = 'EnteredAndValid';
      dom.formGroupEmail.style.border = '1px solid #002fff';
      dom.emailLabel.style.color = '#002fff';
   } else {
      EnteredEmail = 'EnteredButInvalid';
      dom.formGroupEmail.style.border = '1px solid tomato';
      dom.emailLabel.style.color = 'tomato';
   }
});

// send reset link:
const sendResetLink = async (email) => {
   dom.btnForgetPasswordText.textContent = '';
   dom.btnForgetPasswordText.classList.add('spinner');
   try {
      const res = await axios({
         method: 'POST',
         url: '/api/v1/users/forgetPassword',
         data: {
            email,
         },
      });
      if (res.data.status === 'success') {
         dom.btnForgetPasswordText.classList.remove('spinner');
         dom.btnForgetPasswordText.innerHTML = '&#10003;';
         showAlert('success', 'Reset link sent successfully.');
         setTimeout(() => {
            location.assign('/login');
         }, 500);
      }
   } catch (e) {
      dom.btnForgetPasswordText.classList.remove('spinner');
      dom.btnForgetPasswordText.innerHTML = '&#10007;';
      setTimeout(() => {
         dom.btnForgetPasswordText.textContent = 'Send Reset Link';
      }, 1000);
      showAlert('error', e.response.data.message);
   }
};
dom.formForgetPassword.addEventListener('submit', (e) => {
   e.preventDefault();
   if (EnteredEmail === 'notEntered') {
      showAlert('error', 'Please enter your email address.');
   } else if (EnteredEmail === 'EnteredButInvalid') {
      showAlert('error', 'Please enter a valid email address.');
   } else {
      const email = dom.emailInput.value;
      sendResetLink(email);
   }
});
