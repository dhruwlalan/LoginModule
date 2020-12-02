// ASSETS
import './assets.js';

// EXTERNALS
import axios from 'axios';
import validator from 'validator';
import logoutModel from './models/logoutModel.js';
import showAlert from './views/alerts.js';
import dom from './views/dom.js';

// CODE
let EnteredName = 'notEntered';
let EnteredEmail = 'notEntered';
let EnteredCurPass = 'notEntered';
let EnteredNewPass = 'notEntered';

dom.home.addEventListener('click' , () => { location.assign('/') });
dom.logout.addEventListener('click' , logoutModel);

// for focus:
dom.formGroupInputs.forEach((input) => {
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
dom.formGroupName.addEventListener('mouseenter' , () => {
	const name = dom.nameInput.value;
	if (name.length === 0) {
		dom.formGroupName.classList.add('hover-input');
		dom.nameLabel.classList.add('hover-label');
	}
});
dom.formGroupName.addEventListener('mouseleave' , () => {
	dom.formGroupName.classList.remove('hover-input');
	dom.nameLabel.classList.remove('hover-label');
});
dom.formGroupEmail.addEventListener('mouseenter' , () => {
	const email = dom.emailInput.value;
	if (email.length === 0) {
		dom.formGroupEmail.classList.add('hover-input');
		dom.emailLabel.classList.add('hover-label');
	}
});
dom.formGroupEmail.addEventListener('mouseleave' , () => {
	dom.formGroupEmail.classList.remove('hover-input');
	dom.emailLabel.classList.remove('hover-label');
});
dom.formGroupCurPass.addEventListener('mouseenter' , () => {
	const password = dom.curPassInput.value;
	if (password.length === 0) {
		dom.formGroupCurPass.classList.add('hover-input');
		dom.curPassLabel.classList.add('hover-label');
	}
	dom.eyeSvgForCurPass.classList.add('showeyesvg');
});
dom.formGroupCurPass.addEventListener('mouseleave' , () => {
	dom.formGroupCurPass.classList.remove('hover-input');
	dom.curPassLabel.classList.remove('hover-label');
	dom.eyeSvgForCurPass.classList.remove('showeyesvg');
});
dom.formGroupNewPass.addEventListener('mouseenter' , () => {
	const password = dom.newPassInput.value;
	if (password.length === 0) {
		dom.formGroupNewPass.classList.add('hover-input');
		dom.newPassLabel.classList.add('hover-label');
	}
	dom.eyeSvgForNewPass.classList.add('showeyesvg');
});
dom.formGroupNewPass.addEventListener('mouseleave' , () => {
	dom.formGroupNewPass.classList.remove('hover-input');
	dom.newPassLabel.classList.remove('hover-label');
	dom.eyeSvgForNewPass.classList.remove('showeyesvg');
});
// show hide password:
dom.eyeSvgForCurPass.addEventListener('click' , () => {
	if (dom.curPassInput.getAttribute('type') === 'password') {
		dom.curPassInput.setAttribute('type' , 'text');
		dom.curPassInput.classList.add('form__group-input--showpassword');
		dom.eyeSvgForCurPass.setAttribute('src' , '/assets/svg/passHide.svg');
		dom.eyeSvgForCurPass.style.display = 'inline-block';
	} else {
		dom.curPassInput.setAttribute('type' , 'password');
		dom.curPassInput.classList.remove('form__group-input--showpassword');
		dom.eyeSvgForCurPass.setAttribute('src' , '/assets/svg/passShow.svg');
		dom.eyeSvgForCurPass.removeAttribute('style');
	}
});
dom.eyeSvgForNewPass.addEventListener('click' , () => {
	if (dom.newPassInput.getAttribute('type') === 'password') {
		dom.newPassInput.setAttribute('type' , 'text');
		dom.newPassInput.classList.add('form__group-input--showpassword');
		dom.eyeSvgForNewPass.setAttribute('src' , '/assets/svg/passHide.svg');
		dom.eyeSvgForNewPass.style.display = 'inline-block';
	} else {
		dom.newPassInput.setAttribute('type' , 'password');
		dom.newPassInput.classList.remove('form__group-input--showpassword');
		dom.eyeSvgForNewPass.setAttribute('src' , '/assets/svg/passShow.svg');
		dom.eyeSvgForNewPass.removeAttribute('style');
	}
});


// checking input :
if (dom.nameInput.value) {
	EnteredName = 'EnteredAndValid';
	dom.formGroupName.style.border = '1px solid #002fff';
	dom.nameLabel.style.color = '#002fff';
}
if (dom.emailInput.value) {
	EnteredEmail = 'EnteredAndValid';
	dom.formGroupEmail.style.border = '1px solid #002fff';
	dom.emailLabel.style.color = '#002fff';
}
dom.nameInput.addEventListener('input' , () => {
	const name = dom.nameInput.value;
	if (name.length === 0) {
		EnteredName = 'notEntered';
		dom.formGroupName.removeAttribute('style');
		dom.nameLabel.removeAttribute('style');
	} else {
		EnteredName = 'EnteredAndValid';
		dom.formGroupName.style.border = '1px solid #002fff';
		dom.nameLabel.style.color = '#002fff';
	}
});
dom.emailInput.addEventListener('input' , () => {
	const email = dom.emailInput.value;
	if (email.length === 0) {
		EnteredEmail = 'notEntered';
		dom.formGroupEmail.removeAttribute('style');
		dom.emailLabel.removeAttribute('style');
	} else if (validator.isEmail(email)) {
		EnteredEmail = 'EnteredAndValid';
		dom.formGroupEmail.style.border = '1px solid #002fff';
		dom.emailLabel.style.color = '#002fff';
	} else {
		EnteredEmail = 'EnteredButInvalid';
		dom.formGroupEmail.style.border = '1px solid tomato';
		dom.emailLabel.style.color = 'tomato';
	}
});
dom.curPassInput.addEventListener('input' , () => {
	const password = dom.curPassInput.value;
	const passwordLength = password.length;
	if (passwordLength === 0) {
		EnteredCurPass = 'notEntered';
		dom.formGroupCurPass.removeAttribute('style');
		dom.curPassLabel.removeAttribute('style');
	} else if (passwordLength > 7) {
		EnteredCurPass = 'EnteredAndValid';
		dom.formGroupCurPass.style.border = '1px solid #002fff';
		dom.curPassLabel.style.color = '#002fff';
	} else {
		EnteredCurPass = 'EnteredButInvalid';
		dom.formGroupCurPass.style.border = '1px solid tomato';
		dom.curPassLabel.style.color = 'tomato';
	}
});
dom.newPassInput.addEventListener('input' , () => {
	const password = dom.newPassInput.value;
	const passwordLength = password.length;
	if (passwordLength === 0) {
		EnteredNewPass = 'notEntered';
		dom.formGroupNewPass.removeAttribute('style');
		dom.newPassLabel.removeAttribute('style');
	} else if (passwordLength > 7) {
		EnteredNewPass = 'EnteredAndValid';
		dom.formGroupNewPass.style.border = '1px solid #002fff';
		dom.newPassLabel.style.color = '#002fff';
	} else {
		EnteredNewPass = 'EnteredButInvalid';
		dom.formGroupNewPass.style.border = '1px solid tomato';
		dom.newPassLabel.style.color = 'tomato';
	}
});

// update user data:
const updateUserData = async (name , email) => {
	dom.btnUpdateDataText.textContent = '';
	dom.btnUpdateDataText.classList.add('spinner');
	try {
		const res = await axios({
			method: 'PATCH' ,
			url: '/api/v1/users/updateMyData' ,
			data: {
				name ,
				email ,
			}
		});
		if (res.data.status === 'success') {
			dom.btnUpdateDataText.classList.remove('spinner');
			dom.btnUpdateDataText.innerHTML = '&#10003;';
			showAlert('success' , 'Updated Your Data Successfully!');
			setTimeout(() => {
				dom.btnUpdateDataText.textContent = 'Update';
			} , 1000 );
		}
	} catch (e) {
		dom.btnUpdateDataText.classList.remove('spinner');
		dom.btnUpdateDataText.innerHTML = '&#10007;';
		setTimeout(() => {
			dom.btnUpdateDataText.textContent = 'Update Data';
		} , 500 );
		showAlert('error' , e.response.data.message);
	}
};
dom.formEditData.addEventListener('submit' , (e) => {
	e.preventDefault();
	if (EnteredName === 'notEntered') {
		showAlert('error' , 'Please enter your full name.');
	} else if (EnteredEmail === 'notEntered') {
		showAlert('error' , 'Please enter your email address.');
	} else if (EnteredEmail === 'EnteredButInvalid') {
		showAlert('error' , 'Please enter a valid email address.');
	} else {
		const name = dom.nameInput.value;
		const email = dom.emailInput.value;
		updateUserData(name , email);
	}
});

// change user profile photo:
const previewImage = () => {
	const photo = dom.uploadImageInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.onload = (e) => {
        dom.uploadImagePreview.src = e.target.result;
    };
}
const uploadImage = async (form) => {
	dom.btnUpdateProfileText.textContent = '';
	dom.btnUpdateProfileText.classList.add('spinner');
	try {
		const res = await axios({
			method: 'PATCH' ,
			url: '/api/v1/users/updateMyData' ,
			data: form ,
		});
		if (res.data.status === 'success') {
			dom.btnUpdateProfileText.classList.remove('spinner');
			dom.btnUpdateProfileText.innerHTML = '&#10003;';
			showAlert('success' , 'Updated Your Profile Photo Successfully!');
			setTimeout(() => {
				dom.btnUpdateProfileText.textContent = 'Update Profile Photo';
			} , 1000 );
		}
	} catch (e) {
		dom.btnUpdateProfileText.classList.remove('spinner');
		dom.btnUpdateProfileText.innerHTML = '&#10007;';
		setTimeout(() => {
			dom.btnUpdateProfileText.textContent = 'Update Profile Photo';
		} , 500 );
		showAlert('error' , e.response.data.message);
	}
};
dom.uploadImageInput.addEventListener('change' , previewImage);
dom.removeImageLabel.addEventListener('click' , () => {
	dom.uploadImagePreview.src = '/assets/images/default.png';
});
dom.formEditProfile.addEventListener('submit' , (e) => {
	e.preventDefault();
	const imgsrc = dom.uploadImagePreview.getAttribute('src');
	if (imgsrc.includes('default.png')) {
		uploadImage({ photo: 'default.png' });
	} else {
		const form = new FormData();
		form.append('photo' , uploadImageInput.files[0]);
		uploadImage(form);
	}
});


// change user password:
const changePassword = async (curPass , newPass) => {
	dom.btnChangePasswordText.textContent = '';
	dom.btnChangePasswordText.classList.add('spinner');
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
			dom.btnChangePasswordText.classList.remove('spinner');
			dom.btnChangePasswordText.innerHTML = '&#10003;';
			showAlert('success' , 'Updated Your Data Successfully!');
			dom.curPassInput.value = '';
			dom.newPassInput.value = '';
			setTimeout(() => {
				logoutModel('login');
			} , 500 );
		}
	} catch (e) {
		dom.btnChangePasswordText.classList.remove('spinner');
		dom.btnChangePasswordText.innerHTML = '&#10007;';
		setTimeout(() => {
			dom.btnChangePasswordText.textContent = 'Change Password';
		} , 500 );
		showAlert('error' , e.response.data.message);
	}
};
dom.formEditPass.addEventListener('submit' , (e) => {
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
		const curPass = dom.curPassInput.value;
		const newPass = dom.newPassInput.value;
		changePassword(curPass , newPass);
	}
});