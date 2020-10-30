// ASSETS
import './assets.js';

// MAIN
const form = document.querySelector('.form');
const formGroupPass = document.querySelector('.form__group--pass');
const formGroupInput = document.querySelectorAll('.form__group-input');
const emailInput = document.getElementById('emailInput');
const passInput = document.getElementById('passInput');
const passShowHideForPass = document.querySelector('.passshowhide-forpass');


formGroupInput.forEach((input) => {
	input.addEventListener('focusin' , (e) => {
		e.target.parentNode.classList.add('form__group--focused');
	});
	input.addEventListener('focusout' , (e) => {
		e.target.parentNode.classList.remove('form__group--focused');
	});
});
formGroupPass.addEventListener('mouseenter' , () => {
	passShowHideForPass.classList.add('showpassword');
});
formGroupPass.addEventListener('mouseleave' , () => {
	passShowHideForPass.classList.remove('showpassword');
});
passShowHideForPass.addEventListener('click' , () => {
	if (passInput.getAttribute('type') === 'password') {
		passInput.setAttribute('type' , 'text');
		passInput.classList.add('form__group-input--showpassword');
		passShowHideForPass.setAttribute('src' , 'assets/svg/passHide.svg');
		passShowHideForPass.style.display = 'inline-block';
	} else {
		passInput.setAttribute('type' , 'password');
		passInput.classList.remove('form__group-input--showpassword');
		passShowHideForPass.setAttribute('src' , 'assets/svg/passShow.svg');
		passShowHideForPass.removeAttribute('style');
	}
});

const login = async (email , password) => {
	try {
		const res = await axios({
			method: 'POST' ,
			// url: 'http://127.0.0.1:8000/api/v1/users/login' ,
			url: '/api/v1/users/login' ,
			data: {
				email ,
				password ,
			}
		});
		console.log(res);
	} catch (e) {
		console.log(e.response.data);
	}
};
form.addEventListener('submit' , (e) => {
	e.preventDefault();
	const email = emailInput.textContent;
	const password = passInput.value;
	login(email , password);
});