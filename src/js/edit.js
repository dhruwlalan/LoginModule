// ASSETS
import './assets.js';

// MAIN
import showAlert from './alerts.js';
import validator from 'validator';

const home = document.getElementById('home');
const logout = document.getElementById('logout');
const formEditData = document.querySelector('.form--edit--data');
const formEditProfile = document.querySelector('.form--edit--profile');
const formEditPass = document.querySelector('.form--edit--pass');
const formGroupName = document.querySelector('.form__group--name');
const formGroupEmail = document.querySelector('.form__group--email');
const formGroupCurPass = document.querySelector('.form__group--curpass');
const formGroupNewPass = document.querySelector('.form__group--newpass');
const formGroupInputs = document.querySelectorAll('.form__group-input');
const nameInput	= document.getElementById('nameInput');
const namelabel = document.getElementById('nameLabel');
const emailInput = document.getElementById('emailInput');
const emailLabel = document.getElementById('emailLabel');
const curPassInput = document.getElementById('CurPassInput');
const curPassLabel = document.getElementById('CurPassLabel');
const newPassInput = document.getElementById('NewPassInput');
const newPassLabel = document.getElementById('NewPassLabel');
const eyeSvgForCurPass = document.querySelector('.eyesvgforcurpass');
const eyeSvgForNewPass = document.querySelector('.eyesvgfornewpass');
const formSubmitDataBtnText = document.querySelector('.edit__submitdata-btn--text');
const formSubmitProfileBtnText = document.querySelector('.edit__submitprofile-btn--text');
const formSubmitPassBtnText = document.querySelector('.edit__submitpass-btn--text');
const uploadImagePreview = document.getElementById('uploadImagePreview');
const uploadImageInput = document.getElementById('uploadImageInput');
const uploadImageLabel = document.getElementById('uploadImageLabel');
const removeImageLabel = document.getElementById('removeImageLabel');

let EnteredName = 'notEntered';
let EnteredEmail = 'notEntered';
let EnteredCurPass = 'notEntered';
let EnteredNewPass = 'notEntered';

const logUserOut = async (loc) => {
	try {
		const res = await axios({
			method: 'GET' ,
			url: '/api/v1/users/logout' ,
		});
		if (res.data.status === 'success') {
			location.assign(`/${loc }`);
		}
	} catch (e) {
		showAlert('error' , e);
	}
}
home.addEventListener('click' , () => {
	location.assign('/home');
});
logout.addEventListener('click' , logUserOut);

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
formGroupCurPass.addEventListener('mouseenter' , () => {
	const password = curPassInput.value;
	if (password.length === 0) {
		formGroupCurPass.classList.add('hover-input');
		curPassLabel.classList.add('hover-label');
	}
	eyeSvgForCurPass.classList.add('showeyesvg');
});
formGroupCurPass.addEventListener('mouseleave' , () => {
	formGroupCurPass.classList.remove('hover-input');
	curPassLabel.classList.remove('hover-label');
	eyeSvgForCurPass.classList.remove('showeyesvg');
});
formGroupNewPass.addEventListener('mouseenter' , () => {
	const password = newPassInput.value;
	if (password.length === 0) {
		formGroupNewPass.classList.add('hover-input');
		newPassLabel.classList.add('hover-label');
	}
	eyeSvgForNewPass.classList.add('showeyesvg');
});
formGroupNewPass.addEventListener('mouseleave' , () => {
	formGroupNewPass.classList.remove('hover-input');
	newPassLabel.classList.remove('hover-label');
	eyeSvgForNewPass.classList.remove('showeyesvg');
});
// show hide password:
eyeSvgForCurPass.addEventListener('click' , () => {
	if (curPassInput.getAttribute('type') === 'password') {
		curPassInput.setAttribute('type' , 'text');
		curPassInput.classList.add('form__group-input--showpassword');
		eyeSvgForCurPass.setAttribute('src' , '/assets/svg/passHide.svg');
		eyeSvgForCurPass.style.display = 'inline-block';
	} else {
		curPassInput.setAttribute('type' , 'password');
		curPassInput.classList.remove('form__group-input--showpassword');
		eyeSvgForCurPass.setAttribute('src' , '/assets/svg/passShow.svg');
		eyeSvgForCurPass.removeAttribute('style');
	}
});
eyeSvgForNewPass.addEventListener('click' , () => {
	if (newPassInput.getAttribute('type') === 'password') {
		newPassInput.setAttribute('type' , 'text');
		newPassInput.classList.add('form__group-input--showpassword');
		eyeSvgForNewPass.setAttribute('src' , '/assets/svg/passHide.svg');
		eyeSvgForNewPass.style.display = 'inline-block';
	} else {
		newPassInput.setAttribute('type' , 'password');
		newPassInput.classList.remove('form__group-input--showpassword');
		eyeSvgForNewPass.setAttribute('src' , '/assets/svg/passShow.svg');
		eyeSvgForNewPass.removeAttribute('style');
	}
});


