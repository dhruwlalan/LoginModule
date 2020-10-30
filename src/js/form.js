const form = document.querySelector('.form');
const formTitle = document.querySelector('.form__title');
const formGroup = document.querySelector('.form__group');
const formGroupPass = document.querySelector('.form__group--pass');
const formGroupPassconf = document.querySelector('.form__group--passconf');
const formGroupInput = document.querySelectorAll('.form__group-input');
const formGroupInputPass = document.querySelectorAll('.form__group-input--pass');
const emailLabel = document.getElementById('emailLabel');
const emailInput = document.getElementById('emailInput');
const passLabel = document.getElementById('passLabel');
const passInput = document.getElementById('passInput');
const passConfLabel = document.getElementById('passConfLabel');
const passConfInput = document.getElementById('passConfInput');
const passShowHideForPass = document.querySelector('.passshowhide-forpass');
const passShowHideForPassconf = document.querySelector('.passshowhide-forpassconf');
const submitBtn = document.getElementById('submit');
const formFooterText = document.querySelector('.form__footer--text');
const formFooterLink = document.querySelector('.form__footer--link');


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
if (formGroupPassconf) {
	formGroupPassconf.addEventListener('mouseenter' , () => {
		passShowHideForPassconf.classList.add('showpassword');
	});
	formGroupPassconf.addEventListener('mouseleave' , () => {
		passShowHideForPassconf.classList.remove('showpassword');
	});
}
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
if (passShowHideForPassconf) {
	passShowHideForPassconf.addEventListener('click' , () => {
		if (passConfInput.getAttribute('type') === 'password') {
			passConfInput.setAttribute('type' , 'text');
			passConfInput.classList.add('form__group-input--showpassword');
			passShowHideForPassconf.setAttribute('src' , 'assets/svg/passHide.svg');
			passShowHideForPassconf.style.display = 'inline-block';
		} else {
			passConfInput.setAttribute('type' , 'password');
			passConfInput.classList.remove('form__group-input--showpassword');
			passShowHideForPassconf.setAttribute('src' , 'assets/svg/passShow.svg');
			passShowHideForPassconf.removeAttribute('style');
		}
	});
}

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