const router = require('express').Router();
const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');

router.use( '/signup' , viewController.signup);
router.use( '/login' , viewController.login);
router.use( '/' , viewController.root);

module.exports = router;