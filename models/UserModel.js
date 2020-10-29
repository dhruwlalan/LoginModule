const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// define user schema:
const userSchema = new mongoose.Schema({
	name: {
		type: String ,
		required: [true , 'Please tell us your name!'] ,
	} ,
	email: {
		type: String ,
		required: [true , 'Please provide your email!'] ,
		unique: true ,
		lowercase: true ,
		validate: [validator.isEmail , 'Please provide a valid email!'] ,
	} ,
	role: {
		type: String ,
		enum: ['user' , 'admin'] ,
		default: 'user' ,
	} ,
	password: {
		type: String ,
		required: [true , 'A user must have a password!'] ,
		minlength: 8 ,
		select: false ,
	} ,
	passwordConfirm: {
		type: String ,
		required: [true , 'A user must have a password!'] ,
		minlength: 8 ,
		validate: {
			validator: function(val) { return val === this.password } ,
			message: 'Password does not match!' ,
		} ,
	} ,
	active: {
		type: Boolean ,
		default: true ,
		select: false ,
	} ,
	photo: String ,
	passwordChangedAt: Date ,
	passwordResetToken: String ,
	passwordResetExpires: Date ,
});

// mongoose middleware hooks:
userSchema.pre('save' , async function (next) {
	if (!this.isModified('password')) return next();
	if (this.isNew) {
		this.password = await bcrypt.hash(this.password , 12);
		this.passwordConfirm = undefined;
	} else {
		this.password = await bcrypt.hash(this.password , 12);
		this.passwordConfirm = undefined;
		this.passwordChangedAt = Date.now() - 1000;
	}
	next();
});
userSchema.pre(/^find/ , function (next) {
	this.find({active: {$eq: true}});
	next();
});

// instance methods for current document access:
// compare posted password (candidatePassword) & password stored in database (userPassword)
userSchema.methods.correctPassword = async function (candidatePassword , userPassword) {
	return await bcrypt.compare(candidatePassword , userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000 , 10);
		return JWTTimestamp < changedTimeStamp;
	}
	return false;
};
userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');
	this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
}

// create user model:
const User = mongoose.model('User' , userSchema);

module.exports = User;