const router = require('express').Router({ strict: true });
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

/*REST API - /api/v1/users/~*/

/*Open Routes*/
router.post('/signup' , authController.signup);
router.post('/login' , authController.login);
router.get('/logout' , authController.logout);
router.post('/forgetPassword' , authController.forgetPassword);
router.patch('/resetPassword/:token' , authController.resetPassword);

/*Logged In Routes*/
router.use(authController.protect);
router.patch('/updateMyPassword' , userController.updatePassword);
router.patch('/updateMe' , userController.uploadUserPhoto , userController.resizeUserPhoto , userController.updateMe);
router.delete('/deleteMe' , userController.deleteMe);

/*Admin Routes*/
router.use(authController.restrictTo('admin'));
router.route('/')
   .get(userController.getAllUsers)
   .post(userController.createUser);
router.route('/:id')
   .get(userController.getUser)
   .patch(userController.updateUser)
   .delete(userController.deleteUser);

/*Export Router*/
module.exports = router;