const jwt = require('jsonwebtoken');

// create token
const signToken = (id) => {
	return jwt.sign({ id } , process.env.JWT_SECRET , {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
}

// send token
module.exports = (user , statusCode , res) => {
	// get created token:
	const token = signToken(user._id);

	// store in cookie:
	const cookieOptions = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000) ,
		httpOnly: true ,
	};
	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
	res.cookie('jwt' , token , cookieOptions);

	// Remove unwanted fields from output:
	user.password = undefined;
	user.__v = undefined;
	user.active = undefined;

	// send token:
	res.status(statusCode).json({
		status: 'success' ,
		token ,
		user ,
	});
};