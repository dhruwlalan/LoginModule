// ASSETS
import './assets.js';

// MAIN
const form = document.querySelector('.form');
const formGroupPass = document.querySelector('.form__group--pass');
const formGroupInput = document.querySelectorAll('.form__group-input');
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
			location.assign('/');
		}
	} catch (e) {
		console.log(e.response.data.message);
	}
};
form.addEventListener('submit' , (e) => {
	e.preventDefault();
	const name = nameInput.textContent;
	const email = emailInput.textContent;
	const password = passInput.value;
	signup(name , email , password);
});