// ASSETS
import './assets.js';

// MAIN
import showAlert from './alerts.js';

const form = document.querySelector('.form');
const formGroupPass = document.querySelector('.form__group--pass');
const formGroupInput = document.querySelectorAll('.form__group-input');
const formSubmitText = document.querySelector('.form__submit--text');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const passInput = document.getElementById('passInput');
const eyeSvg = document.querySelector('.form__group-input--eyesvg');

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

const signup = async (name , email , password) => {
	formSubmitText.textContent = '';
	formSubmitText.classList.add('spinner');
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
			formSubmitText.classList.remove('spinner');
			formSubmitText.innerHTML = '&#10004;';
			showAlert('success' , 'Created User Successfully!')
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
	const name = nameInput.textContent;
	const email = emailInput.textContent;
	const password = passInput.value;
	signup(name , email , password);
});