
exports.root = (req , res) => {
	res.status(200).render('signup');
}

exports.login = (req , res) => {
	res.status(200).render('login');
}

exports.signup = (req , res) => {
	res.status(200).render('signup');
}