// checking input :
if (nameInput.value) {
	EnteredName = 'EnteredAndValid';
	formGroupName.style.border = '1px solid #002fff';
	namelabel.style.color = '#002fff';
}
if (emailInput.value) {
	EnteredEmail = 'EnteredAndValid';
	formGroupEmail.style.border = '1px solid #002fff';
	emailLabel.style.color = '#002fff';
}
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
curPassInput.addEventListener('input' , () => {
	const password = curPassInput.value;
	const passwordLength = password.length;
	if (passwordLength === 0) {
		EnteredCurPass = 'notEntered';
		formGroupCurPass.removeAttribute('style');
		curPassLabel.removeAttribute('style');
	} else if (passwordLength > 7) {
		EnteredCurPass = 'EnteredAndValid';
		formGroupCurPass.style.border = '1px solid #002fff';
		curPassLabel.style.color = '#002fff';
	} else {
		EnteredCurPass = 'EnteredButInvalid';
		formGroupCurPass.style.border = '1px solid tomato';
		curPassLabel.style.color = 'tomato';
	}
});
newPassInput.addEventListener('input' , () => {
	const password = newPassInput.value;
	const passwordLength = password.length;
	if (passwordLength === 0) {
		EnteredNewPass = 'notEntered';
		formGroupNewPass.removeAttribute('style');
		newPassLabel.removeAttribute('style');
	} else if (passwordLength > 7) {
		EnteredNewPass = 'EnteredAndValid';
		formGroupNewPass.style.border = '1px solid #002fff';
		newPassLabel.style.color = '#002fff';
	} else {
		EnteredNewPass = 'EnteredButInvalid';
		formGroupNewPass.style.border = '1px solid tomato';
		newPassLabel.style.color = 'tomato';
	}
});

// update user data:
const updateUserData = async (name , email) => {
	formSubmitDataBtnText.textContent = '';
	formSubmitDataBtnText.classList.add('spinner');
	try {
		const res = await axios({
			method: 'PATCH' ,
			url: '/api/v1/users/updateMe' ,
			data: {
				name ,
				email ,
			}
		});
		if (res.data.status === 'success') {
			formSubmitDataBtnText.classList.remove('spinner');
			formSubmitDataBtnText.innerHTML = '&#10003;';
			showAlert('success' , 'Updated Your Data Successfully!');
			setTimeout(() => {
				formSubmitDataBtnText.textContent = 'Update';
			} , 1000 );
		}
	} catch (e) {
		formSubmitDataBtnText.classList.remove('spinner');
		formSubmitDataBtnText.innerHTML = '&#10007;';
		setTimeout(() => {
			formSubmitDataBtnText.textContent = 'Update Data';
		} , 500 );
		showAlert('error' , e.response.data.message);
	}
};
formEditData.addEventListener('submit' , (e) => {
	e.preventDefault();
	if (EnteredName === 'notEntered') {
		showAlert('error' , 'Please enter your full name.');
	} else if (EnteredEmail === 'notEntered') {
		showAlert('error' , 'Please enter your email address.');
	} else if (EnteredEmail === 'EnteredButInvalid') {
		showAlert('error' , 'Please enter a valid email address.');
	} else {
		const name = nameInput.value;
		const email = emailInput.value;
		updateUserData(name , email);
	}
});

