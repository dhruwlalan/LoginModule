const path = require('path');

module.exports = {
   noScript: path.resolve(__dirname, '../client/js/noScript.js'),
   signup: path.resolve(__dirname, '../client/js/signup.js'),
   login: path.resolve(__dirname, '../client/js/login.js'),
   home: path.resolve(__dirname, '../client/js/home.js'),
   forgetPassword: path.resolve(__dirname, '../client/js/forgetPassword.js'),
   resetPassword: path.resolve(__dirname, '../client/js/resetPassword.js'),
   edit: path.resolve(__dirname, '../client/js/edit.js'),
};
