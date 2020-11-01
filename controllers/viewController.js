
exports.root = (req , res) => {
	if (res.locals.user) {
		res.status(200).render('home');
	} else {
		res.status(200).render('loginSignup');
	}
}

exports.login = (req , res) => {
	res.status(200).render('login');
}

exports.signup = (req , res) => {
	res.status(200).render('signup');
}