// change user profile photo:
const previewImage = () => {
	const photo = uploadImageInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = (e) => {
        uploadImagePreview.src = e.target.result;
    };
}
const uploadImage = async (form) => {
	formSubmitProfileBtnText.textContent = '';
	formSubmitProfileBtnText.classList.add('spinner');
	try {
		const res = await axios({
			method: 'PATCH' ,
			url: '/api/v1/users/updateMe' ,
			data: form ,
		});
		if (res.data.status === 'success') {
			formSubmitProfileBtnText.classList.remove('spinner');
			formSubmitProfileBtnText.innerHTML = '&#10003;';
			showAlert('success' , 'Updated Your Profile Photo Successfully!');
			setTimeout(() => {
				formSubmitProfileBtnText.textContent = 'Update Profile Photo';
			} , 1000 );
		}
	} catch (e) {
		formSubmitDataBtnText.classList.remove('spinner');
		formSubmitDataBtnText.innerHTML = '&#10007;';
		setTimeout(() => {
			formSubmitDataBtnText.textContent = 'Update Profile Photo';
		} , 500 );
		showAlert('error' , e.response.data.message);
	}
};
uploadImageInput.addEventListener('change' , previewImage);
formEditProfile.addEventListener('submit' , (e) => {
	e.preventDefault();
	const imgsrc = uploadImagePreview.getAttribute('src');
	if (imgsrc.includes('default.png')) {
		uploadImage({ photo: 'default.png' });
	} else {
		const form = new FormData();
		form.append('photo' , uploadImageInput.files[0]);
		uploadImage(form);
	}
});
removeImageLabel.addEventListener('click' , () => {
	uploadImagePreview.src = '/assets/images/default.png';
});

// change user password:
const changePassword = async (curPass , newPass) => {
	formSubmitPassBtnText.textContent = '';
	formSubmitPassBtnText.classList.add('spinner');
	try {
		const res = await axios({
			method: 'PATCH' ,
			url: '/api/v1/users/updateMyPassword' ,
			data: {
				passwordCurrent: curPass ,
				password: newPass ,
				passwordConfirm: newPass ,
			}
		});
		if (res.data.status === 'success') {
			formSubmitPassBtnText.classList.remove('spinner');
			formSubmitPassBtnText.innerHTML = '&#10003;';
			showAlert('success' , 'Updated Your Data Successfully!');
			curPassInput.value = '';
			newPassInput.value = '';
			setTimeout(() => {
				logUserOut('login');
			} , 1000 );
		}
	} catch (e) {
		formSubmitPassBtnText.classList.remove('spinner');
		formSubmitPassBtnText.innerHTML = '&#10007;';
		setTimeout(() => {
			formSubmitPassBtnText.textContent = 'Change Password';
		} , 500 );
		showAlert('error' , e.response.data.message);
	}
};
formEditPass.addEventListener('submit' , (e) => {
	e.preventDefault();
	if (EnteredCurPass === 'notEntered') {
		showAlert('error' , 'Please enter your current password.');
	} else if (EnteredCurPass === 'EnteredButInvalid') {
		showAlert('error' , 'Password should be at least 8 characters long.');
	} else if (EnteredNewPass === 'notEntered') {
		showAlert('error' , 'Please enter your new password.');
	} else if (EnteredNewPass === 'EnteredButInvalid') {
		showAlert('error' , 'Password should be at least 8 characters long.');
	} else {
		const curPass = curPassInput.value;
		const newPass = newPassInput.value;
		changePassword(curPass , newPass);
	}
});