// ASSETS
import './assets.js';

// MAIN
import showAlert from './alerts.js';
import validator from 'validator';

const form = document.querySelector('.form');
const formGroupPass = document.querySelector('.form__group--pass');
const formGroupInput = document.querySelectorAll('.form__group-input');
const formSubmitText = document.querySelector('.form__submit--text');
const emailInput = document.getElementById('emailInput');
const passInput = document.getElementById('passInput');
const eyeSvg = document.querySelector('.form__group-input--eyesvg');
let pass;


formGroupInput.forEach((input) => {
	input.addEventListener('focusin' , (e) => {
		e.target.parentNode.classList.add('form__group--focused');
	});
	input.addEventListener('focusout' , (e) => {
		e.target.parentNode.classList.remove('form__group--focused');
	});
});
formGroupPass.addEventListener('mouseenter' , () => {
	eyeSvg.classList.add('showeyesvg');
});
formGroupPass.addEventListener('mouseleave' , () => {
	eyeSvg.classList.remove('showeyesvg');
});
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


const login = async (email , password) => {
	const enteredEmail = emailInput.textContent;
	const enteredPass = passInput.value;
	console.log(enteredEmail , enteredPass);
	formSubmitText.textContent = '';
	formSubmitText.classList.add('spinner');
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
			formSubmitText.classList.remove('spinner');
			formSubmitText.innerHTML = '&#10004;';
			showAlert('success' , 'Logged in Successfully!')
			setTimeout(() => {
				location.assign('/');
			} , 500 );
		}
	} catch (e) {
		formSubmitText.classList.remove('spinner');
		formSubmitText.textContent = 'Login';
		showAlert('error' , e.response.data.message);
	}
};
form.addEventListener('submit' , (e) => {
	e.preventDefault();
	const email = emailInput.textContent;
	const password = passInput.value;
	login(email , password);
});