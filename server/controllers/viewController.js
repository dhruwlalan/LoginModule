exports.root = (_req, res) => {
   if (res.locals.user) res.status(200).render('home');
   else res.status(200).render('loginSignup');
};

exports.login = (_req, res) => {
   if (res.locals.user) res.redirect('/');
   else res.status(200).render('login');
};

exports.signup = (_req, res) => {
   if (res.locals.user) res.redirect('/');
   else res.status(200).render('signup');
};

exports.edit = (_req, res) => {
   if (res.locals.user) res.status(200).render('edit');
   else res.redirect('/');
};

exports.forgetPassword = (_req, res) => {
   if (res.locals.user) res.redirect('/');
   else res.status(200).render('forgetPassword');
};

exports.resetPassword = (_req, res) => {
   if (res.locals.user) res.redirect('/');
   else res.status(200).render('resetPassword');
};
