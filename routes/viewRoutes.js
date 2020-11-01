const router = require('express').Router({ strict: true });
const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');

router.use(authController.isLoggedIn);

router.use( '/signup' , viewController.signup);
router.use( '/login' , viewController.login);
router.use( '/forgetPassword' , viewController.forgetPassword);
router.use( '/' , viewController.root);

module.exports = router;