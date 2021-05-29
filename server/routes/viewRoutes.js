const router = require('express').Router({ strict: true });
const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');

//#Check if the user is already logged in#//
router.use(authController.isLoggedIn);

//#Open Routes#//
router.get( '/signup' , viewController.signup);
router.get( '/login' , viewController.login);
router.get( '/forgetPassword' , viewController.forgetPassword);
router.get( '/resetPassword/:token' , viewController.resetPassword);
router.get( '/' , viewController.root);

//#Logged In Routes#//
router.get( '/edit' , viewController.edit);

//#Handle Undefined Routes#//
router.all( '*' , (req , res) => {
	res.status(404).render('pageNotFound' , {
		unknownRoute: req.originalUrl ,
	});
});

module.exports = router;
