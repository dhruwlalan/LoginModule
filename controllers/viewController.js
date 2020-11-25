
exports.root = (req , res) => {
	if (res.locals.user) res.status(200).render('home');
	else res.status(200).render('loginSignup');
}

exports.login = (req , res) => {
	if (res.locals.user) res.redirect('/');
	else res.status(200).render('login');
}

exports.signup = (req , res) => {
	if (res.locals.user) res.redirect('/');
	else res.status(200).render('signup');
}

exports.edit = (req , res) => {
	if (res.locals.user) res.status(200).render('edit');
	else res.redirect('/');
}

exports.forgetPassword = (req , res) => {
	if (res.locals.user) res.redirect('/');
	else res.status(200).render('forgetPassword');
}

exports.resetPassword = (req , res) => {
	if (res.locals.user) res.redirect('/');
	else res.status(200).render('resetPassword');
}