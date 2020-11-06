// ASSETS
import './assets.js';

// EXTERNALS
import axios from 'axios';
import validator from 'validator';
import showAlert from './views/alerts.js';
import dom from './views/dom.js';

// CODE
let EnteredPass = 'notEntered';

// for focus:
dom.formGroupInputs.forEach((input) => {
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
dom.formGroupPass.addEventListener('mouseenter' , () => {
	const password = dom.passInput.value;
	if (password.length === 0) {
		dom.formGroupPass.classList.add('hover-input');
		dom.passLabel.classList.add('hover-label');
	}
	dom.eyeSvgForPass.classList.add('showeyesvg');
});
dom.formGroupPass.addEventListener('mouseleave' , () => {
	dom.formGroupPass.classList.remove('hover-input');
	dom.passLabel.classList.remove('hover-label');
	dom.eyeSvgForPass.classList.remove('showeyesvg');
});

// checking input:
dom.passInput.addEventListener('input' , () => {
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
dom.eyeSvgForPass.addEventListener('click' , () => {
	if (dom.passInput.getAttribute('type') === 'password') {
		dom.passInput.setAttribute('type' , 'text');
		dom.passInput.classList.add('form__group-input--showpassword');
		dom.eyeSvgForPass.setAttribute('src' , '/assets/svg/passHide.svg');
		dom.eyeSvgForPass.style.display = 'inline-block';
	} else {
		dom.passInput.setAttribute('type' , 'password');
		dom.passInput.classList.remove('form__group-input--showpassword');
		dom.eyeSvgForPass.setAttribute('src' , '/assets/svg/passShow.svg');
		dom.eyeSvgForPass.removeAttribute('style');
	}
});

// reset password:
const resetPassword = async (password , token) => {
dom.btnResetText.textContent = '';
	dom.btnResetText.classList.add('spinner');
	try {
		const res = await axios({
			method: 'PATCH' ,
			url: `/api/v1/users/resetPassword/${token }` ,
			data: {
				password ,
				passwordConfirm: password ,
			}
		});
		if (res.data.status === 'success') {
			dom.btnResetText.classList.remove('spinner');
			dom.btnResetText.innerHTML = '&#10003;';
			showAlert('success' , 'Password Reseted Successfully!')
			setTimeout(() => {
				location.assign('/login');
			} , 500 );
		}
	} catch (e) {
		dom.btnResetText.classList.remove('spinner');
		dom.btnResetText.innerHTML = '&#10007;';
		setTimeout(() => {
			dom.btnResetText.textContent = 'Reset';
		} , 1000 );
		showAlert('error' , e.response.data.message);
	}
};
dom.formResetPassword.addEventListener('submit' , (e) => {
	e.preventDefault();
	let token = location.pathname.split('/');
	token = token[token.length-1];
	if (EnteredPass === 'notEntered') {
		showAlert('error' , 'Please enter your new password.');
	} else if (EnteredPass === 'EnteredButInvalid') {
		showAlert('error' , 'Password should be at least 8 characters long.');
	} else {
		const password = dom.passInput.value;
		resetPassword(password , token);
	}
});