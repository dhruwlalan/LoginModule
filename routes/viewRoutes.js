const router = require('express').Router({ strict: true });
const AppError = require('../utils/appError.js');
const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');

/*Check if the user is already logged in*/
router.use(authController.isLoggedIn);

/*Define Routes*/
router.get( '/signup' , viewController.signup);
router.get( '/login' , viewController.login);
router.get( '/edit' , authController.protect , viewController.edit);
router.get( '/forgetPassword' , viewController.forgetPassword);
router.get( '/resetPassword/:token' , viewController.resetPassword);
router.get( '/' , viewController.root);

/*Handle Undefined Routes*/
router.all( '*' , (req , res , next) => {
	res.status(404).render('pageNotFound' , {
		unknownRoute: req.originalUrl ,
	});
});

/*Export Router*/
module.exports = router;