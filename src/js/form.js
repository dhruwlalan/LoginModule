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

formFooterLink.addEventListener('click' , (e) => {
	if (e.target.textContent === 'Sign Up') {
		formGroupPassconf.style.display = 'block';
		e.target.textContent = 'Login';
		formTitle.textContent = 'Sign Up';
		submitBtn.value = 'Sign Up';
		formFooterText.textContent = `I'm already a member,`;
	} else {
		formGroupPassconf.style.display = 'none';
		e.target.textContent = 'Sign Up';
		formTitle.textContent = 'Login';
		submitBtn.value = 'Login';
		formFooterText.textContent = `I'm a new user,`;
	}
});

formGroupPass.addEventListener('mouseenter' , () => {
	passShowHideForPass.classList.add('showpassword');
});
formGroupPass.addEventListener('mouseleave' , () => {
	passShowHideForPass.classList.remove('showpassword');
});
formGroupPassconf.addEventListener('mouseenter' , () => {
	passShowHideForPassconf.classList.add('showpassword');
});
formGroupPassconf.addEventListener('mouseleave' , () => {
	passShowHideForPassconf.classList.remove('showpassword');
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