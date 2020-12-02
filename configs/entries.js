const path = require('path');

module.exports = {
	signup: path.resolve(__dirname, '../src/js/signup.js') ,
	login: path.resolve(__dirname, '../src/js/login.js') ,
	home: path.resolve(__dirname, '../src/js/home.js') ,
	forgetPassword: path.resolve(__dirname, '../src/js/forgetPassword.js') ,
	resetPassword: path.resolve(__dirname, '../src/js/resetPassword.js') ,
	edit: path.resolve(__dirname, '../src/js/edit.js') ,
}