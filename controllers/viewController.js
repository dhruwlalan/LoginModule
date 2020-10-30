
exports.root = (req , res) => {
	if (res.locals.user) {
		res.status(200).render('home');
	} else {
		res.redirect('/signup');
	}
}

exports.login = (req , res) => {
	res.status(200).render('login');
}

exports.signup = (req , res) => {
	res.status(200).render('signup');
}