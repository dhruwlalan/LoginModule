const jwt = require('jsonwebtoken');

/*Create Token*/
const signToken = (id) => {
	return jwt.sign({ id } , process.env.JWT_SECRET , {
		expiresIn: process.env.JWT_EXPIRES_IN
	});
}

/*Send Token*/
module.exports = (user , statusCode , req , res) => {
	// get created token:
	const token = signToken(user._id);

	// store in cookie:
	res.cookie('jwt' , token , {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000) ,
		httpOnly: true ,
		secure: req.secure || req.headers['x-forwarded-proto'] === 'https' ,
	});

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