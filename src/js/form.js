const formTitle = document.querySelector('.form__title');
const emailLabel = document.getElementById('emailLabel');
const emailInput = document.getElementById('emailInput');
const passLabel = document.getElementById('passLabel');
const passInput = document.getElementById('passInput');
const passShowHide = document.querySelector('.form__input--passshowhide');
const forSignup = document.getElementById('forsignup')
const submitBtn = document.getElementById('submit');
const formFooterText = document.querySelector('.form__footer--text');
const formFooterLink = document.querySelector('.form__footer--link');


formFooterLink.addEventListener('click' , (e) => {
	const passConfirm = `<div class="form__input-group passConfirm"><input id="passConfInput" type="password" class="form__input"><label id="passConfLabel" for="passConfInput" class="form__label">Password Confirm</label></div>`;
	if (e.target.textContent === 'Sign Up') {
		submit.insertAdjacentHTML('beforebegin', passConfirm);
		e.target.textContent = 'Login';
		formTitle.textContent = 'Sign Up';
		submitBtn.value = 'Sign Up';
		formFooterText.textContent = `I'm already a member,`;
	} else {
		const pc = document.querySelector('.passConfirm');
		document.querySelector('.form__body').removeChild(pc);
		e.target.textContent = 'Sign Up';
		formTitle.textContent = 'Login';
		submitBtn.value = 'Login';
		formFooterText.textContent = `I'm a new user,`;
	}
});

passInput.addEventListener('mouseenter' , () => {
	passShowHide.style.display = 'inline-block';
});
passInput.addEventListener('mouseleave' , () => {
	passShowHide.style.display = 'none';
});

passShowHide.addEventListener('click' , () => {
	
});