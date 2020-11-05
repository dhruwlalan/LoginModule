// ASSETS
import './assets.js';

// MAIN
import axios from 'axios';
import validator from 'validator';
import showAlert from './views/alerts.js';
import dom from './views/dom.js';

let EnteredEmail = 'notEntered';
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
dom.formGroupEmail.addEventListener('mouseenter' , () => {
	const email = dom.emailInput.value;
	if (email.length === 0) {
		dom.formGroupEmail.classList.add('hover-input');
		dom.emailLabel.classList.add('hover-label');
	}
});
dom.formGroupEmail.addEventListener('mouseleave' , () => {
	dom.formGroupEmail.classList.remove('hover-input');
	dom.emailLabel.classList.remove('hover-label');
});
dom.formGroupPass.addEventListener('mouseenter' , () => {
	const password = dom.passInput.value;
	if (password.length === 0) {
		dom.formGroupPass.classList.add('hover-input');
		dom.passLabel.classList.add('hover-label');
	}
	dom.eyeSvg.classList.add('showeyesvg');
});
dom.formGroupPass.addEventListener('mouseleave' , () => {
	dom.formGroupPass.classList.remove('hover-input');
	dom.passLabel.classList.remove('hover-label');
	dom.eyeSvg.classList.remove('showeyesvg');
});

// checking input :
if (dom.emailInput.value) {
	EnteredEmail = 'EnteredAndValid';
	dom.formGroupEmail.style.border = '1px solid #002fff';
	dom.emailLabel.style.color = '#002fff';
}
if (dom.passInput.value) {
	EnteredPass = 'EnteredAndValid';
	dom.formGroupPass.style.border = '1px solid #002fff';
	dom.passlabel.style.color = '#002fff';
}
dom.emailInput.addEventListener('input' , () => {
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
dom.eyeSvg.addEventListener('click' , () => {
	if (dom.passInput.getAttribute('type') === 'password') {
		dom.passInput.setAttribute('type' , 'text');
		dom.eyeSvg.setAttribute('src' , '/assets/svg/passHide.svg');
		dom.eyeSvg.style.display = 'inline-block';
	} else {
		dom.passInput.setAttribute('type' , 'password');
		dom.eyeSvg.setAttribute('src' , '/assets/svg/passShow.svg');
		dom.eyeSvg.removeAttribute('style');
	}
});

// login user:
const login = async (email , password) => {
	dom.btnLoginText.textContent = '';
	dom.btnLoginText.classList.add('spinner');
	try {
		const res = await axios({
			method: 'POST' ,
			url: '/api/v1/users/login' ,
			data: {
				email ,
				password ,
			}
		});
		if (res.data.status === 'success') {
			dom.btnLoginText.classList.remove('spinner');
			dom.btnLoginText.innerHTML = '&#10003;';
			showAlert('success' , 'Logged in Successfully!')
			setTimeout(() => {
				location.assign('/');
			} , 500 );
		}
	} catch (e) {
		dom.btnLoginText.classList.remove('spinner');
		dom.btnLoginText.innerHTML = '&#10007;';
		setTimeout(() => {
			dom.btnLoginText.textContent = 'Login';
		} , 500 );
		showAlert('error' , e.response.data.message);
	}
};
dom.formLogin.addEventListener('submit' , (e) => {
	e.preventDefault();
	if (EnteredEmail === 'notEntered') {
		showAlert('error' , 'Please enter your email address.');
	} else if (EnteredEmail === 'EnteredButInvalid') {
		showAlert('error' , 'Please enter a valid email address.');
	} else if (EnteredPass === 'notEntered') {
		showAlert('error' , 'Please enter your password.');
	} else if (EnteredPass === 'EnteredButInvalid') {
		showAlert('error' , 'Password should be at least 8 characters long.');
	} else {
		const email = dom.emailInput.value;
		const password = dom.passInput.value;
		login(email , password);
	}
});