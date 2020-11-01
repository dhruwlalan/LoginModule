// ASSETS
import './assets.js';

// MAIN
import showAlert from './alerts.js';
import validator from 'validator';

const form = document.querySelector('.form');
const formGroupName = document.querySelector('.form__group--name');
const formGroupEmail = document.querySelector('.form__group--email');
const formGroupPass = document.querySelector('.form__group--pass');
const formGroupInputs = document.querySelectorAll('.form__group-input');
const nameInput	= document.getElementById('nameInput');
const namelabel = document.getElementById('nameLabel');
const emailInput = document.getElementById('emailInput');
const emailLabel = document.getElementById('emailLabel');
const passInput = document.getElementById('passInput');
const passLabel = document.getElementById('passLabel');
const eyeSvg = document.querySelector('.form__group-input--eyesvg');
const formSubmitBtnText = document.querySelector('.form__submit-btn--text');

let EnteredName = 'notEntered';
let EnteredEmail = 'notEntered';
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
formGroupName.addEventListener('mouseenter' , () => {
	const name = nameInput.value;
	if (name.length === 0) {
		formGroupName.classList.add('hover-input');
		nameLabel.classList.add('hover-label');
	}
});
formGroupName.addEventListener('mouseleave' , () => {
	formGroupName.classList.remove('hover-input');
	nameLabel.classList.remove('hover-label');
});
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
nameInput.addEventListener('input' , () => {
	const name = nameInput.value;
	if (name.length === 0) {
		EnteredName = 'notEntered';
		formGroupName.removeAttribute('style');
		namelabel.removeAttribute('style');
	} else {
		EnteredName = 'EnteredAndValid';
		formGroupName.style.border = '1px solid #002fff';
		namelabel.style.color = '#002fff';
	}
});
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
		eyeSvg.setAttribute('src' , 'assets/svg/passHide.svg');
		eyeSvg.style.display = 'inline-block';
	} else {
		passInput.setAttribute('type' , 'password');
		passInput.classList.remove('form__group-input--showpassword');
		eyeSvg.setAttribute('src' , 'assets/svg/passShow.svg');
		eyeSvg.removeAttribute('style');
	}
});

// signup user:
const signup = async (name , email , password) => {
	formSubmitBtnText.textContent = '';
	formSubmitBtnText.classList.add('spinner');
	try {
		const res = await axios({
			method: 'POST' ,
			url: '/api/v1/users/signup' ,
			data: {
				name ,
				email ,
				password ,
				passwordConfirm: password ,
			}
		});
		if (res.data.status === 'success') {
			formSubmitBtnText.classList.remove('spinner');
			formSubmitBtnText.innerHTML = '&#10003;';
			showAlert('success' , 'Created User Successfully!')
			setTimeout(() => {
				location.assign('/');
			} , 500 );
		}
	} catch (e) {
		formSubmitBtnText.classList.remove('spinner');
		formSubmitBtnText.innerHTML = '&#10007;';
		setTimeout(() => {
			formSubmitBtnText.textContent = 'Sign Up';
		} , 500 );
		showAlert('error' , e.response.data.message);
	}
};
form.addEventListener('submit' , (e) => {
	e.preventDefault();
	if (EnteredName === 'notEntered') {
		showAlert('error' , 'Please enter your full name.');
	} else if (EnteredEmail === 'notEntered') {
		showAlert('error' , 'Please enter your email address.');
	} else if (EnteredEmail === 'EnteredButInvalid') {
		showAlert('error' , 'Please enter a valid email address.');
	} else if (EnteredPass === 'notEntered') {
		showAlert('error' , 'Please enter your password.');
	} else if (EnteredPass === 'EnteredButInvalid') {
		showAlert('error' , 'Password should be at least 8 characters long.');
	} else {
		const name = nameInput.value;
		const email = emailInput.value;
		const password = passInput.value;
		signup(name , email , password);
	}
});