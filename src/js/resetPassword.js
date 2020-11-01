// ASSETS
import './assets.js';

// MAIN
import showAlert from './alerts.js';
import validator from 'validator';

const form = document.querySelector('.form');
const formGroupPass = document.querySelector('.form__group--pass');
const formGroupInputs = document.querySelectorAll('.form__group-input');
const passInput = document.getElementById('passInput');
const passLabel = document.getElementById('passLabel');
const eyeSvg = document.querySelector('.form__group-input--eyesvg');
const formSubmitBtnText = document.querySelector('.form__submit-btn--text');

let EnteredPass = 'notEntered';

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
formGroupPass.addEventListener('mouseenter' , () => {
	const password = passInput.value;
	if (password.length === 0) {
		formGroupPass.classList.add('hover-input');
		passLabel.classList.add('hover-label');
	}
	eyeSvg.classList.add('showeyesvg');
});
formGroupPass.addEventListener('mouseleave' , () => {
	formGroupPass.classList.remove('hover-input');
	passLabel.classList.remove('hover-label');
	eyeSvg.classList.remove('showeyesvg');
});

// checking input:
passInput.addEventListener('input' , () => {
	const password = passInput.value;
	const passwordLength = password.length;
	if (passwordLength === 0) {
		EnteredPass = 'notEntered';
		formGroupPass.removeAttribute('style');
		passLabel.removeAttribute('style');
	} else if (passwordLength > 7) {
		EnteredPass = 'EnteredAndValid';
		formGroupPass.style.border = '1px solid #002fff';
		passLabel.style.color = '#002fff';
	} else {
		EnteredPass = 'EnteredButInvalid';
		formGroupPass.style.border = '1px solid tomato';
		passLabel.style.color = 'tomato';
	}
});

// show hide password:
eyeSvg.addEventListener('click' , () => {
	if (passInput.getAttribute('type') === 'password') {
		passInput.setAttribute('type' , 'text');
		passInput.classList.add('form__group-input--showpassword');
		eyeSvg.setAttribute('src' , '/assets/svg/passHide.svg');
		eyeSvg.style.display = 'inline-block';
	} else {
		passInput.setAttribute('type' , 'password');
		passInput.classList.remove('form__group-input--showpassword');
		eyeSvg.setAttribute('src' , '/assets/svg/passShow.svg');
		eyeSvg.removeAttribute('style');
	}
});

// reset password:
const resetPassword = async (password , token) => {
	formSubmitBtnText.textContent = '';
	formSubmitBtnText.classList.add('spinner');
	try {
		const res = await axios({
			method: 'PATCH' ,
			url: `/api/v1/users/resetPassword/${token }` ,
			data: {
				password ,
				passwordConfirm: password ,
			}
		});
		console.log(res.data);
		if (res.data.status === 'success') {
			formSubmitBtnText.classList.remove('spinner');
			formSubmitBtnText.innerHTML = '&#10003;';
			showAlert('success' , 'Password Reseted Successfully!')
			setTimeout(() => {
				location.assign('/login');
			} , 500 );
		}
	} catch (e) {
		formSubmitBtnText.classList.remove('spinner');
		formSubmitBtnText.innerHTML = '&#10007;';
		setTimeout(() => {
			formSubmitBtnText.textContent = 'Reset';
		} , 1000 );
		showAlert('error' , e.response.data.message);
	}
};
form.addEventListener('submit' , (e) => {
	e.preventDefault();
	let token = location.pathname.split('/');
	token = token[token.length-1];
	if (EnteredPass === 'notEntered') {
		showAlert('error' , 'Please enter your new password.');
	} else if (EnteredPass === 'EnteredButInvalid') {
		showAlert('error' , 'Password should be at least 8 characters long.');
	} else {
		const password = passInput.value;
		resetPassword(password , token);
	}
});