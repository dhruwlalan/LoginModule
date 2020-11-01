// ASSETS
import './assets.js';

// MAIN
import showAlert from './alerts.js';
import validator from 'validator';

const form = document.querySelector('.form');
const formGroupEmail = document.querySelector('.form__group--email');
const formGroupInputs = document.querySelectorAll('.form__group-input');
const emailInput = document.getElementById('emailInput');
const emailLabel = document.getElementById('emailLabel');
const formSubmitBtnText = document.querySelector('.form__submit-btn--text');

let EnteredEmail = 'notEntered';

// for focus:
formGroupInputs.forEach((input) => {
	input.addEventListener('focusin' , (e) => {
		e.target.parentNode.classList.add('focus-input');
		e.target.parentNode.querySelector(':scope > label').classList.add('focus-label');
	});
	input.addEventListener('focusout' , (e) => {
		e.target.parentNode.classList.remove('focus-input');
		e.target.parentNode.querySelector(':scope > label').classList.remove('focus-label');
	});
});
// for hover:
formGroupEmail.addEventListener('mouseenter' , () => {
	const email = emailInput.value;
	if (email.length === 0) {
		formGroupEmail.classList.add('hover-input');
		emailLabel.classList.add('hover-label');
	}
});
formGroupEmail.addEventListener('mouseleave' , () => {
	formGroupEmail.classList.remove('hover-input');
	emailLabel.classList.remove('hover-label');
});

// checking input:
emailInput.addEventListener('input' , () => {
	const email = emailInput.value;
	if (email.length === 0) {
		EnteredEmail = 'notEntered';
		formGroupEmail.removeAttribute('style');
		emailLabel.removeAttribute('style');
	} else if (validator.isEmail(email)) {
		EnteredEmail = 'EnteredAndValid';
		formGroupEmail.style.border = '1px solid #002fff';
		emailLabel.style.color = '#002fff';
	} else {
		EnteredEmail = 'EnteredButInvalid';
		formGroupEmail.style.border = '1px solid tomato';
		emailLabel.style.color = 'tomato';
	}
});

// send reset link:
const sendResetLink = async (email) => {
	formSubmitBtnText.textContent = '';
	formSubmitBtnText.classList.add('spinner');
	try {
		const res = await axios({
			method: 'POST' ,
			url: '/api/v1/users/forgetPassword' ,
			data: {
				email ,
			}
		});
		if (res.data.status === 'success') {
			formSubmitBtnText.classList.remove('spinner');
			formSubmitBtnText.innerHTML = '&#10003;';
			showAlert('success' , 'Reset link sent successfully.')
			setTimeout(() => {
				location.assign('/login');
			} , 500 );
		}
	} catch (e) {
		formSubmitBtnText.classList.remove('spinner');
		formSubmitBtnText.innerHTML = '&#10007;';
		setTimeout(() => {
			formSubmitBtnText.textContent = 'Send Reset Link';
		} , 1000 );
		showAlert('error' , e.response.data.message);
	}
};
form.addEventListener('submit' , (e) => {
	e.preventDefault();
	if (EnteredEmail === 'notEntered') {
		showAlert('error' , 'Please enter your email address.');
	} else if (EnteredEmail === 'EnteredButInvalid') {
		showAlert('error' , 'Please enter a valid email address.');
	} else {
		const email = emailInput.value;
		sendResetLink(email);
	}
});