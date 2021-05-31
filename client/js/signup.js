// ASSETS
import './assets.js';

// EXTERNALS
import axios from 'axios';
import validator from 'validator';
import showAlert from './views/alerts.js';
import dom from './views/dom.js';

// CODE
let EnteredName = 'notEntered';
let EnteredEmail = 'notEntered';
let EnteredPass = 'notEntered';

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
dom.formGroupName.addEventListener('mouseenter', () => {
   const name = dom.nameInput.value;
   if (name.length === 0) {
      dom.formGroupName.classList.add('hover-input');
      dom.nameLabel.classList.add('hover-label');
   }
});
dom.formGroupName.addEventListener('mouseleave', () => {
   dom.formGroupName.classList.remove('hover-input');
   dom.nameLabel.classList.remove('hover-label');
});
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
dom.formGroupPass.addEventListener('mouseenter', () => {
   const password = dom.passInput.value;
   if (password.length === 0) {
      dom.formGroupPass.classList.add('hover-input');
      dom.passLabel.classList.add('hover-label');
   }
   dom.eyeSvgForPass.classList.add('showeyesvg');
});
dom.formGroupPass.addEventListener('mouseleave', () => {
   dom.formGroupPass.classList.remove('hover-input');
   dom.passLabel.classList.remove('hover-label');
   dom.eyeSvgForPass.classList.remove('showeyesvg');
});

// checking input:
dom.nameInput.addEventListener('input', () => {
   const name = dom.nameInput.value;
   if (name.length === 0) {
      EnteredName = 'notEntered';
      dom.formGroupName.removeAttribute('style');
      dom.nameLabel.removeAttribute('style');
   } else {
      EnteredName = 'EnteredAndValid';
      dom.formGroupName.style.border = '1px solid #002fff';
      dom.nameLabel.style.color = '#002fff';
   }
});
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
dom.passInput.addEventListener('input', () => {
   const password = dom.passInput.value;
   const passwordLength = password.length;
   if (passwordLength === 0) {
      EnteredPass = 'notEntered';
      dom.formGroupPass.removeAttribute('style');
      dom.passLabel.removeAttribute('style');
   } else if (passwordLength > 7) {
      EnteredPass = 'EnteredAndValid';
      dom.formGroupPass.style.border = '1px solid #002fff';
      dom.passLabel.style.color = '#002fff';
   } else {
      EnteredPass = 'EnteredButInvalid';
      dom.formGroupPass.style.border = '1px solid tomato';
      dom.passLabel.style.color = 'tomato';
   }
});

// show hide password:
dom.eyeSvgForPass.addEventListener('click', () => {
   if (dom.passInput.getAttribute('type') === 'password') {
      dom.passInput.setAttribute('type', 'text');
      dom.passInput.classList.add('form__group-input--showpassword');
      dom.eyeSvgForPass.setAttribute('src', '/assets/svg/passHide.svg');
      dom.eyeSvgForPass.style.display = 'inline-block';
   } else {
      dom.passInput.setAttribute('type', 'password');
      dom.passInput.classList.remove('form__group-input--showpassword');
      dom.eyeSvgForPass.setAttribute('src', '/assets/svg/passShow.svg');
      dom.eyeSvgForPass.removeAttribute('style');
   }
});

// signup user:
const signup = async (name, email, password) => {
   dom.btnSignupText.textContent = '';
   dom.btnSignupText.classList.add('spinner');
   try {
      const res = await axios({
         method: 'POST',
         url: '/api/v1/users/signup',
         data: {
            name,
            email,
            password,
            passwordConfirm: password,
         },
      });
      if (res.data.status === 'success') {
         dom.btnSignupText.classList.remove('spinner');
         dom.btnSignupText.innerHTML = '&#10003;';
         showAlert('success', 'Created User Successfully!');
         setTimeout(() => {
            location.assign('/');
         }, 500);
      }
   } catch (e) {
      dom.btnSignupText.classList.remove('spinner');
      dom.btnSignupText.innerHTML = '&#10007;';
      setTimeout(() => {
         dom.btnSignupText.textContent = 'Create Account';
      }, 500);
      showAlert('error', e.response.data.message);
   }
};
dom.formSignup.addEventListener('submit', (e) => {
   e.preventDefault();
   if (EnteredName === 'notEntered') {
      showAlert('error', 'Please enter your full name.');
   } else if (EnteredEmail === 'notEntered') {
      showAlert('error', 'Please enter your email address.');
   } else if (EnteredEmail === 'EnteredButInvalid') {
      showAlert('error', 'Please enter a valid email address.');
   } else if (EnteredPass === 'notEntered') {
      showAlert('error', 'Please enter your password.');
   } else if (EnteredPass === 'EnteredButInvalid') {
      showAlert('error', 'Password should be at least 8 characters long.');
   } else {
      const name = dom.nameInput.value;
      const email = dom.emailInput.value;
      const password = dom.passInput.value;
      signup(name, email, password);
   }
});
