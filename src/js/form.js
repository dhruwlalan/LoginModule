const formTitle = document.querySelector('.form__title');
const formGroup = document.querySelector('.form__group');
const formGroupPass = document.querySelector('.form__group--pass');
const formGroupPassconf = document.querySelector('.form__group--passconf');
const formGroupInput = document.querySelectorAll('.form__group-input');
const emailLabel = document.getElementById('emailLabel');
const emailInput = document.getElementById('emailInput');
const passLabel = document.getElementById('passLabel');
const passInput = document.getElementById('passInput');
const passShowHideForPass = document.querySelector('.passshowhide-forpass');
const passShowHideForPassconf = document.querySelector('.passshowhide-forpassconf');
const forSignup = document.getElementById('forsignup')
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
	passShowHideForPass.style.display = 'inline-block';
});
formGroupPass.addEventListener('mouseleave' , () => {
	passShowHideForPass.style.display = 'none';
});
formGroupPassconf.addEventListener('mouseenter' , () => {
	passShowHideForPassconf.style.display = 'inline-block';
});
formGroupPassconf.addEventListener('mouseleave' , () => {
	passShowHideForPassconf.style.display = 'none';
});
