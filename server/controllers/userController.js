const crypto = require('crypto');
const multer = require('multer');
const sharp = require('sharp');
const AWS = require('aws-sdk')
const User = require('../database/UserModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
const sendResponse = require('../utils/sendResponse');
const APIFeatures = require('../utils/apiFeatures');
const createSendToken = require('../utils/createSendToken');
const removeUnwantedFields = require('../utils/removeUnwantedFields');


/*Configure AWS S3*/
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID ,
    secretAccessKey: process.env.AWS_SECRET ,
});

/*Configure Multer & Sharp*/
const upload = multer({
    storage: multer.memoryStorage() ,
    fileFilter: (req , file , cb) => {
        if (file.mimetype.startsWith('image')) {
            cb(null , true);
        } else {
            cb(new AppError('Not an image! Please upload only images.' , 400) , false);
        }
    } ,
});
exports.uploadUserPhoto = upload.single('photo');
exports.resizeUserPhoto = async (req , res , next) => {
    if (!req.file) return next();
    req.file.filename = `u-${req.user.id }-${Date.now() }.jpeg`;
    
    const data = await sharp(req.file.buffer).resize(300 , 300).toFormat('jpeg').toBuffer();
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.filename ,
        Body: data ,
    }

    if (req.user.prePhoto) {
        const oldPhotoIndex = req.user.prePhoto.indexOf('u-');
        const oldPhotoKey = req.user.prePhoto.slice(oldPhotoIndex , req.user.prePhoto.length);
        
        await s3.deleteObject({
            Bucket: process.env.AWS_BUCKET_NAME ,
            Key: oldPhotoKey ,
        } , (error , data) => {
            if (error) {
                return next(new AppError('Unable to delete previous photo',400));
            }
        });
    }

    await s3.upload(params, (error, data) => {
        if (error) {
            console.log(error);
            return next(new AppError('Image upload to aws is unsuccessfull!',400));
        }
        req.file.location = data.Location;
        next();
    });
}

/*Open Routes*/
exports.signup = catchAsync(async (req , res , next) => {
    const newUser = await User.create({
        name: req.body.name ,
        email: req.body.email ,
        password: req.body.password ,
        passwordConfirm: req.body.passwordConfirm ,
    });
    createSendToken(newUser , 201 , req , res);
});
exports.login = catchAsync(async (req , res , next) => {
    const { email , password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password!' , 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password , user.password))) {
        return next(new AppError('Incorrect email or password' , 401));
    }

    // legit user... send token:
    createSendToken(user , 200 , req , res);
});
exports.logout = catchAsync(async (req , res , next) => {
    res.cookie( 'jwt' , 'loggedOut' , {
        expires: new Date(Date.now() + 2 * 1000) ,
        httpOnly: true ,
    });
    res.status(200).json({ status: 'success' });
});
exports.forgetPassword = catchAsync(async (req , res , next) => {
    // 1 get user based on posted email:
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new AppError('There is no user with that email address!' , 404));

    // 2 generate the random reset token:
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3 send it to users email:
    try {
        const resetUrl = `${req.protocol }://${req.get('host') }/resetPassword/${resetToken }`;
        await new Email(user , resetUrl).send();
        res.status(200).json({
            status: 'success' ,
            message: 'Token sent to email!' ,
        });
    } catch (e) {
        user.PasswordResetToken = undefined;
        user.PasswordResetExpired = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError('There was an error sending the email. Try again later!' , 500));
    }
});
exports.resetPassword = catchAsync(async (req , res , next) => {
    // 1 get user based on token:
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ passwordResetToken: hashedToken , passwordResetExpires: {$gt: Date.now()} });

    // 2 check if the user exists for that token:
    if (!user) return next(new AppError('Token is invalid or expired' , 400));
    
    // 3 if token has not expired, and there is user, set the new password:
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 4 update changedPasswordAt property for the user: done in the mongoose save query middleware.

    // 5 log the user in, send jwt:
    createSendToken(user, 200, req , res);
});

/*Logged In Routes*/
exports.updateData = catchAsync(async (req , res , next) => {
    // 1 Create error if user POSTs password data:
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for password updates. Please use /updateMyPassword.',400));
    }

    // 2 Filtered out unwanted fields names that are not allowed to be updated:
    const filteredBody = {};
    Object.keys(req.body).forEach(el => {
        if (['name', 'email' , 'photo'].includes(el)) filteredBody[el] = req.body[el];
    });

    // 3 Append photo if user uploaded new profile photo:
    if (req.file) { 
        filteredBody.photo = req.file.location;
        filteredBody.prePhoto = req.file.location;
    }

    // 4 Update user document:
    let updatedUser = await User.findByIdAndUpdate(req.user.id , filteredBody , {
        new: true,
        runValidators: true
    });

    // 5 Remove unwanted fields:
    updatedUser = removeUnwantedFields(updatedUser);
    
    sendResponse(res , 200 , { user: updatedUser });
});
exports.updatePassword = catchAsync(async (req , res , next) => {
    // 1 get user from the collection:
    const user = await User.findById(req.user.id).select('+password');

    // 2 check if the posted current password is correct:
    if (!(await user.correctPassword(req.body.passwordCurrent , user.password))) {
        return next(new AppError('Your current password is wrong.' , 401))
    }

    // 3 if current password was correct, update new password:
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    // 4 log user in, send jwt:
    createSendToken(user , 200 , req , res);
});

/*CRUD for Admin*/
exports.getAllUsers = catchAsync(async (req , res) => {
    const features = new APIFeatures(
        User.find() , req.query
    ).filter().sort().limitFields().paginate();
    const users = await features.query;

    sendResponse(res , 200 , { users } , users.length);
});
exports.getUser = catchAsync(async (req , res) => {
    const user = await User.findById(req.params.id);
    user.__v = undefined;
    user.passwordChangedAt = undefined;
    sendResponse(res , 200 , { user });
});
exports.createUser = catchAsync(async (req , res) => {
    const newUser = await User.create(req.body);
    newUser.active = undefined;
    newUser.password = undefined;
    newUser.__v = undefined;
    sendResponse(res , 200 , { newUser });
});
exports.updateUser = catchAsync(async (req , res) => {
    const user = await User.findByIdAndUpdate(req.params.id , req.body , {
        new: true ,
        runValidators: true ,
    });
    sendResponse(res , 200 , { user });
});
exports.deleteUser = catchAsync(async (req , res) => {
    await User.findByIdAndDelete(req.params.id);
    sendResponse(res , 204 , null);
});